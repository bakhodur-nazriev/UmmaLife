<template>
  <div class="library__top__options">
    <div
      class="library__top__options--select"
      @click="isCategoryOpen = !isCategoryOpen"
      :class="{ active: isCategoryOpen }"
      v-on-click-outside="() => (isCategoryOpen = false)"
    >
      <span>{{ !selecttedCategory ? $t('library.category') : selecttedCategory }}</span>
      <ArrowDownIcon />

      <ul class="library__top__options--menu" v-if="isCategoryOpen">
        <li
          v-for="category in categories"
          :key="category.name"
          @mouseenter="width > 767 && (category.isSubOpen = true)"
          @mouseleave="width > 767 && (category.isSubOpen = false)"
        >
          <span
            @click.stop="category.isSubOpen = !category.isSubOpen"
            :class="{ open: category.isSubOpen }"
            >{{ category.name }} <ArrowDownIcon
          /></span>

          <ol
            class="library__top__options--menu"
            v-if="category.subcategories.length > 0 && category.isSubOpen"
          >
            <!-- -->
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
      class="library__top__options--select"
      @click="isYearOpen = !isYearOpen"
      :class="{ active: isYearOpen }"
      v-on-click-outside="() => (isYearOpen = false)"
    >
      <span>{{ !selectedYear ? $t('library.year') : selectedYear }}</span>
      <ArrowDownIcon />
      <ul class="library__top__options--menu library__top__options--years" v-if="isYearOpen">
        <li v-for="year in years" :key="year" @click.stop="handleSelectYear(year)">{{ year }}</li>
      </ul>
    </div>
    <div class="library__top__options--search">
      <GroupsSearch :placeholder="$t('library.search_placeholder')" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import { selectCategories } from '@/dummy.js'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
const selecttedCategory = ref('')
const selectedYear = ref(null)

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

const { width } = useWindowSize()
const handleToggle = (isOpen) => {
  if (width.value < 767) {
    console.log(isOpen)
  }
}
renderYears()
</script>

<style lang="scss" scoped>
.library__top__options {
  display: flex;
  gap: 16px;
  margin-top: 26px;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
  &--search {
    max-width: 521px;
    width: 100%;
    @media (max-width: 767px) {
      display: none;
    }
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
    background-color: var(--color-white);
    @media (max-width: 767px) {
      background-color: var(--color-seashell);
      padding: 13px 16px;
    }
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
    @media (max-width: 767px) {
      width: calc(100vw - 32px);
    }

    li {
      padding: 12px 24px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      white-space: nowrap;
      position: relative;
      @media (max-width: 767px) {
        white-space: unset;
      }
      &:hover {
        color: var(--color-hippie-blue);
      }
      span {
        svg {
          display: none;
        }
      }
      @media (max-width: 767px) {
        span {
          width: 100%;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;
          svg {
            display: block;
          }
          &.open {
            & > svg {
              rotate: 180deg;
            }
          }
        }
      }
    }
    ol {
      position: absolute;
      left: 100%;
      top: -12px;
      @media (max-width: 767px) {
        position: static;
        background-color: transparent;
        box-shadow: none;
        white-space: unset;
      }
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
