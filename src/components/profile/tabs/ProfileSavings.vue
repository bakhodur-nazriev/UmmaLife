<template>
  <div class="publications" :style="{ '--tabs-length': tabs.length }">
    <div class="publications__tabs">
      <div class="publications__tabs--header" v-if="store.state.isSavedTabsOpen">
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
import { ref, computed } from 'vue'
import PublishedNews from '@/components/profile/publications/PublishedNews.vue'
import PublishedArticles from '@/components/profile/publications/PublishedArticles.vue'
import PublishedPhotos from '@/components/profile/publications/PublishedPhotos.vue'
import PublishedVideos from '@/components/profile/publications/PublishedVideos.vue'
import PublishedAudios from '../publications/PublishedAudios.vue'
import { useStore } from 'vuex'
import { useWindowSize } from '@vueuse/core'

const screenWidth = computed(() => {
  const { width } = useWindowSize()
  return width.value
})

const store = useStore()
const activeIndex = ref(0)

const tabs = computed(() => [
  'tabs.profile_tabs.news',
  'tabs.profile_tabs.articles',
  'tabs.profile_tabs.photo',
  'tabs.profile_tabs.video',
  'tabs.profile_tabs.audio'
])

const clickHandler = (index) => {
  activeIndex.value = index
  if (screenWidth.value < 575) {
    store.commit('setIsSavedTabsOpen', false)
  }
}
</script>
