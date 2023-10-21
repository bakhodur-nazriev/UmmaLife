<template>
  <div class="library__options">
    <div
      class="library__options--select"
      @click="isCategoryOpen = !isCategoryOpen"
      :class="{ active: isCategoryOpen }"
      v-on-click-outside="() => (isCategoryOpen = false)"
    >
      <span>{{ selecttedCategory }}</span>
      <ArrowDownIcon />

      <ul class="library__options--menu" v-if="isCategoryOpen">
        <li
          v-for="category in categories"
          :key="category.name"
          @mouseenter="category.isSubOpen = true"
          @mouseleave="category.isSubOpen = false"
          @click.stop="handleSelectCategory(category.name), (category.isSubOpen = false)"
        >
          <span>{{ category.name }}</span>
          <ol
            v-if="category.subcategories.length > 0 && category.isSubOpen"
            class="library__options--menu"
          >
            <li
              v-for="sub in category.subcategories"
              :key="sub.name"
              @click.stop="handleSelectCategory(sub.name), (category.isSubOpen = false)"
            >
              {{ sub.name }}
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div
      class="library__options--select"
      @click="isYearOpen = !isYearOpen"
      :class="{ active: isYearOpen }"
      v-on-click-outside="() => (isYearOpen = false)"
    >
      <span>{{ selectedYear }}</span>
      <ArrowDownIcon />
      <ul class="library__options--menu library__options--years" v-if="isYearOpen">
        <li v-for="year in years" :key="year" @click.stop="handleSelectYear(year)">{{ year }}</li>
      </ul>
    </div>
    <div class="library__options--search">
      <GroupsSearch placeholder="Поиск по названию книги" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { selectCategories } from '@/dummy.js'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
const selecttedCategory = ref('Категория')
const selectedYear = ref('Год')

const isCategoryOpen = ref(false)
const isYearOpen = ref(false)

const years = ref([])

const renderYears = () => {
  for (let i = 1800; i <= new Date().getFullYear(); i++) {
    years.value.unshift(i)
  }
}

const categories = ref(selectCategories)

const handleSelectCategory = (name) => {
  selecttedCategory.value = name
  isCategoryOpen.value = false
}
const handleSelectYear = (year) => {
  selectedYear.value = year
  isYearOpen.value = false
}

renderYears()
</script>

<style lang="scss" scoped>
.library__options {
  display: flex;
  gap: 16px;
  margin-top: 26px;
  &--search {
    max-width: 521px;
    width: 100%;
  }
  &--select {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-white);
    border-radius: 12px;
    padding: 16px 24px;
    cursor: pointer;
    user-select: none;
    & > span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    & > svg {
      width: 20px;
      height: 20px;
      display: block;
    }
    &.active {
      & > svg {
        rotate: 180deg;
      }
    }
  }
  &--menu {
    position: absolute;
    z-index: 20;
    left: 0;
    top: calc(100% + 10px);
    background-color: var(--color-white);
    border-radius: 10px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    padding: 12px 0;
    list-style: none;
    margin: 0;

    li {
      padding: 12px 24px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      white-space: nowrap;
      position: relative;
      &:hover {
        color: var(--color-hippie-blue);
      }
    }
    ol {
      position: absolute;
      left: 100%;
      top: -12px;
    }
  }
  &--years {
    width: 100%;
    max-height: 264px;
    overflow-y: auto;
    li {
      text-align: center;
    }
  }
}
</style>
