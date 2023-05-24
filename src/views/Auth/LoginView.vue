<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('login.title') }}</title-sample>

      <input placeholder="text">
    </form-auth>
<!--    <form class="login-form">-->
<!--      <h1 class="auth-title">{{ $t('login.title') }}</h1>-->
<!--      <input-->
<!--        type="email"-->
<!--        class="input-primary email-input"-->
<!--        :placeholder="$t('login.placeholders.email')"-->
<!--      >-->
<!--      <input-->
<!--        type="password"-->
<!--        class="input-primary password-input"-->
<!--        :placeholder="$t('login.placeholders.password')"-->
<!--      >-->
<!--      <router-link-->
<!--        :to="{name: 'forgot-password'}"-->
<!--        class="forgot-password-link active-link"-->
<!--      >-->
<!--        {{ $t('login.forgot_password') }}-->
<!--      </router-link>-->
<!--      <button class="btn btn-primary submit-btn">{{ $t('buttons.login') }}</button>-->
<!--      <router-link :to="{name: 'register'}">{{ $t('login.create_account') }}</router-link>-->
<!--    </form>-->
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'

export default {
  components: {
    LayoutAuth,
    FormAuth,
    TitleSample
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
  align-self: center;
  background-color: white;
  border-radius: 20px;
  padding: 24px 32px;
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
