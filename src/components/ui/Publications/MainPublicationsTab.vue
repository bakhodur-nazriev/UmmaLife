<template>
  <div class="tabs">
    <div class="tabs-header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs-header__item', { 'active': activeTab === index }]"
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
        <PublicationTab v-if="index === 0" />
        <ArticleTab v-if="index === 1"/>
        <PhotoTab v-if="index === 2"/>
        <VideoTab v-if="index === 3"/>
        <AudioTab v-if="index === 4" />
      </div>
    </div>
  </div>
</template>

<script>
import PublicationTab from '@/components/ui/Publications/PublicationTab.vue'
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
import VideoTab from '@/components/ui/Publications/VideoTab.vue'
import AudioTab from '@/components/ui/Publications/AudioTab.vue'

export default {
  components: {
    PublicationTab,
    AudioTab,
    VideoTab,
    PhotoTab,
    ArticleTab
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

<style scoped lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: var(--color-white);
    border-radius: 15px;
    overflow: hidden;
    padding: 0 32px;

    &__item {
      display: flex;
      cursor: pointer;
      padding: 16px 0;
      color: var(--color-silver-chalice);
      font-weight: 500;
      font-size: 16px;

      &.active {
        position: relative;
        color: var(--color-mine-shaft);
        padding-bottom: 16px;
        font-weight: 600;
        z-index: 100;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: 0;
          left: 0;
          background-color: var(--color-deep-cerulean);
          border-radius: 2px 2px 0 0;
        }
      }
    }

    &__label-title {
     color: var(--color-silver-chalice);
      font-weight: 500;
    }
  }
}

@media (min-width: 768px) {}

@media (min-width: 1280px) {}
</style>
