<template>
  <div>
    <div class="muvi__wrapper">
      <MuviCard
        v-for="(muvi, i) in myMuvies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="cardClickHandler(i)"
      />
    </div>
    <MuviDetailSlider
      v-if="isDetailOpen"
      @handleClickOutside="isDetailOpen = false"
      :muvies="myMuvies"
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

const myMuvies = ref([])
const isDetailOpen = ref(false)
const page = ref(1)
const initialSlideIndex = ref(0)

const cardClickHandler = (index) => {
  isDetailOpen.value = true
  initialSlideIndex.value = index
}

const fetchMyMuvies = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      user_id: props.user.value?.user_id,
      page: page.value
    })
    const { data } = await axios.post('/muvi-recommendations', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    myMuvies.value = data.data
  } catch (err) {
    console.log(err)
  }
}

fetchMyMuvies()
</script>
