<script setup>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import {ref} from 'vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const categoryItems = ref([
  'Религия',
  'Семья',
  'Здоровье',
  'Фитнес',
  'Книги',
  'Путешествия',
  'Авто',
  'Наука',
  'Природа',
  'Еда',
  'Мода',
  'Архитектура',
  'Красота',
  'Работа',
  'Учеба',
  'Искусство',
  'Спорт',
  'Позитив',
  'История',
  'Психология',
  'Воспитание'
])
const selectedCategories = ref([])

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
</script>

<template>
  <FormAuth>
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
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="ready-button__block">
      <SampleButton class="ready-button" :title="`${ $t('buttons.ready') }`"></SampleButton>
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
