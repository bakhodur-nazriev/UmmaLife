<template>
  <LayoutAuth>
    <form action="">
      <input type="text">
      <input type="text">
      <button>Войти</button>
    </form>
    <router-link :to="{name: 'register'}">Создать аккаунт</router-link>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'

export default {
  components: {
    LayoutAuth
  }
}
</script>

<style scoped>

</style>
