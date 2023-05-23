<template>
  <LayoutAuth>
    <h1 class="auth-title">{{ $t('login.forgot_password') }}</h1>
    <form action="">
      <input type="text" class="">
      <button type="submit" class="btn btn-primary submit-btn">{{ $t('buttons.get_code_by_email') }}</button>
    </form>
    <label>{{ $t('register.label') }}</label>
    <router-link :to="{name: 'login'}">{{ $t('buttons.login') }}</router-link>
  </LayoutAuth>
</template>

<script setup>

import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
</script>

<style scoped>
.submit-btn {
  border-radius: 10px;
}
</style>
