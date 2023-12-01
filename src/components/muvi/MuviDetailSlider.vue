<template>
  <div class="muvi__detail--overlay">
    <div class="muvi__detail" v-on-click-outside="handleClickOutside">
      <div class="muvi__detail--thumb">
        <div class="muvi__detail--more" ref="detailMore" :style="`--more-height: ${moreHeight}px`">
          {{ $t('muvi.other_muvi') }}<span>{{ muvies.length }}</span>
        </div>
        <swiper
          :modules="[Thumbs, Mousewheel]"
          :slides-per-view="'auto'"
          :space-between="6"
          :direction="'vertical'"
          :mousewheel="true"
          @swiper="setThumbsSwiper"
          :initialSlide="initialSlideIndex"
        >
          <swiper-slide v-for="muvi in muvies" :key="muvi.id" class="thumb-slider-item">
            <img :src="muvi.preview" :alt="muvi.description" loading="lazy" />
            <ShortsPlay />
          </swiper-slide>
        </swiper>
      </div>
      <swiper
        :modules="[Thumbs, Navigation, EffectFade]"
        :slides-per-view="1"
        :watch-slides-progress="true"
        :watch-overflow="true"
        :space-between="6"
        :simulate-touch="false"
        :direction="'vertical'"
        :slides="2"
        :initialSlide="initialSlideIndex"
        :thumbs="{ swiper: thumbsSwiper }"
        navigation
        :resistance-ratio="0"
        effect="fade"
        class="muvi__detail--main"
        @reachEnd="reachEnd"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="muvi in muvies" :key="muvi.id" v-slot="{ isActive }">
          <div class="shorts__modal parent">
            <div class="shorts__video video">
              <ShortsCard class="isModal" :muvi="muvi" v-if="isActive" />
            </div>
            <MuviDetailContent :muvi="muvi" v-if="isActive" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import 'swiper/css/effect-fade'
import axios from 'axios'
import { ref, computed, onUnmounted, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getFormData } from '@/utils'
import { Navigation, Thumbs, Mousewheel, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { vOnClickOutside } from '@vueuse/components'

import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'
import ShortsPlay from '@/components/icons/shorts/ShortsPlay.vue'
import MuviDetailContent from '@/components/muvi/MuviDetailContent.vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  muvies: {
    type: Array,
    default: () => []
  },
  initialSlideIndex: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['handleClickOutside'])
const thumbsSwiper = ref(null)
const detailMore = ref()

const moreHeight = computed(() => {
  return detailMore.value?.offsetHeight || 0
})

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const handleClickOutside = () => {
  emit('handleClickOutside')
}
const countElements = ref(0)
const isLoading = ref(false)
const page = ref(1)

const store = useStore()
const router = useRouter()
const route = useRoute()

const onSlideChange = async (swiper) => {
  store.commit('muvi/setInitialIndex', swiper.activeIndex)
  router.replace(
    `/${route.params?.lang || 'ru'}/muvi/${store.getters['muvi/getMuvies'][swiper.activeIndex]?.id}`
  )
  await setMuvieViewed(store.getters['muvi/getMuvies'][swiper.activeIndex]?.id)
}

const reachEnd = () => {
  if (!isLoading.value && countElements.value >= 18) {
    loadMore()
  }
}
const setMuvieViewed = async (video_id) => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id
    })
    await axios.post('/set-view-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchFeeds = async (page) => {
  isLoading.value = true

  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      page,
      filter: localStorage.getItem('filter') || 'recomendation'
    })
    const { data } = await axios.post('/get-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    store.commit('muvi/setMuvies', [...store.getters['muvi/getMuvies'], ...data.data])
    countElements.value = data.countElements
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  page.value += 1
  countElements.value = 0
  if (store.getters['muvi/getMuvies'].length > 50) {
    store.commit('muvi/setMuvies', store.getters['muvi/getMuvies'].splice(0, 20))
  }
  await fetchFeeds(page.value)
}

onMounted(async () => {
  if (store.getters['muvi/getMuvies'].length === 1) {
    await fetchFeeds(page.value)
  }
})

onUnmounted(() => {
  store.commit('muvi/setMuvies', [])
  store.commit('muvi/setInitialIndex', 0)
  store.commit('muvi/setFrom', 'feeds')
})
</script>

<style lang="scss">
.muvi__detail {
  &--overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 120;
    background-color: rgba($color: #000000, $alpha: 0.7);
  }
  display: flex;
  justify-content: center;
  gap: 8px;
  max-height: 916px;
  height: 100vh;
  margin: 20px auto;
  max-width: 1097px;
  width: 100%;
  &--thumb {
    width: 76px;
    max-height: 95vh;
    height: 100%;
    .thumb-slider-item {
      height: 135px;
      width: 100%;
      border-radius: 4px;
      border: 2px solid var(--color-seashell);
      overflow: hidden;
      user-select: none;
      cursor: pointer;
      position: relative;

      transition: all 0.3s;
      &::after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.5);
        position: absolute;
        transition: all 0.3s;
        opacity: 0;
      }
      &:hover {
        svg,
        &::after {
          opacity: 1;
        }
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-white);
        opacity: 0;
        z-index: 10;
        transition: all 0.3s;
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
      &.swiper-slide-thumb-active {
        border-color: var(--color-hippie-blue);
        &::after,
        svg {
          opacity: 1;
        }
      }
    }
    .swiper {
      @media (min-width: 1850px) {
        height: calc(915px - 76px);
      }
      height: calc(95vh - 76px);
      width: 100%;
    }
  }
  &--main {
    max-width: 1015px;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    position: static !important;

    .swiper-button-prev,
    .swiper-button-next {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: var(--color-gallery-first);
      color: var(--color-mine-shaft);
      &.swiper-button-disabled {
        pointer-events: all;
      }

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        color: var(--color-mine-shaft);
        width: 32px;
        height: 32px;
      }
      &::after {
        display: none;
      }
    }
    .swiper-button-prev {
      left: 100px;
    }
    .swiper-button-next {
      right: 100px;
    }
  }

  &--more {
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid var(--color-mine-shaft);
    background: var(--color-mine-shaft);
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 6px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    color: var(--color-white);
    margin-bottom: 6px;
  }
}
.shorts__video {
  position: relative;
  z-index: 100;
}
.shorts__info--details svg {
  color: var(--color-mine-shaft);
}

.light {
  .muvi__detail {
    .swiper-button-prev {
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M19.0001 22.7414L12.3794 16.1207L19.0001 9.5' stroke='%23000' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
    }
    .swiper-button-next {
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M13 9.25879L19.6207 15.8795L13 22.5002' stroke='%23000' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }
}
.dark {
  .muvi__detail {
    .swiper-button-prev {
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M19.0001 22.7414L12.3794 16.1207L19.0001 9.5' stroke='%23fff' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
    }
    .swiper-button-next {
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M13 9.25879L19.6207 15.8795L13 22.5002' stroke='%23fff' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }
}
</style>
