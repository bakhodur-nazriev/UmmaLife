<script setup>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import { ref } from 'vue'

const categoryCount = ref(0)
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
</script>

<template>
  <FormAuth>
    <TitleSample>{{ $t('login.interests_category.title') }}</TitleSample>
    <p class="form-subtitle">{{ $t('login.interests_category.subtitle') }}</p>
    <span class="category-count">{{ categoryCount }}/5</span>

    <div class="category-items__block">
      <ul class="category-list">
        <li class="category-list__item" v-for="(item, i) in categoryItems" :key="i">{{ item }}</li>
      </ul>
    </div>
  </FormAuth>
</template>

<style lang="scss" scoped>
.form-subtitle {
  margin: 0;
}

.category-count {
  font-size: 20px;
  color: var(--color-secondary);
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
  }
}
</style>
