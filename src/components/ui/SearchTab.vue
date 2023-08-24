<template>
  <div class="main-search__tab">
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :class="{ 'tab': true, 'active': activeTab === index }"
        @click="changeTab(index)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <slot :name="tabs[activeTab].label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    changeTab(index) {
      this.activeTab = index
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-around;
}

.tab {
  padding: 10px;
  cursor: pointer;
  position: relative;
  color: var(--color-secondary);
}

.active {
  color: var(--color-mine-shaft);

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 2px;
    width: 100%;
    background-color: var(--color-hippie-blue);
    border-radius: 5px 5px 0 0;
    z-index: 500;
  }
}

.tab-content {
  margin-top: 10px;
  padding: 0 16px;
}

@media (max-width: 576px) {
  .main-search__tab {
    background-color: var(--color-white);
    position: absolute;
    top: 70px;
    z-index: 500;
    width: 100%;
  }
}
</style>
