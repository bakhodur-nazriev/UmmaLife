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
import axios from 'axios'
import { ref } from 'vue'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
const muvies = ref([])

const isDetailOpen = ref(false)

const fetchFeeds = async () => {
  const { data } = await axios.get('/json/muvi/viewed.json')
  muvies.value = data.data
}

fetchFeeds()
</script>
