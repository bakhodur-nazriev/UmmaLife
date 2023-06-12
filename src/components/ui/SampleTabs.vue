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
        <tab-publications v-if="index === 0"></tab-publications>
        <tab-umma-shorts v-if="index === 1"></tab-umma-shorts>
        <tab-umma-video v-if="index === 2"></tab-umma-video>
      </div>
    </div>
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

<style scoped>
.tabs {}

.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.tabs__header::after {
  content: "";
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: var(--color-gray-2);
  position: absolute;
}

.tabs__header-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-text);
  font-weight: 500;
  font-size: 18px;
  margin: 0 50px;
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
  width: 200px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-link);
  border-radius: 1px 1px 0 0;
}

.tabs__content {
  display: flex;
  justify-content: center;
  min-width: -webkit-fill-available;
}

@media (min-width: 768px) {
  .tabs__content {
    padding: 16px 24px;
  }
}

@media (min-width: 1280px) {
  .tabs__content {
    display: flex;
    padding: 16px 88px;
  }
}
</style>
