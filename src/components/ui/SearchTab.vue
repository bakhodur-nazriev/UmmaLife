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
  },
  mounted() {
    const list = document.querySelector('.tabs')
    let isDragging = false
    let startX
    let scrollLeft

    list.addEventListener('mousedown', (e) => {
      isDragging = true
      startX = e.pageX - list.offsetLeft
      scrollLeft = list.scrollLeft
    })

    list.addEventListener('mouseleave', () => {
      isDragging = false
    })

    list.addEventListener('mouseup', () => {
      isDragging = false
    })

    list.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - list.offsetLeft
      const walk = (x - startX) * 2
      list.scrollLeft = scrollLeft - walk
    })
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-around;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 200px;

  &::-webkit-scrollbar {
    height: 0;
  }

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0;
    height: 1px;
    background-color: var(--color-seashell);
  }
}

.tab {
  padding: 10px;
  cursor: pointer;
  position: relative;
  color: var(--color-secondary);

  &-content {
    padding: 0 16px;
  }
}

.active {
  color: var(--color-mine-shaft);

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 3px;
    width: 100%;
    background-color: var(--color-hippie-blue);
    border-radius: 5px 5px 0 0;
    z-index: 500;
  }
}

@media (max-width: 576px) {
  .main-search__tab {
    background-color: var(--color-white);
    position: absolute;
    top: 65px;
    z-index: 500;
    width: 100%;
  }
}
</style>
