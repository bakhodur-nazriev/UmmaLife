<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="$router.go(-1)" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">{{ $t('muvi.tabs.popular') }}</div>
      <div class="settings__header--search" @click="handleSearchOpen">
        <SearchIcon />
      </div>
      <transition name="slide">
        <div
          v-if="isSearchOpen"
          class="settings__header--input"
          v-on-click-outside="handleCloseSearch"
        >
          <SearchInput
            :full="true"
            :placeholder="$t('placeholders.search_input')"
            @input="searchHandler"
          />
        </div>
      </transition>
    </div>
    <div class="muvi__mobile--categories">
      <div
        class="muvi__mobile--categories--btn"
        v-for="(category, index) in categories"
        :key="category"
        :class="{ active: activeIndex === index }"
        @click="handleSelect(index, category)"
      >
        {{ category.description }} <span>{{ category.emoji }}</span>
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard
        v-for="(muvi, index) in muvies"
        :key="muvi.id"
        :muvi="muvi"
        @click="handleMuvieOpen(index)"
      />
    </div>
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
import axios from 'axios'
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { getFormData } from '@/utils'
import { useDebounceFn } from '@vueuse/core'

import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import MuviesTab from '@/components/muvi/mobile/tabs/MuviesTab.vue'

const emit = defineEmits(['backToMain'])

const isSearchOpen = ref(false)
const activeIndex = ref(0)
const muvies = ref([])
const isMuviesOpen = ref(false)
const initialSlideIndex = ref(0)

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
const handleMuvieOpen = (index) => {
  initialSlideIndex.value = index
  isMuviesOpen.value = true
}
const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}

const searchHandler = useDebounceFn((e) => {
  searchMuvie(e?.target?.value)
}, 500)

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

const searchMuvie = async (query) => {
  if (!query) {
    fetchRecommendations(categories.value[0].code)
    return
  }
  try {
    const payload = getFormData({
      server_key: import.meta.env.VITE_SERVER_KEY,
      query
    })
    const { data } = await axios.post('/muvi-search-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    muvies.value = data.data
  } catch (err) {
    console.log(err)
  }
}

Promise.all([fetchRecommendations(categories.value[0].code), fetchCategories()])
</script>

<style lang="scss">
.muvi__mobile {
  .muvi__mobile--nav-btn {
    color: var(--color-mine-shaft);
  }
  .settings__header--search {
    color: var(--color-mine-shaft);
  }
  &--categories {
    padding: 20px 16px 0;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &--btn {
      padding: 7px 16px;
      border-radius: 6px;
      background-color: var(--color-seashell);
      color: var(--color-mine-shaft);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      display: flex;
      align-items: center;
      gap: 5px;
      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-stable-white);
      }
    }
  }
}
</style>
