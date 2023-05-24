<template>
  <LayoutAuth>
    <h1 class="auth-title">{{ $t('register.title') }}</h1>
    <form action="" class="register-form">
      <input
        type="text"
        class="input-primary email-input"
        :placeholder="$t('register.placeholders.email')"
      >

      <div class="checkbox-section">
        <input type="checkbox" class="terms-and-policy-checkbox">
        <label>
          {{ $t('register.agreement_to_creating_account') }}<br>
          <a href="" class="active-link">{{ $t('links.terms') }}</a> &
          <a href="" class="active-link">{{ $t('links.privacy_policy') }}</a>
        </label>
      </div>

      <button class="btn btn-primary submit-button">{{ $t('buttons.get_code_by_email') }}</button>
    </form>
    <div class="bottom-section">
      <label>{{ $t('register.label') }}</label>
      <router-link :to="{name: 'login'}">{{ $t('buttons.login') }}</router-link>
    </div>
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
  margin-bottom: 40px;
}

.submit-button {
  border-radius: 10px;
  width: 320px;
}

.email-input {
  margin-bottom: 24px;
}

.email-input {
  border-radius: 10px;
  height: 48px;
  padding: 14px;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.terms-and-policy-checkbox {
  appearance: none;
  background-color: #f1f1f1;
  height: 32px;
  width: 32px;
  border: none;
  outline: none;
}

.terms-and-policy-checkbox:checked {
  background: #49A399;
}

.checkbox-section {
  display: flex;
  align-items: ;
}
</style>
