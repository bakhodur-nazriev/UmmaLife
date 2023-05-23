<template>
  <LayoutAuth>
    <h1 class="auth-title">Регистрация</h1>
    <form action="">
      <button>Получить код на почту</button>
    </form>
  </LayoutAuth>
  <label>Есть аккаунт?</label>
  <router-link :to="{name: 'login'}">Вход</router-link>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'

export default {
  components: {
    LayoutAuth
  }
}
</script>
