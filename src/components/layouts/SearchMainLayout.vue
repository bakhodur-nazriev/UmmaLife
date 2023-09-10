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
  padding: 24px 24px 24px 220px;
}

.search-navbar {
  position: fixed;
  right: 20px;
}

@media (min-width: 1920px) {
  .search-container {
    justify-content: center;
    padding: 24px;
  }
}
</style>
