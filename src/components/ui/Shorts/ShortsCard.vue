<template>
  <div ref="shortsCard" class="shorts__card" :style="{ '--shorts-offset': `${offset}px` }">
    <div class="shorts__card--inner">
      <video-player
        :src="muvi?.src"
        controls
        :volume="1"
        autoplay="play"
        :poster="muvi?.preview ? muvi?.preview : null"
        :playbackRate="store.getters['muvi/getPlaybackSpeed'] || 1"
      >
        <template v-slot="{ player, state }">
          <div class="custom-player-controls">
            <button class="mute" @click="player.muted(!state.muted)">
              <UnmuteIcon v-if="!state.muted" />
              <MuteIcon v-else />
            </button>
          </div>
        </template>
      </video-player>
    </div>
    <ShortsReactions @openModal="emit('openModal')" />
  </div>
</template>

<script setup>
/* eslint-disable */
import { useElementSize } from '@vueuse/core'
import { ref, watch } from 'vue'

import { VideoPlayer } from '@videojs-player/vue'
import UnmuteIcon from '@/components/icons/shorts/UnmuteIcon.vue'
import MuteIcon from '@/components/icons/shorts/MuteIcon.vue'
import ShortsReactions from '@/components/ui/Shorts/ShortsReactions.vue'
import { useStore } from 'vuex'

const emit = defineEmits(['openModal', 'eleHeight'])
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 0
  },
  muvi: {
    type: Object,
    default: () => ({
      src: '/video/short-1.mp4'
    })
  }
})
const store = useStore()

const shortsCard = ref(null)
const { height: eleHeight } = useElementSize(shortsCard)

watch(
  () => eleHeight.value,
  () => {
    emit('eleHeight', eleHeight.value)
  }
)
</script>

<style lang="scss">
.shorts__card {
  max-width: 415px;
  height: 815px;
  width: 100%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  transform: translateY(var(--shorts-offset));
  position: relative;
  @media (max-width: 1850px) {
    height: 93%;
    max-width: 350px;
  }
  @media (max-width: 575px) {
    max-width: 300px;
  }
  &.isModal {
    max-width: 100%;
    height: 100%;
    z-index: 120;
    .shorts__card--inner {
      border-radius: 0;
    }
    .shorts__reactions {
      display: none;
    }
    .info {
      display: none;
    }
  }
  &--inner {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
  }
  .video-js {
    width: 100% !important;
    height: 100% !important;
    display: block;
    background: transparent;
    .vjs-poster img {
      object-fit: cover;
    }
    .vjs-tech {
      object-fit: cover !important;
      object-position: center !important;
      overflow: hidden;
    }
    .vjs-big-play-button {
      display: none !important;
    }
    .vjs-control-bar {
      background: transparent;
      height: 52px;
      .vjs-play-control {
        display: none;
      }
      .vjs-volume-panel {
        display: none;
      }
      .vjs-mute-control {
        display: none;
      }
      .vjs-remaining-time {
        display: none;
      }
      .vjs-picture-in-picture-control {
        display: none;
      }
      .vjs-fullscreen-control {
        display: none;
      }
      .vjs-slide {
        opacity: 0.2;
        background: var(--color-white);
        width: 428px;
        margin: 0 auto;
      }
      .vjs-progress-control {
        .vjs-progress-holder {
          margin: 0 16px;
        }
      }
    }
  }
  .custom-player-controls {
    .mute {
      position: absolute;
      border-radius: 10px;
      background: var(--bg-mute-btn);
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      top: 8px;
      right: 8px;
      svg {
        display: block;
        width: 16px;
        height: 16px;
      }
    }
    .info {
      position: absolute;
      bottom: 44px;
      left: 0;
      width: 100%;
      padding: 10px 16px 0;
      background: transparent;
      &__user {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        &--info {
          display: flex;
          align-items: center;
          gap: 8px;
          p {
            font-size: 12px;
            font-style: normal;
            font-weight: 550;
            line-height: normal;
            color: var(--color-white);
            text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
          }
        }
        &--img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        &--btn {
          padding: 9px 16px 7px;
          border-radius: 8px;
          border: 1px solid var(--color-white);
          font-size: 12px;
          font-style: normal;
          font-weight: 550;
          line-height: normal;
          color: var(--color-white);
          cursor: pointer;
        }
      }
      &__text {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
        text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
        color: var(--color-white);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
