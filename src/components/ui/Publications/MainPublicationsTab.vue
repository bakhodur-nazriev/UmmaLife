<template>
  <div class="tabs">
    <div class="tabs-bg" ref="publicationBackground"></div>
    <div class="tabs-header" ref="publicationTabsHeader">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs-header__item', { 'active': activeTab === index }]"
        @click="changeTab(index)"
      >
        <span class="tabs-header__title">{{ tab.title }}</span>
        <CheckMarkSmallIcon v-if="index === activeTab"/>
      </div>
    </div>

    <div
      class="tabs-content"
      v-for="(tab, i) in tabs"
      :key="i"
      v-show="activeTab === i"
    >
      <PublicationTab v-if="i === 0"/>
      <ArticleTab v-if="i === 1"/>
      <PhotoTab v-if="i === 2"/>
      <VideoTab v-if="i === 3"/>
      <AudioTab v-if="i === 4"/>
    </div>
  </div>
</template>

<script>
import PublicationTab from '@/components/ui/Publications/PublicationTab.vue'
import ArticleTab from '@/components/ui/Publications/ArticleTab.vue'
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
import VideoTab from '@/components/ui/Publications/VideoTab.vue'
import AudioTab from '@/components/ui/Publications/AudioTab.vue'
import CheckMarkSmallIcon from '@/components/icons/CheckMarkSmallIcon.vue'

export default {
  components: {
    CheckMarkSmallIcon,
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
  data() {
    return {
      activeTab: 0,
      tabs: [],
      tabIndex: 0,
      isMenuOpen: false
    }
  },
  methods: {
    changeTab(index) {
      this.$store.commit('setPublicationTabs', this.tabs[index].title)
      this.activeTab = index
      sessionStorage.setItem('activePublicationTab', index.toString())
    }
  },
  computed: {
    shouldChangeTabStyle() {
      return this.$store.getters.shouldChangeTabStyle
    }
  },
  watch: {
    shouldChangeTabStyle(newValue) {
      const tabsHeader = this.$refs.publicationTabsHeader
      const tabBackground = this.$refs.publicationBackground

      if (newValue) {
        tabsHeader.style.display = 'flex'
        tabBackground.style.display = 'flex'
      } else {
        tabsHeader.style.display = 'none'
        tabBackground.style.display = 'none'
      }
    }
  },
  mounted() {
    const savedTab = sessionStorage.getItem('activePublicationTab')
    if (savedTab) {
      this.activeTab = parseInt(savedTab)
    }
    this.tabs = this.tabsArray.map((title) => ({
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

    &__title {
      &:hover {
        color: var(--color-mine-shaft);
        transition: all .15s ease-in-out;
      }
    }

    &__item {
      display: flex;
      cursor: pointer;
      padding: 16px 0;
      color: var(--color-silver-chalice);
      font-weight: 500;
      font-size: 16px;
      user-select: none;

      &.active {
        position: relative;
        color: var(--color-mine-shaft);
        padding-bottom: 16px;
        font-weight: 600;
        z-index: 5;

        svg {
          display: none;
        }

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

  &-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 576px) {
  .tabs {
    position: relative;

    &-bg {
      display: none;
      content: "";
      background: rgba(0, 0, 0, .4);
      position: fixed;
      height: 100vh;
      width: 100%;
      pointer-events: none;
      z-index: 9;
    }

    &-header {
      display: none;
      z-index: 20;
      position: fixed;
      top: 124px;
      flex-direction: column;
      width: 100%;
      border-radius: 0;
      gap: 10px;
      padding: 20px 32px;

      &__title {
        font-weight: 400;
      }

      &__item {
        width: 100%;
        padding: 0;
        font-weight: 400;
        color: var(--color-mine-shaft);

        &.active {
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-hippie-blue);

          svg {
            display: block;
          }

          &::after {
            display: none;
          }
        }
      }
    }

    &-content {
      position: relative;
      top: 59px;
    }
  }
}

@media (min-width: 768px) {
}

@media (min-width: 1280px) {
}
</style>
