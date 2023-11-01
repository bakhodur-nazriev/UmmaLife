<template>
  <main-layout>
    <div class="library">
      <div class="muvi__mobile--nav white" v-if="width < 767">
        <div class="library__actions--btn" @click="$router.go(-1)">
          <ArrowLeftIcon />
        </div>
        <div class="muvi__mobile--nav-title">{{ $t('links.library') }}</div>
        <div class="library__actions">
          <div class="library__actions--btn" @click="handleSearchOpen">
            <SearchIcon />
          </div>
          <div class="library__actions--btn"><FilterCommentsIcon /></div>
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
      <groups-nav :links="links" className="muvi__nav" @clickNavHandler="clickNavHandler" />
      <div class="library__container">
        <AllBooksTab v-if="links[0].isActive" />
        <ReadingNowTab v-else-if="links[1].isActive" />
        <BookmarksTab v-else-if="links[2].isActive" />
        <LikedBooksTab v-else-if="links[3].isActive" />
      </div>
    </div>
  </main-layout>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'

import MainLayout from '@/components/layouts/MainLayout.vue'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import AllBooksTab from '@/components/library/tabs/AllBooksTab.vue'
import ReadingNowTab from '@/components/library/tabs/ReadingNowTab.vue'
import BookmarksTab from '@/components/library/tabs/BookmarksTab.vue'
import LikedBooksTab from '@/components/library/tabs/LikedBooksTab.vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import SearchIcon from '@/components/icons/settings/SearchIcon.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import FilterCommentsIcon from '@/components/icons/comment/FilterCommentsIcon.vue'

const { width } = useWindowSize()

const links = ref([
  {
    name: 'library.all_books',
    isActive: true
  },
  {
    name: 'library.read_now',
    isActive: false
  },
  {
    name: 'library.bookmarks',
    isActive: false
  },
  {
    name: 'library.liked_books',
    isActive: false
  }
])

const isSearchOpen = ref(false)

const clickNavHandler = (index) => {
  links.value.forEach((link) => (link.isActive = false))
  links.value[index].isActive = true
}

const handleSearchOpen = () => {
  isSearchOpen.value = true
}
const handleCloseSearch = () => {
  isSearchOpen.value = false
}
</script>

<style lang="scss">
.library {
  @media (max-width: 767px) {
    background-color: var(--color-white);
    padding-bottom: 52px;
  }
  &__container {
    max-width: 1646px;
    width: 100%;
    padding: 0 16px;
    margin: 0 auto;
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
    &--btn {
      width: 24px;
      height: 24px;
      color: var(--color-hippie-blue);
      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
