<template>
  <MainLayout v-if="width > 767">
    <button type="button" @click="login">Fetch</button>
    <pre v-html="pre"></pre>
    <MuviDesktopView />
  </MainLayout>
  <MuviMobileView v-else />
</template>

<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import MainLayout from '@/components/layouts/MainLayout.vue'
import MuviDesktopView from '@/components/muvi/views/MuviDesktopView.vue'
import MuviMobileView from '@/components/muvi/views/MuviMobileView.vue'

const { width } = useWindowSize()
const pre = ref(null)
const login = async () => {
  const url = 'https://dev.ummalife.com/api'

  try {
    const payload = getFormData({
      server_key: '7c5940661c603657d973782cfdff94c2',
      username: 'Test2021',
      password: '123456789',
      android_n_device_id: null,
      android_dev_device_id: null,
      android_beta_device_id: null,
      ios_n_device_id: null,
      ios_dev_device_id: null,
      ios_beta_device_id: null
    })
    const json = await fetch(`${url}/auth`, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*'
      }
    })

    const data = await json.json()
    console.log(data)

    pre.value = JSON.stringify(data)
  } catch (err) {
    pre.value = err
  }
}

const getFormData = (options) => {
  const formData = new FormData()
  for (let key in options) {
    formData.append(key, options[key])
  }

  return formData
}
</script>
