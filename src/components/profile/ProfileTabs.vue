<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tabs__header-item', { active: activeTab === index }]"
        @click="changeTab(index)"
      >
        {{ tab }}
      </div>
    </div>

    <div class="tabs__content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="tabs__content--inside--section"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['changeTab'],
  data: () => ({
    activeTab: 0
  }),
  methods: {
    changeTab(index) {
      this.activeTab = index
      this.$emit('changeTab', this.activeTab)
    }
  }
}
</script>

<style scoped lang="scss">
.tabs__content--inside--section {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
  width: 100%;
}

.tabs {
  display: flex;
  flex-direction: column;
}

.tabs__header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--color-white);
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  border-bottom: 1px solid var(--color-seashell);
  padding: 0 40px;
  gap: 40px;
}

.tabs__header-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 16px 0;
  color: var(--color-silver-chalice);
  font-weight: 500;
  font-size: 16px;
}

.tabs__header-item.active {
  position: relative;
  color: var(--color-mine-shaft);
  padding-bottom: 16px;
  font-weight: 600;
  z-index: 100;
}

.tabs__header-item.active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--color-deep-cerulean);
  border-radius: 1px 1px 0 0;
}
</style>
