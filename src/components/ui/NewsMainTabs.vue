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

    <transition name="fade">
      <div class="tabs__content">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="activeTab === index"
        >
          <TabPublications v-if="index === 0" />
          <TabUmmaShorts v-if="index === 1" />
          <TabUmmaVideo v-if="index === 2" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TabUmmaVideo from '@/components/blocks/TabUmmaVideo.vue'
import TabPublications from '@/components/blocks/TabPublications.vue'
import TabUmmaShorts from '@/components/blocks/TabUmmaShorts.vue'
export default {
  components: {
    TabUmmaShorts,
    TabPublications,
    TabUmmaVideo
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
      categories: []
    }
  },
  methods: {
    changeTab (index) {
      this.activeTab = index
      sessionStorage.setItem('activeTab', index.toString())
    }
  },
  mounted () {
    const savedTab = sessionStorage.getItem('activeTab')

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
.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: var(--color-alto-second);
    position: absolute;
  }

  &-item {
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 16px 0;
    color: var(--color-silver-chalice);
    font-weight: 500;
    font-size: 18px;
    margin: 0 50px;
    width: 200px;

    &.active {
      position: relative;
      color: var(--color-mine-shaft);
      padding-bottom: 16px;
      font-weight: 600;
      z-index: 100;

      &::after {
        content: "";
        position: absolute;
        width: 200px;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: var(--color-deep-cerulean);
        border-radius: 1px 1px 0 0;
      }
    }
  }
}

.tabs__content {
  width: 100%;
  padding: 24px;
}

@media (min-width: 768px) {}

@media (min-width: 1280px) {}
</style>
