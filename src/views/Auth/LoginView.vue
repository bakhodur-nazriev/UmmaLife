<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('login.title') }}</title-sample>

      <sample-input
        type="email"
        class="email-input"
        :placeholder="$t('login.placeholders.email')"
      ></sample-input>
      <sample-input
        type="password"
        class="password-input"
        :placeholder="$t('login.placeholders.password')"
      ></sample-input>

      <router-link
        :to="{name: 'forgot-password'}"
        class="forgot-password-link link-primary"
      >
        {{ $t('login.forgot_password') }}
      </router-link>

      <div class="login-button-section">
        <sample-button>{{ $t('buttons.login') }}</sample-button>
      </div>

      <router-link
        class="link-primary create-account-link"
        :to="{name: 'register'}"
      >
        {{ $t('login.create_account') }}
      </router-link>
    </form-auth>
    <div class="login-with-phone-section">
      <router-link
        class="link-with-phone-number"
        :to="{name: 'register'}"
      >
        {{ $t('login.with_phone_number') }}
      </router-link>
    </div>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'

export default {
  components: {
    SampleInput,
    SampleButton,
    LayoutAuth,
    FormAuth,
    TitleSample
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
}

.email-input {
  margin-bottom: 24px;
}

.password-input {
  margin-bottom: 12px;
}

.link-with-phone-number {
  font-size: 16px;
  font-weight: 500;
  color: #1F1F1F;
  text-decoration: none;
}

.login-with-phone-section {
  margin-top: 32px;
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
