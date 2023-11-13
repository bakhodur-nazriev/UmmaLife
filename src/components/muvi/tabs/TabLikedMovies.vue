<template>
  <div class="muvi__wrapper">
    <template v-for="muvi in likedMovies" :key="muvi.id">
      <MuviCard
        :muvi="muvi"
        v-if="muvi && !Array.isArray(muvi)"
        @cardClickHandler="isDetailOpen = true"
      />
    </template>
  </div>
  <MuviDetailSlider
    v-if="isDetailOpen"
    @handleClickOutside="isDetailOpen = false"
    :muvies="likedMovies"
  />
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { vIntersectionObserver } from '@vueuse/components'
import { getFormData } from '@/utils'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'

const likedMovies = ref([])
const isLoading = ref(false)
const isDetailOpen = ref(false)

const fetchLikedMovies = async () => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      last_id: null
    })
    const { data } = await axios.post('/muvi-liked-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    likedMovies.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    page.value += 1
    await fetchFeeds(page.value)
  }
}

fetchLikedMovies()
</script>
