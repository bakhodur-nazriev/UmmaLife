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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.3776 0.221448C7.10359 1.07415 4.48949 3.79941 3.63126 7.25497C2.79083 10.6383 2.78921 25.409 3.62863 28.7892C5.00422 34.3274 10.2401 37.2916 15.4075 35.4576C17.9459 34.5566 28.2343 28.1655 30.7999 25.8957C35.7362 21.5287 35.733 14.5227 30.7926 10.152C29.3059 8.83692 22.6606 4.47038 18.5327 2.09631C15.2815 0.226653 12.6662 -0.374567 10.3776 0.221448ZM14.7277 6.6906C17.7343 8.20531 26.0305 13.6359 27.5207 15.0648C29.074 16.5543 29.1876 19.2392 27.7619 20.7631C26.3828 22.2368 16.9231 28.4043 14.0828 29.6812C11.6258 30.7858 9.67018 29.7293 9.05456 26.9645C8.65062 25.1506 8.65062 10.9037 9.05456 9.08986C9.73204 6.04691 11.7532 5.19213 14.7277 6.6906Z"
              fill="white"
            />
          </svg>
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

defineProps({
  video: Object
})

const remainingTime = ref(null)
const interval = ref(null)

onMounted(() => {
  const element = document.querySelector('.vjs-remaining-time .vjs-remaining-time-display')
  interval.value = setInterval(() => {
    remainingTime.value = element.textContent
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval.value)
})
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
    min-width: 440px !important;
    width: 100%;
    height: 300px !important;
    left: -14px;
    top: -14px;
    background: transparent;
    .vjs-poster {
      overflow: hidden;
      border-radius: 0px;
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
    .vjs-big-play-button {
      display: none !important;
    }
  }
  .custom-player-controls {
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
      color: var(--color-white);
      border-radius: 6px;
      background: rgba(31, 31, 31, 0.5);
      backdrop-filter: blur(10px);
      min-width: 50px;
      text-align: center;
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      // background-color: rgba($color: var(--color-hippie-blue), $alpha: 0.6);
      background: rgba(73, 163, 153, 0.6);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      cursor: pointer;
    }
  }
}
</style>
