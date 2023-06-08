<template>
  <main-navbar @toggle-sidebar="toggleSidebar"></main-navbar>

  <div class="main__container">
    <main-sidebar :is-sidebar-collapsed="isSidebarCollapsed"></main-sidebar>

    <main class="main__content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/layouts/MainNavbar.vue'
import MainSidebar from '@/components/layouts/MainSidebar.vue'

export default {
  components: {
    MainSidebar,
    MainNavbar
  },
  data () {
    return {
      isSidebarCollapsed: false
    }
  },
  methods: {
    toggleSidebar () {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
  }
}
</script>

<style scoped>
.main__container {
  margin-top: 80px; /* Добавьте верхний отступ */
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px); /* Учитывайте высоту navbar */
  overflow: hidden;
}

.main__content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
