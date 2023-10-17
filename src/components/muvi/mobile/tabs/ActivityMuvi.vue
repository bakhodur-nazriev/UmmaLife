<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="emit('backToMain')" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">Activity</div>
      <div class="left"></div>
    </div>
    <div class="muvi__mobile--tabs">
      <div
        class="muvi__mobile--tabs--list"
        v-for="(tab, index) in tabs"
        :key="tab"
        @click="handleTabClick(index)"
        :class="{ active: activeIndex === index }"
      >
        <span>{{ tab }}</span>
      </div>
    </div>
    <div class="muvi__mobile--wrapper" v-if="activeIndex === 0">
      <MuviCard v-for="card in likedMovies" :key="card.id" :card="card" />
    </div>
    <div class="muvi__mobile--wrapper" v-if="activeIndex === 1">
      <MuviCard v-for="card in viewedMovies" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, computed } from 'vue'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import { muvies as allMuvies } from '@/dummy'

const likedMovies = computed(() => allMuvies.slice(0, 6))
const viewedMovies = computed(() => allMuvies.slice(6, 12))
const activeIndex = ref(0)
const tabs = ref(['Liked', 'Viewed'])

const emit = defineEmits(['backToMain'])

const handleTabClick = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss">
.muvi__mobile {
  &--tabs {
    position: sticky;
    top: 63px;
    left: 0;
    width: 100%;
    padding: 20px 16px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-bottom: 1px solid var(--color-seashell);
    background-color: var(--color-white);
    z-index: 20;
    &--list {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: var(--color-secondary);
        padding-bottom: 7px;
        border-bottom: 2px solid transparent;
      }
      &.active {
        span {
          border-color: var(--color-hippie-blue);
          color: var(--color-mine-shaft);
        }
      }
    }
  }
}
</style>
