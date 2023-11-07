<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="emit('backToMain')" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">Popular</div>
      <div class="settings__header--search" @click="handleSearchOpen">
        <SearchIcon />
      </div>
      <transition name="slide">
        <div
          v-if="isSearchOpen"
          class="settings__header--input"
          v-on-click-outside="handleCloseSearch"
        >
          <SearchInput :full="true" :placeholder="$t('placeholders.search_input')" />
        </div>
      </transition>
    </div>
    <div class="muvi__mobile--categories">
      <div
        class="muvi__mobile--categories--btn"
        v-for="(category, index) in categories"
        :key="category"
        :class="{ active: activeIndex === index }"
        @click="handleSelect(index)"
      >
        {{ $t(category) }}
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard v-for="card in muvies" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import { muvies } from '@/dummy'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'

const emit = defineEmits(['backToMain'])

const categories = ref([
  'settings.main.categories.religion',
  'settings.main.categories.psychology',
  'settings.main.categories.family',
  'settings.main.categories.work',
  'settings.main.categories.education',
  'settings.main.categories.travel',
  'settings.main.categories.books',
  'settings.main.categories.science',
  'settings.main.categories.sport',
  'settings.main.categories.art',
  'settings.main.categories.auto',
  'settings.main.categories.food',
  'settings.main.categories.positive',
  'settings.main.categories.fitness',
  'settings.main.categories.history',
  'settings.main.categories.fashion',
  'settings.main.categories.architecture',
  'settings.main.categories.beauty',
  'settings.main.categories.parenting',
  'settings.main.categories.nature'
])

const isSearchOpen = ref(false)
const activeIndex = ref(0)

const handleSelect = (index) => {
  activeIndex.value = index
}

const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}
</script>

<style lang="scss">
.muvi__mobile {
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
      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }
    }
  }
}
</style>
