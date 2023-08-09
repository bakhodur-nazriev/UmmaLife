<template>
  <div class="shorts">
    <ShortsCard
      v-for="(item, i) in 5"
      :key="item"
      :index="item"
      v-touch:swipe="onSwipeItem(item, i)"
      :offset="initialYOffset"
      @eleHeight="(height) => (eleHeight = height)"
      @openModal="isModalOpen = true"
    />
    <div class="shorts__buttons">
      <button class="up" @click="clickHandler('top')"><ArrowUpIcon /></button>
      <button class="down" @click="clickHandler('bottom')"><ArrowDownIcon /></button>
    </div>
    <teleport to="body">
      <ShortsModal v-show="isModalOpen" @handleClickOutside="isModalOpen = false" />
    </teleport>
  </div>
</template>

<script>
import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'
import ArrowUpIcon from '@/components/icons/shorts/ArrowUpIcon.vue'
import ArrowDownIcon from '@/components/icons/shorts/ArrowDownIcon.vue'
import ShortsModal from '@/components/ui/Shorts/ShortsModal.vue'

export default {
  components: { ShortsCard, ArrowDownIcon, ArrowUpIcon, ShortsModal },
  data() {
    return {
      initialYOffset: 0,
      index: 0,
      eleHeight: 0,
      isModalOpen: false
    }
  },

  methods: {
    onSwipeItem(item, i) {
      return (direction, mouseEvent) => {
        if (direction === 'top' && i !== 4) {
          this.index += 1
          this.initialYOffset -= this.eleHeight + 12
        } else if (direction === 'bottom' && i !== 0) {
          this.index -= 1
          this.initialYOffset += this.eleHeight + 12
        }
      }
    },
    clickHandler(direction) {
      if (direction === 'bottom' && this.index !== 4) {
        this.index += 1
        this.initialYOffset -= this.eleHeight + 12
      } else if (direction === 'top' && this.initialYOffset !== 0) {
        this.index -= 1
        this.initialYOffset += this.eleHeight + 12
      }
    }
  }
}
</script>

<style lang="scss">
.shorts {
  height: 860px;
  position: relative;
  overflow: hidden;
  &__buttons {
    position: absolute;
    bottom: 45px;
    left: 78px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    button {
      cursor: pointer;
      border-radius: 10px;
      background: var(--color-silver-chalice);
      border: none;
      outline: none;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        display: block;
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
