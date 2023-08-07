<template>
  <div class="shorts">
    <ShortsCard
      v-for="(item, i) in 5"
      :style="styles"
      :key="item"
      :index="item"
      v-touch:swipe="onSwipeItem(item, i)"
    />
  </div>
</template>

<script>
import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'

export default {
  components: { ShortsCard },
  data() {
    return {
      initialYOffset: 0,
      allow: true
    }
  },
  computed: {
    styles() {
      return { transform: `translateY(${this.initialYOffset}px)` }
    }
  },
  methods: {
    onSwipeItem(item, i) {
      return (direction, mouseEvent) => {
        if (direction === 'top' && i !== 4) {
          this.initialYOffset -= mouseEvent.target.clientHeight + 12
        } else if (direction === 'bottom' && i !== 0) {
          this.initialYOffset += mouseEvent.target.clientHeight + 12
        }
      }
    }
  }
}
</script>

<style lang="scss">
.shorts {
  margin: 10px 0;
  outline: 1px solid red;
  height: 860px;
  overflow: hidden;
}
</style>
