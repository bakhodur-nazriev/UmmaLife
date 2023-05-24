<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('login.forgot_password') }}</title-sample>

      <sample-input typpe="email" :placeholder="$t('login.placeholders.email')"></sample-input>

      <sample-button type="submit">{{ $t('buttons.get_code_by_email') }}</sample-button>

      <div class="login-section">
        <label>{{ $t('register.label') }}</label>
        <router-link :to="{name: 'login'}">{{ $t('buttons.login') }}</router-link>
      </div>
    </form-auth>
  </LayoutAuth>
</template>

<script setup>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleInput from '@/components/ui/SampleInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

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
</style>
