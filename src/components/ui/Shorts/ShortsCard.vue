<template>
  <div ref="shortsCard" class="shorts__card" :style="{ '--shorts-offset': `${offset}px` }">
    <div class="shorts__card--inner">
      <video-player
        :src="index % 2 === 1 ? '/video/short-1.mp4' : '/video/short-2.mp4'"
        controls
        :volume="1"
      >
        <template v-slot="{ player, state }">
          <div class="custom-player-controls">
            <button class="mute" @click="player.muted(!state.muted)">
              <UnmuteIcon v-if="!state.muted" />
              <MuteIcon v-else />
            </button>
            <div class="info">
              <div class="info__user">
                <div class="info__user--info">
                  <img src="/images/users/jeff.png" alt="user" class="info__user--img" />
                  <p>arabman</p>
                </div>

                <button class="info__user--btn">Подписаться</button>
              </div>
              <div class="info__text">
                Небольшой влог о самом высокоразвитом городе мира - Дубае. Почему мы выбрали этот
                город для...
              </div>
            </div>
          </div>
        </template>
      </video-player>
    </div>
    <ShortsReactions @openModal="$emit('openModal')" />
  </div>
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue'
import UnmuteIcon from '@/components/icons/shorts/UnmuteIcon.vue'
import MuteIcon from '@/components/icons/shorts/MuteIcon.vue'
import ShortsReactions from '@/components/ui/Shorts/ShortsReactions.vue'

export default {
  emits: ['openModal'],
  props: {
    index: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  components: { VideoPlayer, UnmuteIcon, MuteIcon, ShortsReactions }
}
</script>
<script setup>
/* eslint-disable */
import { useElementSize } from '@vueuse/core'
import { ref, watch } from 'vue'
const shortsCard = ref(null)

const { height: eleHeight } = useElementSize(shortsCard)

const emit = defineEmits(['eleHeight'])

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
  &.isModal {
    max-width: 100%;
    height: 100%;
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
        background: #fff;
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
