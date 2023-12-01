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
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import { getFormData } from '@/utils'
import { useStore } from 'vuex'

import MuviCard from '@/components/muvi/MuviCard.vue'

const viewedMovies = ref([])
const isLoading = ref(false)
const countElements = ref(0)

const computedLastId = ref(null)
const store = useStore()

const cardClickHandler = (index) => {
  store.commit('muvi/setInitialIndex', index)
  store.commit('muvi/setFrom', 'viewed')
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
    store.commit('muvi/setMuvies', viewedMovies.value)
    computedLastId.value = viewedMovies.value[viewedMovies.value.length - 1]?.id || -1
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
