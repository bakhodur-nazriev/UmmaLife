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
import axios from 'axios'
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import MuviCard from '@/components/muvi/MuviCard.vue'
import GroupsSearch from '@/components/groups/ui/GroupsSearch.vue'
import MuviDetailSlider from '@/components/muvi/MuviDetailSlider.vue'
const muvies = ref([])
const activeIndex = ref(0)
const isDetailOpen = ref(false)
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

const handleSelect = (index) => {
  activeIndex.value = index
}

const fetchFeeds = async () => {
  const { data } = await axios.get('/json/muvi/reccomendations.json')
  muvies.value = data.data
}

fetchFeeds()
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
        color: var(--color-stable-white);
        opacity: 0.5;
      }
      &.active {
        background-color: var(--color-hippie-blue);
        color: var(--color-stable-white) !important;
      }
    }
  }
}
.light .muvi__popular--swiper {
  .swiper-slide {
    color: var(--color-mine-shaft);
  }
}
.dark .muvi__popular--swiper {
  .swiper-slide {
    color: var(--color-stable-white);
  }
}
</style>
