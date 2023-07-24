<template>
  <div class="tabs">
    <div class="tabs-header">
      <div class="tabs-header__label">
        <span class="tabs-header__label-title">{{ $t('tabs.publications_inside.publications') }}</span>
      </div>
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
        <ArticleContent v-if="index === 0"/>

        <PhotoContent v-if="index === 1"/>

        <VideoContent v-if="index === 2"/>

        <AudioContent v-if="index === 3" />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleContent from '@/components/ui/Publications/ArticleTabContent.vue'
import PhotoContent from '@/components/ui/Publications/PhotoTabContent.vue'
import VideoContent from '@/components/ui/Publications/VideoTabContent.vue'
import AudioContent from '@/components/ui/Publications/AudioTabContent.vue'

export default {
  components: {
    AudioContent,
    VideoContent,
    PhotoContent,
    ArticleContent
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
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-deep-cerulean);
          border-radius: 1px 1px 0 0;
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
