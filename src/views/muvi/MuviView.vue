<template>
  <MainLayout v-if="width > 767">
    <MuviDesktopView />
  </MainLayout>
  <MuviMobileLayout v-else>
    <MuviMobileView />
  </MuviMobileLayout>
</template>

<script setup>
import axios from 'axios'
import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import MuviDesktopView from '@/components/muvi/views/MuviDesktopView.vue'
import MuviMobileView from '@/components/muvi/views/MuviMobileView.vue'
import { getFormData } from '@/utils'
const { width } = useWindowSize()

const login = async () => {
  try {
    if (localStorage.getItem('access_token')) return
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      username: 'Test2021',
      password: '123456789',
      android_n_device_id: null,
      android_dev_device_id: null,
      android_beta_device_id: null,
      ios_n_device_id: null,
      ios_dev_device_id: null,
      ios_beta_device_id: null
    })
    const { data } = await axios.post('/auth', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (data?.api_status === 200) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user_id', data.user_id)
    }
  } catch (err) {
    console.log(err)
  }
}
const getUserInfo = async () => {
  try {
    if (!localStorage.getItem('user_id') || localStorage.getItem('user')) return
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      user_id: localStorage.getItem('user_id')
    })
    const { data } = await axios.post('/get-user-data', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    if (data?.api_status === 200) {
      localStorage.setItem('user', JSON.stringify(data.data))
    }
  } catch (err) {
    console.log(err)
  }
}

login()
getUserInfo()
</script>
