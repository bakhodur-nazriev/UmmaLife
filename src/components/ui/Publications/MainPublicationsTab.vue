<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs__header--item', { 'active': activeTab === index }]"
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
      >
        <publications-content
          class="tab__publication"
          v-if="index === 0"
        />
        <article-content
          :is-menu-open="isMenuOpen"
          v-if="index === 1"
          class="tab__article"
        />
        <photo-content v-if="index === 2"/>
        <video-content
          v-if="index === 3"
          class="tab__video"
        />
        <audio-content v-if="index === 4" />
      </div>
    </div>
  </div>
</template>

<script>

import PublicationsContent from '@/components/ui/Publications/PublicationsTabContent.vue'
import ArticleContent from '@/components/ui/Publications/ArticleTabContent.vue'
import PhotoContent from '@/components/ui/Publications/PhotoTabContent.vue'
import VideoContent from '@/components/ui/Publications/VideoTabContent.vue'
import AudioContent from '@/components/ui/Publications/AudioTabContent.vue'

export default {
  components: {
    AudioContent,
    VideoContent,
    PhotoContent,
    ArticleContent,
    PublicationsContent
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
      tabs: [],
      tabIndex: 0,
      isMenuOpen: false
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
.tab__publication {
  display: flex;
  flex-direction: column;
  width: 100%;
}

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
  background-color: var(--color-white);
  border-radius: 15px;
  overflow: hidden;
}

.tabs__header--item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-silver-chalice);
  font-weight: 500;
  font-size: 16px;
  width: 185px;
}

.tabs__header--item.active {
  position: relative;
  color: var(--color-mine-shaft);
  padding-bottom: 16px;
  font-weight: 600;
  z-index: 100;
}

.tabs__header--item.active::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-deep-cerulean);
  border-radius: 1px 1px 0 0;
}

@media (min-width: 768px) {
  /*.tabs__content {
    width: 100%;
  }*/
}

@media (min-width: 1280px) {
  /*.tabs__content {
    width: 100%;
    display: flex;
  }*/
}
</style>
