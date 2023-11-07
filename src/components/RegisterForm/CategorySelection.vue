<script setup>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import {ref} from 'vue'
import SampleButton from '@/components/ui/SampleButton.vue'

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
    <h3 class="form-login__interests-title">{{ $t('login.interests_category.title') }}</h3>
    <p class="form-subtitle">{{ $t('login.interests_category.subtitle') }}</p>
    <span class="category-count">{{ categoryCount }}/5</span>

    <div class="category-items__block">
      <ul class="category-list">
        <li class="category-list__item" v-for="(item, i) in categoryItems" :key="i">{{ item }}</li>
      </ul>
    </div>

    <div class="ready-button__block">
      <SampleButton class="ready-button" :title="`${ $t('buttons.ready') }`"></SampleButton>
    </div>
  </FormAuth>
</template>

<style lang="scss" scoped>
.form-login__interests-title {
  font-size: 28px;
  margin: 0 0 12px;
  font-weight: 500;
  line-height: normal;
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

.form-subtitle {
  font-size: 20px;
  line-height: 1.2;
  margin: 0 0 8px;
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
      transition: all 0.15s ease-in-out;
      background-color: var(--color-alto-first);
    }
  }
}

.interest-selected {
  background-color: var(--color-hippie-blue);
  color: var(--color-white);
}
</style>
