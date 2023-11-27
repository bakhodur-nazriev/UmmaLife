<template>
  <div class="muvi__feeds muvies__tab">
    <div class="muvi__feeds--top">
      <button class="muvi__feeds--top-left" @click="emit('backTo')"><ArrowLeftIcon /></button>
      <div class="muvi__feeds--tab"></div>
      <div class="left"></div>
    </div>
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
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'
import MuviSlide from '@/components/muvi/mobile/MuviSlide.vue'
import ShortsPlay from '@/components/icons/shorts/ShortsPlay.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'

const props = defineProps({
  muvies: Array,
  initialSlideIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['backTo'])

const sw = ref(null)
const isSwipedLeft = ref(false)
const thumbsSwiper = ref()

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}
const onSlideChange = (swiper) => (sw.value = swiper)
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
</script>

<style lang="scss" scoped>
.muvies__tab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  z-index: 20;
  background-color: #000;
}
</style>
