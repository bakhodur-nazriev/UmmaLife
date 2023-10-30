<template>
  <li
    class="muvi__add--parent"
    @click="isDropdownOpen = !isDropdownOpen"
    v-on-click-outside="() => (isDropdownOpen = false)"
  >
    <div class="muvi__add--list">
      <p><ChooseCategoryIcon /> Choose a category</p>

      <ArrowDownIcon class="arrow" />
    </div>
    <ul v-if="selectedOptions.length > 0" class="muvi__add--selection">
      <li v-for="option in selectedOptions" :key="option.id" class="muvi__add--selection-li">
        {{ option.title }}
      </li>
    </ul>
    <div class="muvi__add--dropdown" v-if="isDropdownOpen" @click.stop>
      <div class="muvi__mobile--nav white">
        <button @click="isDropdownOpen = false" class="muvi__mobile--nav-btn">
          <ArrowLeftIcon />
        </button>
        <div class="muvi__mobile--nav-title">Choose a category</div>
        <div class="left"></div>
      </div>
      <div
        class="muvi__add--dropdown-list"
        v-for="(option, index) in options"
        :key="option.id"
        @click="handleSelect(index)"
      >
        <div class="muvi__add--dropdown-left">
          <img :src="option.img" :alt="option.title" />
          <span>{{ option.title }}</span>
        </div>
        <CustomRadio :is-selected="option.isSelected" />
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import ChooseCategoryIcon from '@/components/icons/shorts/ChooseCategoryIcon.vue'
import ArrowDownIcon from '@/components/icons/shorts/ArrowDownIcon.vue'
import CustomRadio from '@/components/ui/CustomRadio.vue'
import ArrowLeftIcon from '../../icons/shorts/ArrowLeftIcon.vue'

const isDropdownOpen = ref(false)

const options = ref([
  { id: 1, img: '/images/categories/religion.png', title: 'Religion', isSelected: false },
  { id: 2, img: '/images/categories/family.png', title: 'Family', isSelected: false },
  { id: 3, img: '/images/categories/health.png', title: 'Health', isSelected: false },
  { id: 4, img: '/images/categories/fitness.png', title: 'Fitness', isSelected: false },
  { id: 5, img: '/images/categories/books.png', title: 'Books', isSelected: false }
])

const selectedOptions = computed(() => {
  return options.value.filter((option) => option.isSelected)
})

const handleSelect = (index) => {
  options.value[index].isSelected = !options.value[index].isSelected
}
</script>

<style lang="scss" scoped>
.muvi__add {
  &--parent {
    width: 100%;
    position: relative;
    padding: 14px 20px 15px;
    border-radius: 12px;
    background-color: var(--color-seashell);
    .muvi__add--list {
      padding: 0;
      border-radius: 0;
      background: transparent;
    }
  }
  &--dropdown {
    position: absolute;
    top: calc(100% + 6px);
    background-color: var(--color-white);
    padding: 16px;
    z-index: 10;
    width: 100%;
    left: 0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 236px;
    overflow-y: auto;
    user-select: none;
    @media (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100dvh;
      padding: 0;
    }
    &-list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
    }
    &-left {
      display: flex;
      align-items: center;
      gap: 12px;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &--selection {
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    padding-left: 29px;
    margin-top: 9px;
    &-li {
      padding: 9px 12px;
      background-color: var(--color-hippie-blue);
      border-radius: 8px;
      color: var(--color-white);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: inline-block;
    }
  }
}
</style>
