<template>
  <div class="muvi__activity">
    <MuviTabSwitch :tabs="tabs" :activeIndex="activeIndex" @handleTabClick="handleTabClick" />
    <div class="muvi__wrapper" v-if="activeIndex === 0">
      <MuviCard
        v-for="muvi in likedMovies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="isDetailOpen = true"
      />
    </div>
    <div class="muvi__wrapper" v-else-if="activeIndex === 1">
      <MuviCard
        v-for="muvi in viewedMovies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="isDetailOpen = true"
      />
    </div>
  </div>
  <teleport to="body">
    <MuviDetailSlider v-if="isDetailOpen" @handleClickOutside="isDetailOpen = false" />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { computed, ref } from 'vue'
import { muvies as allMuvies } from '@/dummy.js'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviTabSwitch from '@/components/muvi/MuviTabSwitch.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
const isDetailOpen = ref(false)
const likedMovies = computed(() => allMuvies.slice(0, 6))
const viewedMovies = computed(() => allMuvies.slice(6, 12))
const activeIndex = ref(0)
const tabs = ref(['Liked', 'Viewed'])

const handleTabClick = (index) => {
  activeIndex.value = index
}
</script>
