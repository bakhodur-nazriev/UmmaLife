<template>
  <div class="publications" :style="{ '--tabs-length': tabs.length }">
    <div class="publications__tabs">
      <div class="publications__tabs--header">
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

<script>
import PublishedNews from '@/components/profile/publications/PublishedNews.vue'
import PublishedArticles from '@/components/profile/publications/PublishedArticles.vue'
import PublishedPhotos from '@/components/profile/publications/PublishedPhotos.vue'
import PublishedVideos from '@/components/profile/publications/PublishedVideos.vue'
import PublishedAudios from '../publications/PublishedAudios.vue'

export default {
  components: {
    PublishedNews,
    PublishedArticles,
    PublishedPhotos,
    PublishedVideos,
    PublishedAudios
  },
  data: () => ({
    activeIndex: 0
  }),
  computed: {
    tabs: () => [
      'tabs.profile_tabs.news',
      'tabs.profile_tabs.articles',
      'tabs.profile_tabs.photo',
      'tabs.profile_tabs.video',
      'tabs.profile_tabs.audio'
    ]
  },
  methods: {
    clickHandler(index) {
      this.activeIndex = index
    }
  }
}
</script>
