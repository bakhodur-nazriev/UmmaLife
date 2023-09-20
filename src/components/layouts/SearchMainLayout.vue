<template>
  <main class="search-container">
    <slot></slot>

    <SearchNavbar :is-sidebar-active="isSidebarActive" class="search-navbar"></SearchNavbar>
  </main>
</template>
<script>
import SearchNavbar from '@/components/layouts/SearchComponents/SearchNavbar.vue'

export default {
  components: {
    SearchNavbar
  },
  data() {
    return {
      isSidebarActive: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive
    }
  }
}
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 24px 24px 24px 200px;
}

.search-navbar {
  z-index: 101;
  height: 100%;
  max-width: 300px;
}

@media (min-width: 1920px) {
  .search-container {
    display: flex;
    padding: 24px;
    gap: 20px;
    justify-content: space-between;
    padding: 24px 24px 24px 200px;
  }
}
</style>
