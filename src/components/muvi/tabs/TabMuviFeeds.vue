<template>
  <div style="position: relative">
    <div
      class="observer-top"
      v-intersection-observer="loadUp"
      v-if="!isLoading && slicedPages.length > 0"
    ></div>
    <div class="muvi__wrapper">
      <template v-for="(muvi, index) in muvies" :key="muvi.id">
        <MuviCard
          :muvi="muvi"
          v-if="muvi && !Array.isArray(muvi)"
          @cardClickHandler="cardClickHandler(index)"
        />
      </template>
    </div>
    <div
      v-intersection-observer="loadMore"
      v-if="!isLoading && countElements >= 18"
      class="observer"
    ></div>

    <MuviDetailSlider
      v-if="isDetailOpen"
      @handleClickOutside="isDetailOpen = false"
      :muvies="muvies"
      :initialSlideIndex="initialSlideIndex"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { vIntersectionObserver } from '@vueuse/components'
import MuviCard from '@/components/muvi/MuviCard.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
import { getFormData } from '@/utils'

const muvies = ref([])
const isDetailOpen = ref(false)
const page = ref(1)
const isLoading = ref(false)
const countElements = ref(0)
const initialSlideIndex = ref(0)
const slicedPages = ref([])

const cardClickHandler = (index) => {
  isDetailOpen.value = true
  initialSlideIndex.value = index
}

const fetchFeeds = async (page, action = 'down') => {
  isLoading.value = true

  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      page,
      filter: 'recomendation'
    })
    const { data } = await axios.post('/get-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    if (action === 'up') {
      muvies.value = [...data.data, ...muvies.value]
    } else {
      muvies.value = [...muvies.value, ...data.data]
    }
    countElements.value = data.countElements
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

let counter = 0

function sliceArrayAction(action = 'from_top') {
  if (muvies.value.length > 50 && action === 'from_top') {
    muvies.value = muvies.value.slice(20)
    counter++
    slicedPages.value.push(counter)
  }
  if (muvies.value.length > 50 && action === 'from_bottom') {
    muvies.value = muvies.value.slice(0, -20)
    counter--
    slicedPages.value.pop()
  }
}

const loadMore = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    page.value += 1
    await fetchFeeds(page.value)
    sliceArrayAction('from_top')
  }
}

const loadUp = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    page.value = slicedPages.value[slicedPages.value.length - 1]
    await fetchFeeds(page.value, 'up')
    sliceArrayAction('from_bottom')
  }
}
fetchFeeds(page.value)
</script>

<style lang="scss">
.observer-top {
  width: 100%;
  position: absolute;
  top: 15%;
  padding: 20px;
}
</style>
