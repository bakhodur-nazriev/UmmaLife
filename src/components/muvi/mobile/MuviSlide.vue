<template>
  <VideoPlayer
    :src="muvi.src"
    :poster="muvi.preview"
    controls
    :volume="1"
    autoplay="play"
    :playback-rate="playbackSpeed"
  >
    <MuviFeedsInfo
      @categoryHandler="emit('categoryHandler')"
      @audioHandler="emit('audioHandler')"
      :muvi="muvi"
    />
  </VideoPlayer>
  <MuviFeedReactions
    @commentClicked="isCommentOpen = true"
    @shareClicked="isShareOpen = true"
    @menuClicked="isMenuOpen = true"
    :muvi="muvi"
  />
  <teleport to="body">
    <MuviFeedComments
      :isCommentsOpen="isCommentOpen"
      @closeComment="isCommentOpen = false"
      v-if="isCommentOpen"
      :muvi="muvi"
    />
    <MuviFeedShare
      :isShareOpen="isShareOpen"
      :muviId="muvi?.id"
      @closeShare="isShareOpen = false"
      v-if="isShareOpen"
    />
    <MuviFeedMenu
      :isMenuOpen="isMenuOpen"
      @closeMenu="isMenuOpen = false"
      v-if="isMenuOpen"
      @setPlaybackSpeed="setPlaybackSpeed"
      :playbackSpeed="playbackSpeed"
      :muvi="muvi"
    />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import axios from 'axios'
import { getFormData } from '@/utils'
import MuviFeedsInfo from '@/components/muvi/mobile/MuviFeedsInfo.vue'
import MuviFeedReactions from '@/components/muvi/mobile/MuviFeedReactions.vue'
import MuviFeedComments from '@/components/muvi/mobile/MuviFeedComments.vue'
import MuviFeedShare from '@/components/muvi/mobile/MuviFeedShare.vue'
import MuviFeedMenu from '@/components/muvi/mobile/MuviFeedMenu.vue'

const isCommentOpen = ref(false)
const isShareOpen = ref(false)
const isMenuOpen = ref(false)
const playbackSpeed = ref(1)

const setPlaybackSpeed = (speed) => {
  playbackSpeed.value = speed
}

const emit = defineEmits(['categoryHandler', 'audioHandler'])

const props = defineProps({
  muvi: Object
})

const setMuvieViewed = async (video_id) => {
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      video_id
    })
    await axios.post('/set-view-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  }
}
setMuvieViewed(props.muvi?.id)
</script>
