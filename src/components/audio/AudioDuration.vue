<template>
  <div class="list__time">{{ totalTime }}</div>
</template>

<script>
export default {
  props: {
    audio: Object
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
  }
}
</script>
