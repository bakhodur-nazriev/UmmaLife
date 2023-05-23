<template>
  <LayoutAuth>
    <h1 class="auth-title">{{ $t('register.title') }}</h1>
    <form action="" class="register-form">
      <input type="email" :placeholder="$t('register.placeholders.email')">
      <button class="btn btn-primary submit-button">{{ $t('buttons.get_code_by_email') }}</button>
    </form>
    <label>{{ $t('register.label') }}</label>
    <router-link :to="{name: 'login'}">{{ $t('buttons.login') }}</router-link>
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
.register-form {
  display: flex;
  flex-direction: column;
}

.submit-button {
  border-radius: 10px;
}
</style>
