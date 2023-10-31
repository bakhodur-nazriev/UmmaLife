<template>
  <div class="video__page--wrapper">
    <VideoPageCard v-for="i in 10" :key="i" />
  </div>
</template>

<script setup>
import VideoPageCard from '@/components/video/VideoPageCard.vue'
</script>
