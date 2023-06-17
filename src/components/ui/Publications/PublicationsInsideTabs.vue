<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs__header-item', { 'active': activeTab === index }]"
        @click="changeTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tabs__content--inside--section"
      >
        <publications-tab v-if="index === 0"></publications-tab>
        <article-tab v-if="index === 1"></article-tab>
        <photo-tab v-if="index === 2"></photo-tab>
        <video-tab v-if="index === 3"></video-tab>
        <audio-tab v-if="index === 4"></audio-tab>
      </div>
    </div>
  </div>
</template>

<script>

import PublicationsTab from '@/components/ui/Publications/PublicationsTab.vue'
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
import VideoTab from '@/components/ui/Publications/VideoTab.vue'
import AudioTab from '@/components/ui/Publications/AudioTab.vue'

export default {
  components: {
    AudioTab,
    VideoTab,
    PhotoTab,
    ArticleTab,
    PublicationsTab
  },
  props: {
    tabsArray: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeTab: 0,
      tabs: []
    }
  },
  methods: {
    changeTab (index) {
      this.activeTab = index
      sessionStorage.setItem('activePublicationTab', index.toString())
    }
  },
  mounted () {
    const savedTab = sessionStorage.getItem('activePublicationTab')

    if (savedTab) {
      this.activeTab = parseInt(savedTab)
    }

    this.tabs = this.tabsArray.map((title, index) => ({
      title
    }))
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--color-background);
  border-radius: 15px;
  overflow: hidden;
}

.tabs__header-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-text);
  font-weight: 500;
  font-size: 16px;
  width: 200px;
}

.tabs__header-item.active {
  position: relative;
  color: var(--color-primary);
  padding-bottom: 16px;
  font-weight: 600;
  z-index: 100;
}

.tabs__header-item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-link);
  border-radius: 1px 1px 0 0;
}

.tabs__content {
  display: flex;
  justify-content: center;
  background-color: var(--color-background);
  border-radius: 15px;
}

@media (min-width: 768px) {
  .tabs__content {
    width: 100%;
    padding: 16px;
  }
}

@media (min-width: 1280px) {
  .tabs__content {
    width: 100%;
    display: flex;
    padding: 16px;
  }
}
</style>
