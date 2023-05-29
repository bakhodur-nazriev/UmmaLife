<template>
  <form-auth>
    <title-sample>{{ $t('login.title') }}</title-sample>

    <sample-input
      type="email"
      class="email-input"
      :placeholder="$t('login.placeholders.email')"
    ></sample-input>
    <password-input
      class="password-input"
      :placeholder="$t('login.placeholders.password')"
    ></password-input>

    <router-link
      :to="`/${$i18n.locale}/forgot-password`"
      class="forgot-password-link active-link"
    >
      {{ $t('login.forgot_password') }}
    </router-link>

    <div class="login-button-section">
      <sample-button>{{ $t('buttons.login') }}</sample-button>
    </div>

    <router-link
      class="active-link create-account-link"
      :to="`/${$i18n.locale}/register`"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </form-auth>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'

export default {
  components: {
    TitleSample,
    FormAuth,
    PasswordInput,
    SampleInput,
    SampleButton
  }
}
</script>

<style scoped>
.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.forgot-password-link {
  margin-bottom: 64px;
  font-size: 14px;
  width: max-content;
}

.email-input {
  margin-bottom: 24px;
}

.password-input {
  margin-bottom: 12px;
}

.login-button-section {
  display: flex;
  justify-content: center;
}

.login-button-section button {
  width: 100%;
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>
