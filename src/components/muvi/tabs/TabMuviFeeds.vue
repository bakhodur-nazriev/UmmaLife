<template>
  <div class="muvi__wrapper">
    <MuviCard v-for="muvi in muvies" :key="muvi.id" :muvi="muvi" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { muvies as allMuvies } from '@/dummy.js'
import MuviCard from '@/components/muvi/MuviCard.vue'
const muvies = computed(() => allMuvies)
</script>
