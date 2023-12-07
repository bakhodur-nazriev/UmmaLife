<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="emit('backToMain')" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">Audio page</div>
      <div class="left"></div>
    </div>
    <div class="muvi__mobile--top white">
      <img
        class="muvi__mobile--top-img"
        src="@/assets/images/articles/articles_2.png"
        alt="articles_2"
      />
      <div class="muvi__mobile--top-info">
        <div class="muvi__mobile--top-title">Heart - Halal Nasheed</div>
        <div class="muvi__mobile--top-views">23,6 MUVI</div>
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard v-for="card in muvies" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import { muvies } from '@/dummy'

const emit = defineEmits(['backToMain'])
</script>
