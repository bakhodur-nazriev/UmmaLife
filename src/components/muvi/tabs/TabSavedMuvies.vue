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
    <MuviDetailSlider
      v-if="isDetailOpen"
      @handleClickOutside="isDetailOpen = false"
      :muvies="savedMuvies"
      :initialSlideIndex="initialSlideIndex"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'

import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'

const props = defineProps({
  user: Object
})

const savedMuvies = ref([])
const isDetailOpen = ref(false)
const initialSlideIndex = ref(0)

const cardClickHandler = (index) => {
  isDetailOpen.value = true
  initialSlideIndex.value = index
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
  } catch (err) {
    console.log(err)
  }
}

fetchSavedMuvies()
</script>
