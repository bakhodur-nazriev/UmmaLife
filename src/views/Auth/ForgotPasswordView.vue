<template>
  <FormAuth @submit="submit">
    <TitleSample>{{ $t('login.forgot_password') }}</TitleSample>

    <h5 class="text-1 roman reminder-message">{{ $t('login.messages.reset_password') }}</h5>

    <div :class="['input-wrapper', { error: hasError || isInvalidEmail }]">
      <input
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('login.placeholders.email')"
      />
      <small v-if="hasError || isInvalidEmail" class="error-message">
        {{
          $t(isInvalidEmail ? 'forgot_password.validation.incorrect_email' : 'forgot_password.validation.empty_email')
        }}
      </small>
    </div>

    <div class="login-button-section">
      <SampleButton @click="handleSubmit" :title="`${$t('buttons.submit')}`"/>
    </div>
  </FormAuth>

  <div class="link-register__block">
    <router-link
        :to="`/${$i18n.locale}/register`"
        class="link-register"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </div>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      email: '',
      hasError: false
    }
  },
  watch: {
    email(newEmail) {
      if (newEmail.trim() !== '') {
        this.hasError = false
      }
    }
  },
  computed: {
    isInvalidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  methods: {
    handleSubmit() {
      if (this.email.trim() === '' || this.isInvalidEmail) {
        this.hasError = true
      } else {
        // Perform form submission logic here
        // ...

        this.$emit('next-step')
      }
    },
    submit(event) {
      console.log('submit button called')
      event.preventDefault()
      this.handleSubmit()
    }
  }
}
</script>

<style scoped>
.link-register {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-mine-shaft);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.link-register__block {
  margin-top: 32px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.input-wrapper.error .base-input {
  border: 1.4px solid var(--color-valencia);
}

.input-wrapper .error-message {
  color: var(--color-valencia);
  font-size: 12px;
  margin-top: 4px;
}

.base-input {
  background-color: var(--color-seashell);
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: var(--color-mine-shaft);
  width: 100%;
}

.base-input::placeholder {
  color: var(--color-silver-chalice);
}

.reminder-message {
  margin-bottom: 12px;
  color: var(--color-mine-shaft);
  font-size: 20px;
  line-height: 1.5;
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
