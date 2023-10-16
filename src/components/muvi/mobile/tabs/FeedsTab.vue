<template>
  <div class="muvi__feeds" v-touch:swipe="touchHandler">
    <div class="muvi__feeds--top">
      <button class="muvi__feeds--top-left" @click="$router.go(-1)"><ArrowLeftIcon /></button>
      <div class="muvi__feeds--tab">
        <div class="muvi__feeds--tab-list">Subscriptions</div>
        <div class="muvi__feeds--tab-list">Recommendations</div>
      </div>
      <div class="left"></div>
    </div>
    <swiper
      class="muvi__feeds--wrapper"
      :slides-per-view="'auto'"
      :direction="'vertical'"
      @slideChange="onSlideChange"
      @swiper="onSlideChange"
    >
      <swiper-slide
        v-for="(source, i) in sources"
        :key="`${source.src}_${i}`"
        class="muvi__feeds--card"
        v-slot="{ isActive }"
      >
        <VideoPlayer
          :volume="1"
          :src="source.src"
          :poster="`/images/muvies/muvi${i + 1}.jpg`"
          :type="source.type"
          controls
          playsinline
          loop
          @playing="playingHandler"
          @pause="playingHandler"
          @play="playingHandler"
          :preload="'auto'"
          :autoplay="isActive"
        >
          <MuviFeedsInfo
            @categoryHandler="emit('categoryHandler')"
            @audioHandler="emit('audioHandler')"
          />
        </VideoPlayer>
        <MuviFeedReactions
          @commentClicked="source.isCommentOpen = true"
          @shareClicked="source.isShareOpen = true"
          @menuClicked="source.isMenuOpen = true"
        />
        <teleport to="body">
          <MuviFeedComments
            :isCommentsOpen="source.isCommentOpen"
            @closeComment="source.isCommentOpen = false"
            v-if="source.isCommentOpen"
          />
          <MuviFeedShare
            :isShareOpen="source.isShareOpen"
            @closeShare="source.isShareOpen = false"
            v-if="source.isShareOpen"
          />
          <MuviFeedMenu
            :isMenuOpen="source.isMenuOpen"
            @closeMenu="source.isMenuOpen = false"
            v-if="source.isMenuOpen"
          />
        </teleport>
      </swiper-slide>
    </swiper>
  </div>
  <teleport to="body">
    <AsideMobileSlider :isSwipedLeft="isSwipedLeft" />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { VideoPlayer } from '@videojs-player/vue'
import { sources as allSources } from '@/dummy.js'

import AsideMobileSlider from '@/components/muvi/mobile/AsideMobileSlider.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'

import MuviFeedsInfo from '@/components/muvi/mobile/MuviFeedsInfo.vue'
import MuviFeedReactions from '@/components/muvi/mobile/MuviFeedReactions.vue'
import MuviFeedComments from '@/components/muvi/mobile/MuviFeedComments.vue'
import MuviFeedShare from '@/components/muvi/mobile/MuviFeedShare.vue'
import MuviFeedMenu from '@/components/muvi/mobile/MuviFeedMenu.vue'

const emit = defineEmits(['categoryHandler', 'audioHandler'])

const sw = ref(null)
const sources = ref(allSources)
const isPlaying = ref(true)
const isSwipedLeft = ref(false)

const onSlideChange = (swiper) => (sw.value = swiper)

const touchHandler = (action) => {
  nextTick(() => {
    if (action === 'top' && isPlaying.value) {
      sw.value.slideNext()
    } else if (action === 'bottom' && isPlaying.value) {
      sw.value.slidePrev()
    } else if (action === 'left') {
      isSwipedLeft.value = true
    } else if (action === 'right') {
      isSwipedLeft.value = false
    }
    isPlaying.value = false
  })
}

const playingHandler = (event) => {
  if (event.type === 'playing') {
    isPlaying.value = true
  } else if (event.type === 'pause') {
    isPlaying.value = false
  }
}
</script>

<style lang="scss">
.muvi__feeds {
  width: 100%;
  height: calc(100dvh - 64px);
  &--wrapper {
    height: 100%;
  }
  &--card {
    user-select: none;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: 700;
    width: 100%;
    height: 100%;
    position: relative;
    .video-js {
      width: 100%;
      height: 100%;
      display: block;
    }
    .vjs-poster {
      img {
        object-fit: cover;
        object-position: center;
      }
    }
    .vjs-tech {
      object-fit: cover !important;
      object-position: center !important;
      overflow: hidden;
    }
    .vjs-load-progress {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    .vjs-big-play-button {
      display: none !important;
    }
    .vjs-control-bar {
      background-color: transparent !important;
      margin-bottom: 12px;
    }

    .vjs-remaining-time {
      display: none !important;
    }
    .vjs-picture-in-picture-control {
      display: none !important;
    }
    .vjs-fullscreen-control {
      display: none !important;
    }
    .vjs-volume-panel {
      order: 3;
    }
    .vjs-progress-control {
      order: 2;
    }
    .vjs-play-control {
      order: 1;
    }
    .video-js .vjs-slider {
      background-color: rgba($color: #fff, $alpha: 0.2);
    }
  }
  &--top {
    position: fixed;
    top: 16px;
    left: 16px;
    width: calc(100% - 32px);
    z-index: 15;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    .left {
      width: 28px;
      height: 28px;
    }
    &-left {
      padding: 0;
      border: none;
      width: 40px;
      height: 40px;
      background-color: var(--gray-rgba);
      backdrop-filter: blur(5px);
      color: var(--color-white);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 28px;
        height: 28px;
        display: block;
      }
    }
  }
  &--tab {
    display: flex;
    align-items: center;
    &-list {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
      color: var(--color-white);
      &:not(:last-child) {
        padding-right: 12px;
        border-right: 1px solid var(--color-white);
        margin-right: 12px;
      }
    }
  }
}
</style>
