<template>
  <div class="muvi__activity">
    <MuviTabSwitch :tabs="tabs" :activeIndex="activeIndex" @handleTabClick="handleTabClick" />

    <TabLikedMovies v-if="activeIndex === 0" />
    <TabViewedMovies v-else-if="activeIndex === 1" />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'

import MuviTabSwitch from '@/components/muvi/MuviTabSwitch.vue'
import TabLikedMovies from '@/components/muvi/tabs/TabLikedMovies.vue'
import TabViewedMovies from '@/components/muvi/tabs/TabViewedMovies.vue'

const activeIndex = ref(0)
const tabs = ref(['Liked', 'Viewed'])

const handleTabClick = async (index) => {
  activeIndex.value = index
}
</script>
