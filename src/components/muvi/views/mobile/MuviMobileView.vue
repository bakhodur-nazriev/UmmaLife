<template>
  <div class="muvi__feeds">
    <div class="muvi__feeds--top">
      <button class="muvi__feeds--top-left" @click="$router.go(-1)"><ArrowLeftIcon /></button>
      <div class="muvi__feeds--tab">
        <div
          class="muvi__feeds--tab-list"
          v-for="tab in tabs"
          :key="tab.id"
          @click="clickTabHandler(tab.id)"
          :class="{ active: tab.isActive }"
        >
          {{ $t(tab.name) }}
        </div>
      </div>
      <div class="left"></div>
    </div>
    <MainMuviTab v-if="tabs[0].isActive" filter="subscription" />
    <MainMuviTab v-else-if="tabs[1].isActive" filter="recomendation" />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MainMuviTab from '@/components/muvi/mobile/tabs/MainMuviTab.vue'

const tabs = ref([
  { id: 0, name: 'muvi_mobile.subscriptions', isActive: false },
  { id: 1, name: 'muvi_mobile.recommendations', isActive: true }
])

const clickTabHandler = (id) => {
  tabs.value.forEach((tab) => (tab.isActive = false))
  tabs.value[id].isActive = true
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
      color: var(--color-stable-white);
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
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
      color: var(--color-stable-white);
      &.active {
        font-weight: 700;
        text-shadow: 0px 5px 8px rgba(0, 0, 0, 0.8);
      }
      &:not(:last-child) {
        padding-right: 12px;
        border-right: 1px solid var(--color-stable-white);
        margin-right: 12px;
      }
    }
  }
}
</style>
