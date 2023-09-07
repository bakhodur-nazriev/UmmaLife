<template>
  <div class="list" :class="className">
    <div class="list__left">
      <button class="list__play" @click="playHandler(index)" :class="{ playing: audio.isPlaying }">
        <VideoPlayIcon v-if="!audio.isPlaying" />
        <svg v-else class="audio__play-icon" aria-hidden="true">
          <use xlink:href="#icon-pause"></use>
        </svg>
      </button>
      <div class="list__name">{{ audio.title }}</div>
      <div class="list__author">{{ audio.artist }}</div>
    </div>
    <div class="list__right">
      <div class="list__icons" v-if="!className.includes('track__list') && screenWidth > 1199">
        <div class="list__icons--btn">
          <AudioAddIcon />
        </div>
        <AudioBookmarkIcon />
        <div v-if="playList" @click="likeHandler(index)" class="like__icon">
          <AudioLikeIcon v-if="!audio.isLiked" />
          <AudioFilledLikeIcon v-else />
        </div>
        <div v-else @click="setIsLiked(index)" class="like__icon">
          <AudioLikeIcon v-if="!audio.isLiked" />
          <AudioFilledLikeIcon v-else />
        </div>
        <AudioLoop />
        <a class="download__icon" :href="audio.source" download>
          <AudioDownloadIcon />
        </a>
        <AudioShareIcon />
      </div>
      <div v-else-if="className.includes('track__list') || screenWidth < 1199" class="list__menu">
        <MenuDetailsIcon />
      </div>
      <AudioDuration :audio="audio" />
    </div>
  </div>
</template>

<script>
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioBookmarkIcon from '@/components/icons/audio/AudioBookmarkIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioFilledLikeIcon from '@/components/icons/audio/AudioFilledLikeIcon.vue'
import AudioLoop from '@/components/audio/AudioLoop.vue'

import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import { mapActions, mapMutations } from 'vuex'
import { audios } from '@/dummy'
import { useWindowSize } from '@vueuse/core'
import AudioDuration from './AudioDuration.vue'

export default {
  props: {
    audio: {
      type: Object
    },
    index: {
      type: Number
    },
    playList: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dummyAudios: audios
    }
  },
  methods: {
    ...mapMutations('audio', ['setIndex', 'setIsPlayerOpen', 'setAudioPlaying', 'setIsLiked']),
    ...mapActions('audio', ['playHandler']),
    likeHandler(index) {
      this.dummyAudios.forEach((a) => {
        if (this.audio.id === a.id) {
          a.isLiked = !a.isLiked
        }
      })
      this.setIsLiked(index)
    }
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioBookmarkIcon,
    AudioLikeIcon,
    AudioDownloadIcon,
    AudioShareIcon,
    MenuDetailsIcon,
    AudioFilledLikeIcon,
    AudioDuration,
    AudioLoop
  },
  setup() {
    const { width } = useWindowSize()
    return {
      screenWidth: width.value
    }
  }
}
</script>
