<template>
  <div class="list" v-for="(audio, index) in audios2" :key="audio.id">
    <div class="list__left">
      <button class="list__play" @click="clickPlayHandler(audio, index)">
        <VideoPlayIcon />
      </button>
      <div class="list__left--wrapper">
        <div class="list__name">{{ audio.title }}</div>
        <div class="list__author">{{ audio.artist }}</div>
      </div>
    </div>
    <div class="list__right">
      <div class="list__icons" v-if="screenWidth > 1199">
        <div class="list__icons--btn">
          <AudioAddIcon @click="addAudio(audio)" />
        </div>
        <AlbumLike :audio="audio" :index="index" />
        <AudioLoop />
        <a class="download__icon" :href="audio.source" download>
          <AudioDownloadIcon />
        </a>
        <div class="list__icons--btn" @click="setShareOpen(true)">
          <AudioShareIcon />
        </div>
      </div>
      <div v-else class="list__menu">
        <MenuDetailsIcon />
      </div>
      <AudioDuration :audio="audio" />
    </div>
  </div>
</template>

<script>
import AudioLoop from '@/components/audio/AudioLoop.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'

import { mapActions, mapMutations, mapState } from 'vuex'
import AudioDuration from './AudioDuration.vue'
import { useWindowSize } from '@vueuse/core'
import AlbumLike from './AlbumLike.vue'
import { audios2 } from '@/dummy'
export default {
  data() {
    return {
      audios2
    }
  },
  computed: {
    ...mapState('audio', ['audios', 'isPlaying', 'audioIndex'])
  },
  methods: {
    ...mapActions('audio', ['playHandler']),
    ...mapMutations('audio', ['setAudios', 'addAudio', 'setAudioPause', 'setIsPlaying']),
    ...mapMutations(['setShareOpen']),
    clickPlayHandler(audio, index) {
      this.setIsPlaying(true)
      this.playHandler(index)
    },
    clickPauseHandler(audio, index) {
      this.setIsPlaying(false)
      this.setAudioPause(index)
    }
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioLoop,
    AudioDownloadIcon,
    AudioShareIcon,
    MenuDetailsIcon,
    AudioDuration,
    AlbumLike
  }
}
</script>

<script setup>
const { width: screenWidth } = useWindowSize()
</script>

<style lang="scss">
.list {
  background-color: var(--color-white);
  margin-bottom: 8px;
  padding: 16px 40px 16px 24px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &.active__list {
    background-color: var(--color-seashell);
  }

  .download__icon,
  .like__icon {
    width: 20px;
    height: 20px;
    color: var(--color-silver-chalice);
  }
  &.track__list {
    padding: 8px;
    .list__name {
      width: 150px;
      margin-right: 8px;
    }
  }
  @media (max-width: 991px) {
    padding: 8px;
  }
  &__left,
  &__right {
    display: flex;
    align-items: center;
  }
  &__right {
    gap: 48px;
    @media (max-width: 767px) {
      gap: 16px;
    }
  }
  &__menu {
    width: 32px;
    height: 32px;
    cursor: pointer;
    @media (max-width: 767px) {
      order: 1;
    }
  }
  &__play {
    background-color: var(--color-hippie-blue);
    cursor: pointer;
    border: none;
    outline: none;
    max-width: 32px;
    width: 100px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 16px;
    @media (max-width: 767px) {
      margin-right: 12px;
      max-width: 40px;
      height: 40px;
    }
    &.playing {
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
    }
    &:hover {
      background-color: var(--color-deep-cerulean);
      transition: all 0.15s ease-in-out;
    }
    svg {
      width: 12px;
      height: 12px;
    }
    .audio__play-icon {
      width: 32px;
      height: 32px;
      display: block;
      scale: 1.6;
      fill: var(--color-hippie-blue);
    }
  }
  &__name {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    width: 100%;
    @media (max-width: 767px) {
      margin-right: 0;
      font-size: 14px;
    }
  }
  &__author {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;

    @media (max-width: 767px) {
      font-size: 12px;
      opacity: 0.5;
    }
  }
  &__icons {
    display: flex;
    align-items: center;
    gap: 24px;
    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      z-index: 10;
      position: relative;
    }
    &--btn {
      background-color: transparent;
      width: 20px;
      height: 20px;
      scale: 1;
      cursor: pointer;
      color: var(--color-silver-chalice);

      position: relative;
      &.active::after,
      &:hover::after {
        opacity: 1;
      }
      &::after {
        content: '';
        position: absolute;
        left: -5px;
        top: -5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--color-gallery-second);
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  &__time {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  &__left {
    width: 80%;
    @media (max-width: 767px) {
    }
    &--wrapper {
      display: grid;
      align-items: center;
      grid-template-columns: 50% 50%;
      width: 100%;
      gap: 10px;

      @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  }
}
</style>
