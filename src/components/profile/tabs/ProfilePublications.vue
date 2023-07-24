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
        <PublishedArticles v-if="activeIndex === 1" />
        <!-- TODO -->
        <p v-if="activeIndex === 2">Photo</p>
        <p v-if="activeIndex === 3">Video</p>
        <p v-if="activeIndex === 4">Audio</p>
      </div>
    </div>
  </div>
</template>

<script>
import PublishedNews from '@/components/profile/publications/PublishedNews.vue'
import PublishedArticles from '@/components/profile/publications/PublishedArticles.vue'
export default {
  components: { PublishedNews, PublishedArticles },
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
    clickHandler (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.publications {
  background: var(--color-white);
  &__tabs {
    padding: 16px 8px 8px;
    &--header {
      display: grid;
      grid-template-columns: repeat(var(--tabs-length), 1fr);
      gap: 4px;
    }
    &--button {
      padding: 21px 20px 17px;
      border-radius: 12px;
      border: 1px solid var(--color-seashell);
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
    }
  }
}
</style>
