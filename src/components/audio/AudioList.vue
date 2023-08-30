<template>
  <div class="list">
    <div class="list__left">
      <button class="list__play">
        <VideoPlayIcon />
      </button>
      <div class="list__name">
        {{ audioTitle }}
      </div>
      <div class="list__author">{{ audioArtist }}</div>
    </div>
    <div class="list__right">
      <div class="list__icons">
        <AudioAddIcon />
        <AudioBookmarkIcon />
        <AudioLikeIcon />
        <AudioShuffleIcon />
        <AudioDownloadIcon />
        <AudioShareIcon />
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
import AudioShuffleIcon from '@/components/icons/audio/AudioShuffleIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'

export default {
  props: {
    audioSource: String,
    audioTitle: String,
    audioArtist: String
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioBookmarkIcon,
    AudioLikeIcon,
    AudioShuffleIcon,
    AudioDownloadIcon,
    AudioShareIcon
  },
  data() {
    return {
      audioDuration: 0
    }
  },
  computed: {
    totalTime() {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.src = this.audioSource
      audio.onloadedmetadata = () => {
        this.audioDuration = audio.duration
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
  }
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
  &__left,
  &__right {
    display: flex;
    align-items: center;
  }
  &__right {
    gap: 48px;
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
