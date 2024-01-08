<template>
  <video-player
    class="video-component"
    :src="video?.src"
    :poster="video?.poster"
    controls
    :volume="1"
  >
    <template v-slot="{ player, state }">
      <div class="custom-player-controls">
        <div
          v-if="!state.playing"
          @click="state.playing ? player.pause() : player.play()"
          class="play-button"
        >
          <VideoPlayIcon />
        </div>
        <span class="remaining-time" v-if="remainingTime">{{ remainingTime }}</span>
      </div>
    </template>
  </video-player>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'

defineProps({
  video: Object
})

const remainingTime = ref(null)
</script>

<style lang="scss">
.video-message {
  .video-component {
    top: 0 !important;
    left: 0 !important;
  }
}
.video-component {
  &.video-js {
    display: block;
    max-width: 440px !important;
    width: 100%;
    height: 100%;
    left: -14px;
    top: -14px;
    max-height: 440px;
    background: transparent;
    .vjs-poster {
      overflow: hidden;
      border-radius: 0px;
      img {
        object-fit: contain;
        object-position: center;
      }
    }
    &.vjs-fullscreen .vjs-tech {
      max-width: 100%;
      max-height: 100%;
    }
    .vjs-tech {
      object-fit: contain !important;
      object-position: center !important;
      overflow: hidden;
      height: 100%;
      width: 100%;
      max-height: 440px;
      max-width: 440px;
      position: static;
      display: block;
    }
    .vjs-big-play-button {
      display: none !important;
    }
  }
  .custom-player-controls {
    @media (max-width: 575px) {
      height: auto;
    }
    .remaining-time {
      position: absolute;
      top: 16px;
      left: 18px;
      z-index: 10;
      padding: 4px 6px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      color: var(--color-stable-white);
      border-radius: 6px;
      background: rgba(31, 31, 31, 0.5);
      backdrop-filter: blur(10px);
      min-width: 50px;
      text-align: center;
      @media (max-width: 767px) {
        top: 5px;
        left: 5px;
        font-size: 12px;
      }
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      // background-color: rgba($color: var(--color-hippie-blue), $alpha: 0.6);
      background: rgba(73, 163, 153, 0.6);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      cursor: pointer;
      svg {
        width: 32px;
        height: 32px;
      }
      @media (max-width: 767px) {
        width: 50px;
        height: 50px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
