<template>
  <span v-touch:swipe="touchHandler">
    <swiper
      class="muvi__feeds--wrapper"
      :modules="[Thumbs]"
      :slides-per-view="'auto'"
      :direction="'vertical'"
      :thumbs="{ swiper: thumbsSwiper }"
      :initialSlide="initialSlideIndex"
      @slideChange="onSlideChange"
      @swiper="onSlideChange"
      @reachEnd="reachEnd"
    >
      <swiper-slide
        v-for="muvi in muvies"
        :key="muvi.id"
        class="muvi__feeds--card"
        v-slot="{ isActive }"
      >
        <MuviSlide :muvi="muvi" v-if="isActive" />
      </swiper-slide>
    </swiper>
    <teleport to="body">
      <div class="muvi__feeds--aside" :class="{ active: isSwipedLeft }">
        <div class="muvi__feeds--aside-top" ref="asideTop">
          <p>{{ $t('muvi.other_muvi') }}</p>
          <span>{{ muvies.length }}</span>
        </div>
        <swiper
          ref="side_slider"
          class="muvi__feeds--aside-slider"
          :slides-per-view="'auto'"
          :direction="'vertical'"
          :space-between="4"
          :modules="[Thumbs]"
          :initialSlide="initialSlideIndex"
          @swiper="setThumbsSwiper"
        >
          <swiper-slide v-for="muvi in muvies" :key="muvi.id" class="muvi__feeds--aside-card">
            <img :src="muvi?.preview" :alt="muvi?.description" loading="lazy" />
            <ShortsPlay />
          </swiper-slide>
        </swiper>
      </div>
    </teleport>
  </span>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'
import { getFormData } from '@/utils'

import MuviSlide from '@/components/muvi/mobile/MuviSlide.vue'
import ShortsPlay from '@/components/icons/shorts/ShortsPlay.vue'

const muvies = ref([])
const countElements = ref(0)
const isLoading = ref(false)
const page = ref(1)
const sw = ref(null)
const isSwipedLeft = ref(false)
const initialSlideIndex = ref(0)
const thumbsSwiper = ref()

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const props = defineProps({
  filter: {
    type: String,
    default: 'recomendation'
  }
})

const onSlideChange = (swiper) => (sw.value = swiper)

const reachEnd = () => {
  if (!isLoading.value && countElements.value >= 18) {
    loadMore('from_bottom')
  }
}

const touchHandler = (action) => {
  nextTick(() => {
    if (action === 'top') {
      sw.value.slideNext()
    } else if (action === 'bottom') {
      sw.value.slidePrev()
    } else if (action === 'left') {
      isSwipedLeft.value = true
    } else if (action === 'right') {
      isSwipedLeft.value = false
    }
  })
}

const fetchFeeds = async (page) => {
  isLoading.value = true

  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      page,
      filter: props.filter
    })
    const { data } = await axios.post('/get-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    muvies.value = [...muvies.value, ...data.data]
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
  if (muvies.value.length > 50) {
    muvies.value.splice(0, 20)
  }
  await fetchFeeds(page.value)
}

fetchFeeds(page.value)
</script>

<style lang="scss">
.muvi__feeds {
  &--aside {
    width: 56px;
    position: fixed;
    top: 40px;
    right: -100%;
    height: calc(100dvh - 138px);
    z-index: 10;
    transition: all 0.3s ease-in-out;
    &.active {
      right: 4px;
      z-index: 150;
    }
    &-top {
      padding: 5px;
      text-align: center;
      width: 100%;
      border-radius: 4px;
      background: var(--gray-rgba);
      backdrop-filter: blur(5px);
      color: var(--color-stable-white);

      display: flex;
      flex-direction: column;
      gap: 4px;
      p {
        padding: 0;
        margin: 0;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
      }
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
      }
    }
    &-slider {
      max-height: calc(100% - 52px);
      height: 100%;
    }
    &-card {
      max-height: 100px;
      border-radius: 4px;
      border: 1px solid var(--color-silver-chalice);
      overflow: hidden;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        position: absolute;
        transition: all 0.3s;
        opacity: 0;
      }
      &.swiper-slide-thumb-active {
        border-color: var(--color-hippie-blue);
        &::after,
        svg {
          opacity: 1;
        }
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
    }
  }
}
</style>
