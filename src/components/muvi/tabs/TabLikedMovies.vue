<template>
  <div class="muvi__wrapper">
    <template v-for="(muvi, index) in likedMovies" :key="muvi.id">
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
import { ref } from 'vue'
import axios from 'axios'
import { vIntersectionObserver } from '@vueuse/components'
import { getFormData } from '@/utils'
import MuviCard from '@/components/muvi/MuviCard.vue'
import { useStore } from 'vuex'

const likedMovies = ref([])
const isLoading = ref(false)
const computedLastId = ref(null)
const countElements = ref(0)
const store = useStore()

const cardClickHandler = (index) => {
  store.commit('muvi/setInitialIndex', index)
  store.commit('muvi/setFrom', 'liked')
}

const fetchLikedMovies = async (last_id = null) => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      last_id
    })
    const { data } = await axios.post('/muvi-liked-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    countElements.value = data.countElements
    likedMovies.value = [...likedMovies.value, ...data.data]
    store.commit('muvi/setMuvies', likedMovies.value)
    computedLastId.value = likedMovies.value[likedMovies.value.length - 1]?.id || -1
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    await fetchLikedMovies(computedLastId.value)
  }
}

fetchLikedMovies()
</script>
