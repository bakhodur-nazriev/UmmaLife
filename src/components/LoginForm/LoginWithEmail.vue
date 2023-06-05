<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('login.title') }}</title-sample>

    <div class="main__input-email-block">
      <div :class="['input-wrapper', { error: hasError.email || isInvalidEmail }]">
        <input
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('login.placeholders.email')"
        />
        <small v-if="hasError.email || isInvalidEmail" class="error-message">
          {{ $t(isInvalidEmail ? 'login.validation.incorrect_email' : 'login.validation.empty_email') }}
        </small>
      </div>
    </div>

    <div class="main__input-password-block">
      <div class="input-with-eye" :class="['input-wrapper', { error: hasError.password }]">
        <input
          name="password"
          v-model="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          class="base-input"
          :class="{'input-field': true, 'error': passwordError}"
          :placeholder="$t('login.placeholders.password')"
        />

        <button type="button" class="eye-button" @click="togglePasswordVisibility">
          <eye-slash-icon v-if="isPasswordVisible"></eye-slash-icon>
          <eye-icon v-else></eye-icon>
        </button>
      </div>
      <small v-if="hasError.password" class="error-message">
        {{ $t('register.validation.empty_password') }}
      </small>
    </div>

    <router-link
      :to="`/${$i18n.locale}/forgot-password`"
      class="forgot-password-link active-link"
    >
      {{ $t('login.forgot_password') }}
    </router-link>

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
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'

export default {
  components: {
    EyeSlashIcon,
    EyeIcon,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      email: '',
      password: '',
      passwordError: false,
      isPasswordVisible: false,
      hasError: {
        email: false,
        password: false
      }
    }
  },
  computed: {
    isInvalidEmail () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  watch: {
    email (newEmail) {
      if (newEmail.trim() !== '') {
        this.hasError.email = false
      }
    },
    password (newPassword) {
      if (newPassword.trim() !== '') {
        this.hasError.password = false
      }
    }
  },
  methods: {
    handleSubmit () {
      this.hasError.email = this.email.trim() === ''
      this.hasError.password = this.password.trim() === ''

      if (this.hasError.email || this.hasError.password) {
        return
      }
      // Выполнить остальную логику отправки формы
      // ...

      console.log('You\'\'re logged in!')
    },
    submit (event) {
      console.log('submit button called')
      event.preventDefault()
    },
    togglePasswordVisibility () {
      this.isPasswordVisible = !this.isPasswordVisible
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

.forgot-password-link {
  margin-bottom: 64px;
  font-size: 14px;
  width: max-content;
}

.login-button-section {
  display: flex;
  justify-content: center;
}

.login-button-section button {
  width: 100%;
}

.input-wrapper {
  position: relative;
}

.main__input-email-block {
  margin-bottom: 24px;
}

.main__input-password-block {
  margin-bottom: 8px;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
}

.input-wrapper .error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.base-input {
  background-color: #f1f1f1;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: #1F1F1F;
  width: 100%;
}

.base-input::placeholder {
  color: #B0B0B0;
}

.input-with-eye {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.input-field {
  padding-right: 45px;
  width: 100%;
}

.eye-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.eye-button svg {
  color: #B0B0B0;
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>
