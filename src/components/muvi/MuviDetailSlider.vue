<template>
  <div class="muvi__detail--overlay">
    <div class="muvi__detail" v-on-click-outside="handleClickOutside">
      <div class="muvi__detail--thumb">
        <div class="muvi__detail--more" ref="detailMore" :style="`--more-height: ${moreHeight}px`">
          Другие MUVI<span>{{ muvies.length }}</span>
        </div>
        <swiper
          :modules="[Thumbs, Mousewheel]"
          :slides-per-view="'auto'"
          :space-between="6"
          :direction="'vertical'"
          :mousewheel="true"
          @swiper="setThumbsSwiper"
        >
          <swiper-slide v-for="muvi in muvies" :key="muvi.id" class="thumb-slider-item">
            <img :src="muvi.preview" :alt="muvi.description" loading="lazy" />
            <ShortsPlay />
          </swiper-slide>
        </swiper>
      </div>
      <swiper
        :modules="[Thumbs, Navigation]"
        :slides-per-view="1"
        :watch-slides-progress="true"
        :watch-overflow="true"
        :space-between="6"
        :direction="'horizontal'"
        :thumbs="{ swiper: thumbsSwiper }"
        navigation
        :resistance-ratio="0"
        class="muvi__detail--main"
      >
        <swiper-slide v-for="muvi in muvies" :key="muvi.id" v-slot="{ isActive }">
          <div class="shorts__modal parent">
            <div class="shorts__video video">
              <ShortsCard class="isModal" :muvi="muvi" v-if="isActive" />
            </div>
            <div class="shorts__content">
              <div class="shorts__info content">
                <div class="shorts__info--top top">
                  <div class="shorts__user--wrapper">
                    <div class="shorts__user">
                      <img src="/images/users/jeff.png" alt="jeff" class="shorts__user--img" />
                      <div class="shorts__user--name">arabman</div>
                      <div class="shorts__user--bage">
                        <BageIcon />
                      </div>
                    </div>
                    <button class="shorts__info--details">
                      <MenuBlackDetailsIcon />
                    </button>
                  </div>

                  <div class="shorts__info--text">
                    Небольшой влог о самом высокоразвитом городе мира - Дубае. Почему мы выбрали
                    этот город для...
                  </div>
                  <div class="shorts__bottom">
                    <div class="shorts__bottom--views">1 тыс. просмотров</div>
                    <span>|</span>
                    <div class="shorts__bottom--date">20.08.2022</div>
                  </div>
                  <div class="shorts__bottom--comments">
                    <p>Комментарии</p>
                    <span>415</span>
                  </div>
                </div>
                <div class="shorts__comments comment">
                  <ShortsBlockComments v-for="i in 10" :key="i" />
                </div>
                <div class="shorts__info--bottom bottom">
                  <div class="shorts__info--reactions">
                    <div class="reaction active">
                      <like-icon></like-icon>
                      <span>1550</span>
                    </div>
                    <div class="reaction">
                      <dislike-icon></dislike-icon>
                      <span>1550</span>
                    </div>
                    <div class="reaction">
                      <love-icon></love-icon>
                      <span>1935</span>
                    </div>
                  </div>
                  <div class="shorts__comments--actions">
                    <div class="actions__btn">
                      <HeartIcon />
                      <span>{{ $t('buttons.like') }}</span>
                    </div>
                    <div class="actions__btn">
                      <ShareIcon />
                      <span>{{ $t('buttons.share') }}</span>
                    </div>
                  </div>
                  <form class="shorts__comments--form">
                    <div class="form__input">
                      <img src="/images/users/jeff.png" alt="jeff" />
                      <input type="text" placeholder="Комментарий..." />
                    </div>
                    <button class="form__btn" type="submit">
                      <SendIcon />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { Navigation, Thumbs, Mousewheel, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { vOnClickOutside } from '@vueuse/components'
import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'
import ShortsBlockComments from '@/components/ui/Shorts/ShortsBlockComments.vue'
import BageIcon from '@/components/icons/BageIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/SmallLoveIcon.vue'
import LikeIcon from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/SmallDislikeIcon.vue'
import HeartIcon from '@/components/icons/shorts/HeartIcon.vue'
import ShareIcon from '@/components/icons/shorts/ShareIcon.vue'
import SendIcon from '@/components/icons/shorts/SendIcon.vue'
import ShortsPlay from '@/components/icons/shorts/ShortsPlay.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  muvies: {
    type: Array,
    default: () => []
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
      background-color: var(--color-white);
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
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M19.0001 22.7414L12.3794 16.1207L19.0001 9.5' stroke='currentColor' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
    }
    .swiper-button-next {
      right: 100px;
      &::before {
        content: url("data:image/svg+xml, %3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Icon'%3E%3Cpath id='Vector' d='M13 9.25879L19.6207 15.8795L13 22.5002' stroke='currentColor' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/g%3E%3C/svg%3E");
      }
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
</style>
