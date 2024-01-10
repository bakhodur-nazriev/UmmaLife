<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progressBarWidth: '0%'
    }
  },
  methods: {
    startLoadingAnimation() {
      this.progressBarWidth = '0%'

      const intervalId = setInterval(() => {
        if (parseInt(this.progressBarWidth) >= 100) {
          clearInterval(intervalId)
          this.startLoadingAnimation() // Restart the animation
        } else {
          this.progressBarWidth = parseInt(this.progressBarWidth) + 1 + '%'
        }
      }, 12)
    }
  },
  mounted() {
    this.startLoadingAnimation()
  }
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.progress-bar {
  height: 2px;
  background-color: var(--color-hippie-blue);
  transition: width 0.1s;
}
</style>
