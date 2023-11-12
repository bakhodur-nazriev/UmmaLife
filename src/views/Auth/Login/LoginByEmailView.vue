<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('login.title') }}</TitleSample>

    <div class="main__input-email-block">
      <div :class="['input-wrapper', { error: hasError.email || isInvalidEmail }]">
        <input
            name="username"
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
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
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
        class="forgot-password-link link"
    >
      {{ $t('login.forgot_password') }}
    </router-link>

    <div class="login-button-section">
      <SampleButton
          type="submit"
          :title="$t('buttons.login')"
          :disabled="loading"
      />
    </div>

    <router-link
        class="link create-account-link"
        :to="`/${$i18n.locale}/register`"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </FormAuth>

  <div class="login-with-phone-section">
    <router-link
        :to="`/${$i18n.locale}/login-by-phone`"
        class="link-with-phone-number"
    >
      {{ $t('login.with_phone_number') }}
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import SampleButton from '@/components/ui/SampleButton.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
import axios from 'axios'

export default {
  components: {
    EyeSlashIcon,
    EyeIcon,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data() {
    return {
      email: '',
      password: '',
      passwordError: false,
      isPasswordVisible: false,
      hasError: {
        email: false,
        password: false
      },
      loading: false
    }
  },
  computed: {
    isInvalidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  watch: {
    email(newEmail) {
      if (newEmail.trim() !== '') {
        this.hasError.email = false
      }
    },
    password(newPassword) {
      if (newPassword.trim() !== '') {
        this.hasError.password = false
      }
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      this.hasError.email = this.email.trim() === ''
      this.hasError.password = this.password.trim() === ''

      if (this.hasError.email || this.hasError.password) {
        return
      }

      try {
        this.loading = true // Set loading state
        const response = await this.sendLoginRequest()

        if (response.status === 200) {
          // Process the response data here
          console.log(response.data)
        } else {
          console.error('Response status is not 200')
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false // Reset loading state
      }
    },

    async sendLoginRequest() {
      const loginData = {
        server_key: '7c5940661c603657d973782cfdff94c2',
        username: this.email,
        password: this.password
      }

      return axios.post('https://ummalife.com/api/auth', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      })

    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>

<style scoped lang="scss">
.link-with-phone-number {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-mine-shaft);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.login-with-phone-section {
  margin-top: 32px;
}

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

  button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.main__input-email-block {
  margin-bottom: 24px;
}

.main__input-password-block {
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;

  &.error .phone__field-section {
    border: 1.4px solid red;
    border-radius: 10px;
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
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

  &::placeholder {
    color: var(--color-silver-chalice);
  }
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
  color: var(--color-silver-chalice);
}

.rtl {
  direction: rtl;

  .input-field {
    padding-right: 16px;
    padding-left: 45px;
  }

  .eye-button {
    right: auto;
    left: 10px;
  }
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>
