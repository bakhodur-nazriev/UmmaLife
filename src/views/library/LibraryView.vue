<template>
  <main-layout>
    <div class="library">
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
import MainLayout from '@/components/layouts/MainLayout.vue'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import AllBooksTab from '@/components/library/tabs/AllBooksTab.vue'
import ReadingNowTab from '@/components/library/tabs/ReadingNowTab.vue'
import BookmarksTab from '@/components/library/tabs/BookmarksTab.vue'
import LikedBooksTab from '@/components/library/tabs/LikedBooksTab.vue'

const links = ref([
  {
    name: 'Все книги',
    isActive: true
  },
  {
    name: 'Читаю сейчас',
    isActive: false
  },
  {
    name: 'Закладки',
    isActive: false
  },
  {
    name: 'Нравится',
    isActive: false
  }
])

const clickNavHandler = (index) => {
  links.value.forEach((link) => (link.isActive = false))
  links.value[index].isActive = true
}
</script>

<style lang="scss" scoped>
.library {
  &__container {
    max-width: 1646px;
    width: 100%;
    padding: 0 16px;
    margin: 0 auto;
    height: 500px;
  }
}
</style>
