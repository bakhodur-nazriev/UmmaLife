<template>
  <div class="list__icons--btn" :class="{ active: isLoop }" @click="handleLoop">
    <AudioShuffleIcon />
  </div>
</template>

<script>
import AudioShuffleIcon from '@/components/icons/audio/AudioShuffleIcon.vue'
import { mapMutations } from 'vuex'
export default {
  components: { AudioShuffleIcon },
  data() {
    return {
      isLoop: false
    }
  },
  methods: {
    ...mapMutations('audio', ['setIsLoop']),
    handleLoop() {
      this.isLoop = !this.isLoop
      this.setIsLoop(this.isLoop)
    }
  }
}
</script>
