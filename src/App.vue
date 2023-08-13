<template>
  <!--  <layout-auth v-if="true"></layout-auth>-->
  <!--  <main-layout v-if="false"></main-layout>-->
  <router-view></router-view>
</template>

<script>
// import MainLayout from '@/components/layouts/MainLayout.vue'
// import LayoutAuth from '@/components/layouts/LayoutAuth.vue'

export default {
  components: {
    // LayoutAuth,
    // MainLayout
  },
  computed: {
    isAuthPage() {
      const authRoutes = ['login', 'register', 'forgot-password']
      return authRoutes.includes(this.$route.name)
    },
    authLayout() {
      return this.isAuthPage ? 'AuthLayout' : 'MainLayout'
    },
    mainLayout() {
      return 'MainLayout'
    }
  }
}
</script>

<style scoped>
@import 'assets/styles.scss';
</style>
