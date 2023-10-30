<template>
  <main-navbar @toggle-sidebar="toggleSidebar"></main-navbar>

  <div class="main__container" id="page-container">
    <main-sidebar class="main__sidebar" :is-sidebar-collapsed="isSidebarCollapsed"></main-sidebar>

    <main class="main__content" :style="`margin-bottom: ${playerMargin}px`">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/layouts/MainNavbar.vue'
import MainSidebar from '@/components/layouts/MainSidebar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    MainSidebar,
    MainNavbar
  },
  data() {
    return {
      isSidebarCollapsed: false
    }
  },

  computed: {
    ...mapState(['playerMargin'])
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
  }
}
</script>

<style scoped>
.main__container {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px);
  overflow: hidden;
}

.main__content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  @media (min-width: 767px) {
    margin-left: 260px;
  }
}

@media (max-width: 767px) {
  .main__container {
    margin-top: 65px;
  }
}

@media (max-width: 576px) {
  .main__container {
    height: calc(100vh - 65px);
  }

  .main__content {
    margin-left: 0;
    &::-webkit-scrollbar {
      width: 2px;
    }
  }
}

@media (max-width: 767px) {
  .main__sidebar {
    display: none;
  }
}

@media (min-width: 1200px) {
  .main__sidebar {
    display: flex;
  }

  .main__container {
    margin-top: 80px;
  }
}
</style>
