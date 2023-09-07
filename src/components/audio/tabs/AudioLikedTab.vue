<template>
  <div class="tabs">
    <GroupsSearch class="tabs__search" placeholder="Поиск аудио" />
    <div class="tabs__lists">
      <div class="list" v-for="(audio, index) in likedAudios" :key="audio.id">
        <div class="list__left">
          <button
            class="list__play"
            @click="clickPlayHandler(audio, index)"
            :class="{ playing: audio.isPlaying }"
          >
            <VideoPlayIcon v-if="!audio.isPlaying" />
            <svg v-else class="audio__play-icon" aria-hidden="true">
              <use xlink:href="#icon-pause"></use>
            </svg>
          </button>
          <div class="list__name">{{ audio.title }}</div>
          <div class="list__author">{{ audio.artist }}</div>
        </div>
        <div class="list__right">
          <div class="list__icons" v-if="screenWidth > 1199">
            <div class="list__icons--btn">
              <AudioAddIcon @click="addAudio(audio)" />
            </div>
            <AudioBookmarkIcon />
            <div @click="likeHandler(index)" class="like__icon">
              <AudioLikeIcon v-if="!audio.isLiked" />
              <AudioFilledLikeIcon v-else />
            </div>
            <AudioLoop />
            <a class="download__icon" :href="audio.source" download>
              <AudioDownloadIcon />
            </a>
            <AudioShareIcon />
          </div>
          <div v-else class="list__menu">
            <MenuDetailsIcon />
          </div>
          <AudioDuration :audio="audio" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioLoop from '@/components/audio/AudioLoop.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioBookmarkIcon from '@/components/icons/audio/AudioBookmarkIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioFilledLikeIcon from '@/components/icons/audio/AudioFilledLikeIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
import AudioDuration from '@/components/audio/AudioDuration.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'

import { mapActions, mapMutations, mapState } from 'vuex'
import { audios } from '@/dummy'
import { useWindowSize } from '@vueuse/core'

export default {
  data() {
    return {
      dummyAudios: audios
    }
  },
  computed: {
    ...mapState('audio', ['audios']),
    likedAudios() {
      return this.dummyAudios.filter((a) => a.isLiked)
    }
  },
  methods: {
    ...mapActions('audio', ['playHandler']),
    ...mapMutations('audio', ['setIsLiked', 'setAudios', 'addAudio']),
    clickPlayHandler(audio, index) {
      this.setAudios([])
      this.dummyAudios.forEach((a) => (a.isPlaying = false))
      this.dummyAudios[index].isPlaying = true
      this.setAudios([{ ...audio, isPlaying: true }])
      this.playHandler(0)
    },
    likeHandler(index) {
      this.dummyAudios[index].isLiked = !this.dummyAudios[index].isLiked
      if (this.audios[0]?.id === this.dummyAudios[index]?.id) {
        this.setIsLiked(0)
      }
    }
  },
  components: {
    VideoPlayIcon,
    AudioAddIcon,
    AudioBookmarkIcon,
    AudioLikeIcon,
    AudioLoop,
    AudioDownloadIcon,
    AudioShareIcon,
    MenuDetailsIcon,
    AudioFilledLikeIcon,
    AudioDuration,
    GroupsSearch
  },
  setup() {
    const { width } = useWindowSize()
    return {
      screenWidth: width.value
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  &__search {
    max-width: 716px;
    width: 100%;
  }
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin: 24px 0 16px;
  }
  &__lists {
    margin: 24px 0;
  }
}
</style>
