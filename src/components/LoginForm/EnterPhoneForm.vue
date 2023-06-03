<template>
  <form-auth>
    <title-sample>{{ $t('login.title') }}</title-sample>
    <div class="sample__phone-input">
      <sample-phone-input></sample-phone-input>
    </div>
    <div class="login-button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.login') }}</sample-button>
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
import TitleSample from '@/components/ui/TitleSample.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import SamplePhoneInput from '@/components/ui/SamplePhoneInput.vue'

export default {
  components: {
    SamplePhoneInput,
    FormAuth,
    TitleSample,
    SampleButton
  },
  methods: {
    handleSubmit () {
      this.$emit('next-step')
    }
  }
}
</script>

<style scoped>
.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.sample__phone-input {
  margin-bottom: 64px;
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

.locales__icon {
  display: inline-block;
  min-width: max-content;
  color: #b0b0b0
}

.locales__icon--dropdown {
  margin-left: auto;
  transition: 0.3s;
}

.locales--shown .locales__icon--dropdown {
  transform: scaleY(-1);
}
</style>
