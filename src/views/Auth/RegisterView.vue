<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('register.title') }}</title-sample>

      <sample-input
        typeof="email"
        :placeholder="$t('register.placeholders.email')"
      ></sample-input>

      <check-box class="register-checkbox" name="agreement">
        {{ $t('register.agreement_to_creating_account') }} <br>
        <router-link class="active-link" :to="`/${$i18n.locale}/terms`">{{ $t('links.terms') }}</router-link> &
        <router-link class="active-link" :to="`/${$i18n.locale}/privacy-policy`">{{ $t('links.privacy_policy') }}</router-link>
      </check-box>

      <div class="login-button-section">
        <sample-button>{{ $t('buttons.get_code_by_email') }}</sample-button>
      </div>

      <div class="login-section">
        <label class="medium">{{ $t('register.label') }}</label>
        <router-link
          class="medium"
          :to="`/${$i18n.locale}/login`"
        >{{ $t('login.title') }}</router-link>
      </div>
    </form-auth>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'
import CheckBox from '@/components/ui/CheckBox.vue'

export default {
  components: {
    SampleInput,
    SampleButton,
    TitleSample,
    LayoutAuth,
    FormAuth,
    CheckBox
  }
}
</script>

<style scoped>
.login-section {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-section > label, a {
  margin: 0 4px;
}

.login-section > label {
  color: #B0B0B0;
}

.register-checkbox {
  margin-top: 24px;
  margin-bottom: 64px;
  text-decoration: none;
}

.register-checkbox a {
  text-decoration: underline;
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
