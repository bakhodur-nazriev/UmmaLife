<template>
  <MuviDetailSlider
    @handleClickOutside="router.go(-1)"
    :muvies="store.getters['muvi/getMuvies']"
    :initialSlideIndex="store.getters['muvi/getInitialIndex']"
    v-if="store.getters['muvi/getMuvies'].length > 0"
  />
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { onMounted, ref } from 'vue'

import { getFormData } from '@/utils'

import { useRoute, useRouter } from 'vue-router'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
import { useStore } from 'vuex'

const isLoading = ref(false)

const router = useRouter()
const route = useRoute()
const store = useStore()

const fetchSingleMovie = async (video_id) => {
  isLoading.value = true

  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id
    })

    const { data } = await axios.post('/get-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    store.commit('muvi/setMuvies', [data.data])
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => await fetchSingleMovie(route.params.id))
</script>

<style lang="scss">
.muvi_detail {
  position: fixed;
}
</style>
