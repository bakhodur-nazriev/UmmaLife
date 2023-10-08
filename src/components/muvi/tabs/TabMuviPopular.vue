<template>
  <div class="muvi__popular">
    <div class="muvi__popular--search">
      <GroupsSearch placeholder="Поиск MUVI" />
    </div>
    <swiper :slides-per-view="'auto'" :space-between="8" class="muvi__popular--swiper">
      <swiper-slide
        v-for="(category, index) in categories"
        :key="category"
        :class="{ active: activeIndex === index }"
        @click="handleSelect(index)"
      >
        <span>{{ $t(category) }}</span>
      </swiper-slide>
    </swiper>
    <div class="muvi__wrapper">
      <MuviCard
        v-for="muvi in muvies"
        :key="muvi.id"
        :muvi="muvi"
        @cardClickHandler="isDetailOpen = true"
      />
    </div>
  </div>
  <teleport to="body">
    <MuviDetailSlider v-if="isDetailOpen" @handleClickOutside="isDetailOpen = false" />
  </teleport>
</template>
<script setup>
/* eslint-disable */
import { computed, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { muvies as allMuvies } from '@/dummy.js'
import MuviCard from '@/components/muvi/MuviCard.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
const muvies = computed(() => allMuvies)
const activeIndex = ref(0)
const isDetailOpen = ref(false)
const categories = ref([
  'settings.main.categories.religion',
  'settings.main.categories.psixologiya',
  'settings.main.categories.familiy',
  'settings.main.categories.work',
  'settings.main.categories.education',
  'settings.main.categories.travel',
  'settings.main.categories.books',
  'settings.main.categories.sience',
  'settings.main.categories.sport',
  'settings.main.categories.art',
  'settings.main.categories.auto',
  'settings.main.categories.food',
  'settings.main.categories.positive',
  'settings.main.categories.fitness',
  'settings.main.categories.history',
  'settings.main.categories.fashion',
  'settings.main.categories.architectory',
  'settings.main.categories.beauty',
  'settings.main.categories.parenting',
  'settings.main.categories.nature'
])

const handleSelect = (index) => {
  activeIndex.value = index
}
</script>

<style lang="scss" scoped>
.muvi__popular {
  &--search {
    max-width: 716px;
    width: 100%;
    margin-bottom: 28px;
  }
  &--swiper {
    margin-bottom: 28px;
    .swiper-slide {
      padding: 16px 32px;
      background-color: var(--color-white);
      border-radius: 10px;
      cursor: pointer;
      width: fit-content;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      user-select: none;
      &:not(.active):hover {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
        opacity: 0.5;
      }
      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }
    }
  }
}
</style>
