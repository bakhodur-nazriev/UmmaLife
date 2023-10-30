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

const books = ref(allBooks.slice(0, 2).map((book) => ({ ...book, isLiked: true })))
</script>
