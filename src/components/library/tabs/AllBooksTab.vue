<template>
  <div class="library__tab">
    <LibraryTopOptions />
    <div class="library__tab--wrapper">
      <LibraryCard
        v-for="book in books"
        :book="book"
        :key="book.id"
        @likeHandler="(isLiked) => (book.isLiked = isLiked)"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import LibraryCard from '@/components/library/LibraryCard.vue'
import { books as allBooks } from '@/dummy.js'
import LibraryTopOptions from '@/components/library/LibraryTopOptions.vue'

const books = ref(allBooks)
</script>

<style lang="scss">
.library__tab {
  &--wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 22px 0;
  }
}
</style>
