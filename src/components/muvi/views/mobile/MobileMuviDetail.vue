<template>
  <div class="muvi__feeds">
    <div class="muvi__feeds--top">
      <button class="muvi__feeds--top-left" @click="$router.go(-1)"><ArrowLeftIcon /></button>
      <div class="muvi__feeds--tab"></div>
      <div class="left"></div>
    </div>
    <span>
      <swiper class="muvi__feeds--wrapper" :slides-per-view="'auto'" :direction="'vertical'">
        <swiper-slide class="muvi__feeds--card">
          <MuviSlide :muvi="muvi" />
        </swiper-slide>
      </swiper>
    </span>
  </div>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { getFormData } from '@/utils'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'

import MuviSlide from '@/components/muvi/mobile/MuviSlide.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(false)
const muvi = ref({})

const fetchSingleMovie = async (video_id) => {
  isLoading.value = true

  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
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
    muvi.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => await fetchSingleMovie(route.params.id))
</script>
