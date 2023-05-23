<template>
  <LayoutAuth>
    <h1 class="auth-title">{{ $t('login.title') }}</h1>
    <form action="" class="login-form">
      <input
        type="text"
        class="input-primary email-input"
        :placeholder="$t('login.placeholders.email')"
      >
      <input
        type="text"
        class="input-primary password-input"
        :placeholder="$t('login.placeholders.password')"
      >
      <router-link
        :to="{name: 'forgot-password'}"
        class="forgot-password-link primary"
      >{{ $t('login.forgot_password') }}
      </router-link>
      <button class="btn btn-primary submit-btn">{{ $t('buttons.login') }}</button>
    </form>
    <router-link :to="{name: 'register'}">{{ $t('login.create_account') }}</router-link>
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
.submit-btn {
  width: 320px;
  border-radius: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.email-input {
  margin-bottom: 24px;
}

.password-input {
  margin-bottom: 12px;
}

.email-input, .password-input {
  border-radius: 10px;
  height: 48px;
  padding: 14px;
}

.forgot-password-link {
  margin-bottom: 64px;
}
</style>
