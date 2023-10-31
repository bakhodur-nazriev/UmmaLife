<template>
  <div class="video__page--wrapper">
    <VideoPageCard v-for="i in 10" :key="i" />
  </div>
</template>

<script setup>
import VideoPageCard from '@/components/video/VideoPageCard.vue'
</script>

<style lang="scss">
.video__page {
  &--wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media (max-width: 767px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 9px;
      padding: 20px 16px 70px 16px;
      background-color: var(--color-white);
    }
  }
}
</style>
