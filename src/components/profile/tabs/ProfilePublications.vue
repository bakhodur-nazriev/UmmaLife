<template>
  <div
    class="publications"
    :style="{ '--tabs-length': tabs.length }"
    :class="{ mobile: screenWidth < 575 }"
  >
    <div class="publications__tabs">
      <div class="publications__tabs--header" v-if="store.state.isProfileTabsOpen">
        <div
          class="publications__tabs--button"
          v-for="(tab, index) in tabs"
          :key="`tab_${index + 1}`"
          :class="{ active: activeIndex === index }"
          @click="clickHandler(index)"
        >
          {{ $t(tab) }}
        </div>
      </div>

      <div class="publications__tabs--content">
        <PublishedNews v-if="activeIndex === 0" />
        <PublishedArticles v-else-if="activeIndex === 1" />
        <PublishedPhotos v-else-if="activeIndex === 2" />
        <PublishedVideos v-else-if="activeIndex === 3" />
        <PublishedAudios v-else-if="activeIndex === 4" />
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import PublishedNews from '@/components/profile/publications/PublishedNews.vue'
import PublishedArticles from '@/components/profile/publications/PublishedArticles.vue'
import PublishedPhotos from '@/components/profile/publications/PublishedPhotos.vue'
import PublishedVideos from '@/components/profile/publications/PublishedVideos.vue'
import PublishedAudios from '../publications/PublishedAudios.vue'
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useStore } from 'vuex'
const { width: screenWidth } = useWindowSize()

const activeIndex = ref(0)

const store = useStore()

const tabs = computed(() => {
  return [
    'tabs.profile_tabs.news',
    'tabs.profile_tabs.articles',
    'tabs.profile_tabs.photo',
    'tabs.profile_tabs.video',
    'tabs.profile_tabs.audio'
  ]
})

const clickHandler = (index) => {
  activeIndex.value = index

  if (screenWidth.value < 575) {
    store.commit('setIsProfileTabsOpen', false)
  }
}
</script>

<style lang="scss">
.publications {
  &__tabs {
    &--header {
      display: grid;
      grid-template-columns: repeat(var(--tabs-length), 1fr);
      gap: 8px;
      padding: 16px 24px 24px;
      background: var(--color-white);
      border-radius: 0 0 15px 15px;
      @media (max-width: 575px) {
        position: absolute;
        top: 56px;
        left: 0;
        width: 100%;
        height: auto;
        z-index: 15;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px 32px;
      }
    }
    &--button {
      padding: 16px 10px;
      border-radius: 12px;
      border: 1px solid var(--color-gallery-first);
      cursor: pointer;
      text-align: center;
      color: var(--color-silver-chalice);
      background: var(--color-white);
      font-size: 16px;
      font-weight: 400;
      &.active {
        background-color: var(--color-seashell);
        color: var(--color-mine-shaft);
      }
      @media (max-width: 575px) {
        padding: 0;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        color: var(--color-mine-shaft);

        &.active {
          color: var(--color-hippie-blue);
          background: transparent;
          &::after {
            content: url("data:image/svg+xml,%3Csvg width='14' height='12' viewBox='0 0 22 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.87444 15C7.43422 15 7.01601 14.8326 6.70785 14.5396L0.478739 8.61702C-0.15958 8.01011 -0.15958 7.00558 0.478739 6.39867C1.11706 5.79177 2.17359 5.79177 2.81191 6.39867L7.87444 11.2121L19.1881 0.45518C19.8264 -0.151727 20.8829 -0.151727 21.5213 0.45518C22.1596 1.06209 22.1596 2.06662 21.5213 2.67353L9.04102 14.5396C8.73287 14.8326 8.31466 15 7.87444 15Z' fill='%2349a399'/%3E%3C/svg%3E");
            display: block;
            color: var(--color-hippie-blue);
          }
        }
      }
    }
  }
}
</style>
