<template>
  <div class="list" :class="className">
    <div class="list__left">
      <button
        class="list__play playing"
        @click="pauseHandler(index)"
        :class="{ playing: audio.isPlaying }"
        v-if="audio.isPlaying"
      >
        <svg class="audio__play-icon" aria-hidden="true">
          <use xlink:href="#icon-pause"></use>
        </svg>
      </button>
      <button v-else class="list__play" @click="clickPlay(index)">
        <VideoPlayIcon />
      </button>
      <div class="list__name">{{ audio.title }}</div>
      <div class="list__author">{{ audio.artist }}</div>
    </div>
    <div class="list__right">
      <div class="list__icons" v-if="!className.includes('track__list') && screenWidth > 1199">
        <div class="list__icons--btn">
          <AudioAddIcon />
        </div>
        <AlbumLike :audio="audio" :index="index" />
        <AudioLoop />
        <a class="download__icon" :href="audio.source" download>
          <AudioDownloadIcon />
        </a>
        <AudioShareIcon @click="setShareOpen(true)" />
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
import AudioLoop from '@/components/audio/AudioLoop.vue'

import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import { mapActions, mapMutations } from 'vuex'
import { useWindowSize } from '@vueuse/core'
import AudioDuration from './AudioDuration.vue'
import AlbumLike from './AlbumLike.vue'

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
  methods: {
    ...mapMutations(['setShareOpen']),
    ...mapMutations('audio', ['setIndex', 'setIsPlayerOpen', 'setAudioPause', 'setIsPlaying']),
    ...mapActions('audio', ['playHandler']),
    pauseHandler(index) {
      this.setAudioPause(index)
      this.setIsPlaying(false)
    },
    clickPlay(index) {
      this.playHandler(index)
      this.setIsPlaying(true)
    }
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioDownloadIcon,
    AudioShareIcon,
    MenuDetailsIcon,
    AudioDuration,
    AudioLoop,
    AlbumLike
  },
  setup() {
    const { width } = useWindowSize()
    return {
      screenWidth: width.value
    }
  }
}
</script>
