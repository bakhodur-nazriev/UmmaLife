<template>
  <div @click="likeHandler" class="like__icon">
    <AudioLikeIcon v-if="!audio.isLiked" />
    <AudioFilledLikeIcon v-else />
  </div>
</template>

<script>
import AudioFilledLikeIcon from '../icons/audio/AudioFilledLikeIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'

import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    audio: {
      type: Object
    },
    mainList: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    AudioFilledLikeIcon,
    AudioLikeIcon
  },
  computed: {
    ...mapState('audio', ['audios', 'audioIndex', 'dummyAudios'])
  },
  methods: {
    ...mapMutations('audio', ['setIsLiked', 'setAudios']),
    likeHandler() {
      this.$nextTick(() => {
        this.setIsLiked(this.audio.id)
      })
    }
  }
}
</script>
