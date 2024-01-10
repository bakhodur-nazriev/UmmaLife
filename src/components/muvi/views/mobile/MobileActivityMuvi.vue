<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="$router.go(-1)" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">{{ $t('muvi.tabs.activity') }}</div>
      <div class="left"></div>
    </div>
    <div class="muvi__mobile--tabs">
      <div
        class="muvi__mobile--tabs--list"
        v-for="(tab, index) in [$t('muvi.liked'), $t('muvi.viewed')]"
        :key="tab"
        @click="handleTabClick(index, index === 0 ? 'liked' : 'viewed')"
        :class="{ active: activeIndex === index }"
      >
        <span>{{ tab }}</span>
      </div>
    </div>
    <template v-if="activeIndex === 0">
      <div class="muvi__mobile--wrapper">
        <MuviCard
          v-for="(muvi, index) in likedMovies"
          :key="muvi.id"
          :muvi="muvi"
          @click="handleMuvieOpen(index)"
        />
      </div>
      <div
        v-intersection-observer="loadMoreLiked"
        v-if="!isLoading && countElements >= 20"
        class="observer"
      ></div>
    </template>

    <template v-if="activeIndex === 1">
      <div class="muvi__mobile--wrapper">
        <MuviCard
          v-for="(muvi, index) in viewedMovies"
          :key="muvi.id"
          :muvi="muvi"
          @click="handleMuvieOpen(index)"
        />
      </div>
      <div
        v-intersection-observer="loadMoreViewed"
        v-if="!isLoading && countElements >= 20"
        class="observer"
      ></div>
    </template>

    <MuviesTab
      :muvies="muvies"
      :initialSlideIndex="initialSlideIndex"
      v-if="isMuviesOpen"
      @backTo="isMuviesOpen = false"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'
import { vIntersectionObserver } from '@vueuse/components'

import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import MuviesTab from '@/components/muvi/mobile/tabs/MuviesTab.vue'

const likedMovies = ref([])
const viewedMovies = ref([])
const activeIndex = ref(0)
const countElements = ref(0)
const isLoading = ref(false)
const computedLastId = ref(null)
const initialSlideIndex = ref(0)
const isMuviesOpen = ref(false)
const muvies = ref([])

const handleTabClick = async (index, action) => {
  activeIndex.value = index
  computedLastId.value = null
  muvies.value = []
  if (action === 'liked') {
    await fetchLikedMovies()
  } else {
    await fetchViewedMovies()
  }
}
const handleMuvieOpen = async (index) => {
  initialSlideIndex.value = index
  isMuviesOpen.value = true
}

const fetchLikedMovies = async (last_id = null) => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
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
    computedLastId.value = likedMovies.value[likedMovies.value.length - 1]?.id || 0
    muvies.value = likedMovies.value
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
const fetchViewedMovies = async (last_id = null) => {
  isLoading.value = true
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      last_id
    })
    const { data } = await axios.post('/muvi-viewed-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    countElements.value = data.countElements
    viewedMovies.value = [...viewedMovies.value, ...data.data]
    computedLastId.value = viewedMovies.value[viewedMovies.value.length - 1].id
    muvies.value = viewedMovies.value
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

fetchLikedMovies()

const loadMoreLiked = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    countElements.value = 0
    await fetchLikedMovies(computedLastId.value)
  }
}
const loadMoreViewed = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    countElements.value = 0
    await fetchViewedMovies(computedLastId.value)
  }
}
</script>

<style lang="scss">
.muvi__mobile {
  &--tabs {
    position: sticky;
    top: 63px;
    left: 0;
    width: 100%;
    padding: 20px 16px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-bottom: 1px solid var(--color-seashell);
    background-color: var(--color-white);
    z-index: 20;
    &--list {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: var(--color-secondary);
        padding-bottom: 7px;
        border-bottom: 2px solid transparent;
      }
      &.active {
        span {
          border-color: var(--color-hippie-blue);
          color: var(--color-mine-shaft);
        }
      }
    }
  }
}
</style>
