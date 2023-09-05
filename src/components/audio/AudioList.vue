<template>
  <div class="list" :class="className">
    <div class="list__left">
      <button class="list__play" @click="$emit('playAudio', audio)">
        <VideoPlayIcon />
      </button>
      <div class="list__name">{{ audio.title }}</div>
      <div class="list__author">{{ audio.artist }}</div>
    </div>
    <div class="list__right">
      <div class="list__icons" v-if="!className.includes('track__list') && screenWidth > 1199">
        <AudioAddIcon />
        <AudioBookmarkIcon />
        <div @click="liked = !liked" class="like__icon">
          <AudioLikeIcon v-if="!liked" />
          <AudioFilledLikeIcon v-else />
        </div>
        <AudioShuffleIcon />
        <a class="download__icon" :href="audio.source" download>
          <AudioDownloadIcon />
        </a>
        <AudioShareIcon />
      </div>
      <div v-else-if="className.includes('track__list') || screenWidth < 1199" class="list__menu">
        <MenuDetailsIcon />
      </div>
      <div class="list__time">{{ totalTime }}</div>
    </div>
  </div>
</template>

<script>
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioBookmarkIcon from '@/components/icons/audio/AudioBookmarkIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioFilledLikeIcon from '@/components/icons/audio/AudioFilledLikeIcon.vue'
import AudioShuffleIcon from '@/components/icons/audio/AudioShuffleIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import { useWindowSize } from '@vueuse/core'

export default {
  emits: ['playAudio'],
  props: {
    audio: Object,
    className: {
      type: String,
      default: '',
      isActive: false
    },
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioBookmarkIcon,
    AudioLikeIcon,
    AudioShuffleIcon,
    AudioDownloadIcon,
    AudioShareIcon,
    MenuDetailsIcon,
    AudioFilledLikeIcon
  },
  data() {
    return {
      audioDuration: 0,
      liked: this.isLiked
    }
  },
  computed: {
    screenWidth() {
      const { width } = useWindowSize()
      return width.value
    },
    totalTime() {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.src = this.audio.source
      audio.onloadedmetadata = () => {
        if (audio.duration) {
          this.audioDuration = audio.duration
        }
      }

      if (this.audioDuration) {
        return this.convertTime(this.audioDuration)
      } else {
        return '00:00'
      }
    }
  },
  methods: {
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2)
      const minutes = (seconds % 3600) / 60
      return [minutes, seconds % 60].map(format).join(':')
    }
  },
  setActive() {}
}
</script>

<style lang="scss" scoped>
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
  }
  &__menu {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  &__play {
    background-color: var(--color-hippie-blue);
    cursor: pointer;
    border: none;
    outline: none;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 16px;
    &:hover {
      background-color: var(--color-deep-cerulean);
      transition: all 0.15s ease-in-out;
    }
    svg {
      width: 12px;
      height: 12px;
    }
  }
  &__name {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    width: 563px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    margin-right: 107px;
    @media (max-width: 1450px) {
      width: 200px;
      margin-right: 16px;
    }
    @media (max-width: 991px) {
      width: 150px;
    }
  }
  &__author {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &__icons {
    display: flex;
    align-items: center;
    gap: 24px;
    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  &__time {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
  }
}
</style>
