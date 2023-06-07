<template>
  <main-navbar></main-navbar>

  <div class="main__container">
    <main-sidebar></main-sidebar>

    <main class="main-content">
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
  }
}
</script>

<style scoped>
.main__container {
  margin-top: 80px;
  display: flex;
}
</style>
