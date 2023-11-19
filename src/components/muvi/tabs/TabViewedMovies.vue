<template>
  <div class="muvi__wrapper">
    <template v-for="(muvi, index) in viewedMovies" :key="muvi.id">
      <MuviCard
        :muvi="muvi"
        v-if="muvi && !Array.isArray(muvi)"
        @cardClickHandler="cardClickHandler(index)"
      />
    </template>
  </div>
  <div
    v-intersection-observer="loadMore"
    v-if="!isLoading && countElements >= 20"
    class="observer"
  ></div>
  <MuviDetailSlider
    v-if="isDetailOpen"
    @handleClickOutside="isDetailOpen = false"
    :muvies="viewedMovies"
    :initialSlideIndex="initialSlideIndex"
  />
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import axios from 'axios'
import { getFormData } from '@/utils'

import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'

const viewedMovies = ref([])
const isLoading = ref(false)
const countElements = ref(0)
const isDetailOpen = ref(false)

const computedLastId = ref(null)
const initialSlideIndex = ref(0)

const cardClickHandler = (index) => {
  isDetailOpen.value = true
  initialSlideIndex.value = index
}

const fetchViewedMovies = async (last_id = null) => {
  isLoading.value = true
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      last_id
    })
    const { data } = await axios.post('/muvi-viewed-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    countElements.value = data.countElements
    viewedMovies.value = [...viewedMovies.value, ...data.data]
    computedLastId.value = viewedMovies.value[viewedMovies.value.length - 1].id
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    await fetchViewedMovies(computedLastId.value)
  }
}

fetchViewedMovies()
</script>
