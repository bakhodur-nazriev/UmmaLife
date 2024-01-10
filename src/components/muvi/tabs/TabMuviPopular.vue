<template>
  <div class="muvi__popular">
    <div class="muvi__popular--search">
      <GroupsSearch placeholder="Поиск MUVI" />
    </div>
    <swiper :slides-per-view="'auto'" :space-between="8" class="muvi__popular--swiper">
      <swiper-slide
        v-for="(category, index) in categories"
        :key="category.code"
        :class="{ active: activeIndex === index }"
        @click="handleSelect(index, category)"
      >
        <span>{{ category.description }} {{ category.emoji }}</span>
      </swiper-slide>
    </swiper>
    <div class="muvi__wrapper">
      <template v-for="(muvi, index) in muvies" :key="muvi.id">
        <MuviCard
          :muvi="muvi"
          @cardClickHandler="cardClickHandler(index)"
          v-if="muvi && !Array.isArray(muvi)"
        />
      </template>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import MuviCard from '@/components/muvi/MuviCard.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import { getFormData } from '@/utils'
import { useStore } from 'vuex'

const muvies = ref([])
const activeIndex = ref(0)

const store = useStore()

const categories = ref([
  {
    code: 'top',
    description: 'Top',
    emoji: '🔝',
    id: 999999
  },
  {
    code: 'new',
    description: 'New',
    emoji: '🆕',
    id: 9992132
  }
])

const cardClickHandler = (index) => {
  store.commit('muvi/setInitialIndex', index)
  store.commit('muvi/setFrom', 'popular')
}

const handleSelect = async (index, category) => {
  activeIndex.value = index
  if (category.code === 'top' || category.code === 'new') {
    await fetchRecommendations(category.code)
  } else {
    await fetchCategorieVideos(category.id)
  }
}

const fetchRecommendations = async (category_code) => {
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      last_id: null,
      filter: category_code
    })
    const { data } = await axios.post('/muvi-recommendations', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    muvies.value = data.data
    store.commit('muvi/setMuvies', muvies.value)
  } catch (err) {
    console.log(err)
  }
}

const fetchCategories = async () => {
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      page: 1
    })
    const { data } = await axios.post('/categories', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    categories.value = [...categories.value, ...data.data]
  } catch (err) {
    console.log(err)
  }
}
const fetchCategorieVideos = async (category_id) => {
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      last_id: null,
      category_id
    })
    const { data } = await axios.post('/muvi-category-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    muvies.value = data.data
    store.commit('muvi/setMuvies', muvies.value)
  } catch (err) {
    console.log(err)
  }
}

Promise.all([fetchRecommendations(categories.value[0].code), fetchCategories()])
</script>

<style lang="scss" scoped>
.muvi__popular {
  &--search {
    max-width: 716px;
    width: 100%;
    margin-bottom: 28px;
  }
  &--swiper {
    margin-bottom: 28px;
    .swiper-slide {
      padding: 16px 32px;
      background-color: var(--color-white);
      border-radius: 10px;
      cursor: pointer;
      width: fit-content;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      user-select: none;
      &:not(.active):hover {
        background-color: var(--color-hippie-blue);
        color: var(--color-stable-white);
        opacity: 0.5;
      }
      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-stable-white) !important;
      }
    }
  }
}
.light .muvi__popular--swiper {
  .swiper-slide {
    color: var(--color-mine-shaft);
  }
}
.dark .muvi__popular--swiper {
  .swiper-slide {
    color: var(--color-stable-white);
  }
}
</style>
