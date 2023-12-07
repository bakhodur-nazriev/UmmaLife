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
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'

import MuviCard from '@/components/muvi/MuviCard.vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  user: Object
})

const myMuvies = ref([])
const page = ref(1)

const cardClickHandler = (index) => {
  store.commit('muvi/setInitialIndex', index)
  store.commit('muvi/setFrom', 'myMuvi')
}

const fetchMyMuvies = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      user_id: props.user?.user_id,
      page: page.value
    })
    const { data } = await axios.post('/get-user-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    myMuvies.value = data.data
    store.commit('muvi/setMuvies', myMuvies.value)
  } catch (err) {
    console.log(err)
  }
}

fetchMyMuvies()
</script>
