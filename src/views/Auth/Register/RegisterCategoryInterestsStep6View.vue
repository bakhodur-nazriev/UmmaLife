<script setup>
import FormAuth from '@/components/ui/FormAuth.vue'
import { ref, onMounted, computed } from 'vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import axios from 'axios'
import { getFormData } from '@/utils'
import router from '@/router'
import i18n from '@/i18n'

const locale = i18n.global.locale

const languageMap = {
  en: 'english',
  ar: 'arabic',
  ru: 'russian',
  id: 'indonesian',
  ms: 'malay',
  tr: 'turkish',
  uz: 'uzbek',
  tj: 'tajik',
  tab: 'tabasaran',
  cv: 'chuvash',
  ur: 'urdu',
  inh: 'ingush',
  tt: 'tatar',
  lak: 'lak',
  kum: 'qumuq',
  krc: 'balkarian',
  am: 'amharic',
  lez: 'lezgin'
}

const getLanguageByLocale = (currentLocale) => {
  return languageMap[currentLocale] || ''
}

const categoryItems = ref([])
const selectedCategories = ref([])
const fetchCategories = async () => {
  const payload = getFormData({
    server_key: import.meta.env.VITE_SERVER_KEY,
    page: '',
    lang: getLanguageByLocale(locale)
  })

  const accessToken = localStorage.getItem('access_token')
  const params = { access_token: accessToken }

  try {
    const response = await axios.post('/categories', payload, { params })
    categoryItems.value = response.data.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const toggleCategory = (category) => {
  if (isSelected(category)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
  } else if (selectedCategories.value.length < 5) {
    selectedCategories.value.push(category)
  }
}

const isSelected = (category) => {
  return selectedCategories.value.includes(category)
}
const handleSubmit = async (event) => {
  event.preventDefault()

  const categoryIds = selectedCategories.value.map((category) => category.id)
  const payload = new FormData()
  payload.append('server_key', import.meta.env.VITE_SERVER_KEY)
  categoryIds.forEach((categoryId) => {
    payload.append('category_ids[]', categoryId)
  })

  const headers = { 'Content-Type': 'multipart/form-data' }

  const accessToken = localStorage.getItem('access_token')
  const params = { access_token: accessToken }

  try {
    const response = await axios.post(
      'https://preview.ummalife.com//api/set-user-interests',
      payload,
      {
        headers,
        params
      }
    )
    if (response.data.api_status === 200) {
      await router.push({ name: 'news' })
    } else {
      console.log(response.data)
    }
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

onMounted(() => {
  fetchCategories()
})

const isSubmitDisabled = computed(() => {
  return selectedCategories.value.length !== 5
})
</script>

<template>
  <FormAuth @submit="handleSubmit">
    <h3 class="form-title">{{ $t('login.interests_category.title') }}</h3>
    <p class="form-subtitle">{{ $t('login.interests_category.subtitle') }}</p>
    <span class="category-count">{{ selectedCategories.length }}/5</span>

    <div class="category-items__block">
      <ul class="category-list">
        <li
          class="category-list__item"
          v-for="(item, i) in categoryItems"
          :key="i"
          @click="toggleCategory(item)"
          :class="{ 'interest-selected': isSelected(item) }"
        >
          {{ item.description }}
        </li>
      </ul>
    </div>

    <div class="ready-button__block">
      <SampleButton
        type="submit"
        class="ready-button"
        :title="`${$t('buttons.ready')}`"
        :disabled="isSubmitDisabled"
        :class="{ 'disabled-button': isSubmitDisabled }"
      />
    </div>
  </FormAuth>
</template>

<style lang="scss" scoped>
.disabled-button {
  background-color: var(--color-silver-chalice);

  &:hover {
    background-color: var(--color-silver-chalice);
    cursor: not-allowed;
  }
}

.form-title {
  font-size: 28px;
  margin: 0 0 12px;
  font-weight: 500;
  line-height: normal;
}

.form-subtitle {
  font-size: 20px;
  line-height: 1.2;
  margin: 0 0 8px;
}

.ready-button__block {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.ready-button {
  display: flex;
  justify-content: center;
  width: 100%;
}

.category-count {
  font-size: 20px;
  color: var(--color-secondary);
  line-height: normal;
}

.category-items__block {
  margin-top: 32px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    border-radius: 8px;
    padding: 9px 16px;
    background-color: var(--color-seashell);
    font-size: 14px;
    cursor: pointer;
    line-height: normal;

    &:hover {
      transition: all 0.2s ease-in-out;
      background-color: var(--color-alto-first);
    }
  }
}

.interest-selected {
  background-color: var(--color-hippie-blue);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-deep-cerulean);
    color: var(--color-white);
    transition: all 0.2s ease-in-out;
  }
}

@media (max-width: 576px) {
  .category-items__block {
    margin-top: 24px;
  }

  .form-title {
    font-size: 22px;
  }

  .form-subtitle,
  .category-count {
    font-size: 16px;
  }

  .ready-button__block {
    margin-top: 40px;
  }
}
</style>
