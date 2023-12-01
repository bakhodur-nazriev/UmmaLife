<template>
  <div>
    <div class="muvi__wrapper">
      <MuviCard
        v-for="(muvi, i) in savedMuvies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="cardClickHandler(i)"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'
import { useStore } from 'vuex'

import MuviCard from '@/components/muvi/MuviCard.vue'

const props = defineProps({
  user: Object
})
const store = useStore()
const savedMuvies = ref([])

const cardClickHandler = (index) => {
  store.commit('muvi/setInitialIndex', index)
  store.commit('muvi/setFrom', 'saved')
}

const fetchSavedMuvies = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY
    })
    const { data } = await axios.post('/get-saved-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    savedMuvies.value = data.data
    store.commit('muvi/setMuvies', savedMuvies.value)
  } catch (err) {
    console.log(err)
  }
}

fetchSavedMuvies()
</script>
