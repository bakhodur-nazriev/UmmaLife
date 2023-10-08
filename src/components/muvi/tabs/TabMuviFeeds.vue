<template>
  <div class="muvi__wrapper">
    <MuviCard
      v-for="muvi in muvies"
      :key="muvi.id"
      :muvi="muvi"
      @cardClickHandler="isDetailOpen = true"
    />
  </div>

  <teleport to="body">
    <MuviDetailSlider v-if="isDetailOpen" @handleClickOutside="isDetailOpen = false" />
  </teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { muvies as allMuvies } from '@/dummy.js'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
const muvies = computed(() => allMuvies)

const isDetailOpen = ref(false)
</script>
