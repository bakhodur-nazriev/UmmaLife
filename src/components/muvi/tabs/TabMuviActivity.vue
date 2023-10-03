<template>
  <div class="muvi__activity">
    <div class="muvi__activity--tab">
      <div
        class="muvi__activity--btn"
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="{ active: activeIndex === index }"
        @click="handleTabClick(index)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="muvi__wrapper" v-if="activeIndex === 0">
      <MuviCard v-for="muvi in likedMovies" :key="muvi.id" :muvi="muvi" />
    </div>
    <div class="muvi__wrapper" v-else-if="activeIndex === 1">
      <MuviCard v-for="muvi in viewedMovies" :key="muvi.id" :muvi="muvi" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { computed, ref } from 'vue'
import { muvies as allMuvies } from '@/dummy.js'
import MuviCard from '@/components/muvi/MuviCard.vue'
const likedMovies = computed(() => allMuvies.slice(0, 6))
const viewedMovies = computed(() => allMuvies.slice(6, 12))
const activeIndex = ref(0)
const tabs = ref(['Liked', 'Viewed'])

const handleTabClick = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss">
.muvi__activity {
  &--tab {
    background-color: var(--color-white);
    width: fit-content;
    margin: 0 auto 28px;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 16px;
  }
  &--btn {
    padding: 16px;
    min-width: 242px;
    border-radius: 12px;
    background-color: var(--color-white);
    color: var(--color-secondary);
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      background-color: var(--color-seashell);
      color: var(--color-mine-shaft);
    }
  }
}
</style>
