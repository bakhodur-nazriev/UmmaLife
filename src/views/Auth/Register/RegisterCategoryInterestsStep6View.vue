<script setup>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import {ref, onMounted} from 'vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import axios from 'axios'
import {getFormData} from '@/utils'
import * as events from "events";
import router from "@/router";

const categoryItems = ref([])
const selectedCategories = ref([])
const fetchCategories = async () => {
  const payload = getFormData({
    server_key: process.env.VUE_APP_SERVER_KEY,
    page: ''
  })

  const accessToken = localStorage.getItem('access_token')
  const params = {access_token: accessToken}

  try {
    const response = await axios.post('https://ummalife.com/api/categories', payload, {params})
    categoryItems.value = response.data.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
};

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
const handleSubmit = async () => {
  event.preventDefault()

  const categoryIds = selectedCategories.value.map(category => category.id);
  const payload = new FormData()
  payload.append('server_key', process.env.VUE_APP_SERVER_KEY)
  categoryIds.forEach(categoryId => {
    payload.append('category_ids[]', categoryId);
  });

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data'
  }

  const accessToken = localStorage.getItem('access_token')
  const params = {access_token: accessToken}

  try {
    const response = await axios.post('https://ummalife.com//api/set-user-interests', payload, {headers, params})
    if (response.data.api_status === 200) {
      await router.push({name: 'LoginByEmailView'})
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
          :title="`${ $t('buttons.ready') }`"

      ></SampleButton>
    </div>
  </FormAuth>
</template>

<style lang="scss" scoped>
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
