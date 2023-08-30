<template>
  <div class="audio__player">
    <span>{{ currentAudioName || audios[0].title }}</span>
    <audio-player
      ref="audioPlayer"
      :audio-list="audios.map((elm) => elm.source)"
      :before-play="handleBeforePlay"
      theme-color="#49A399"
      :show-playback-rate="false"
    >
      <h2>Hey</h2>
    </audio-player>
  </div>
</template>

<script>
export default {
  props: {
    audios: Array
  },
  data() {
    return {
      currentAudioName: ''
    }
  },

  methods: {
    // Something to do before playing
    handleBeforePlay(next) {
      // There are a few things you can do here...
      this.currentAudioName = this.audios[this.$refs.audioPlayer.currentPlayIndex].title
      next() // Start playing
    }
  }
}
</script>

<style lang="scss">
.audio__player {
  background: var(--color-white);
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 268px);
  left: 260px;
  padding: 15px 32px;
  .audio__progress-wrap {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 0 !important;
  }
}
</style>
