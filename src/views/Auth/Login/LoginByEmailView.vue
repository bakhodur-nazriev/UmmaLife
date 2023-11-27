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

    <small v-if="errorText" class="error-message">
      {{ errorText }}
    </small>

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
import {getFormData} from '@/utils'

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
      loading: false,
      errorText: null
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
    validateForm() {
      const errors = [];

      if (this.email.trim() === '') {
        this.hasError.email = true;
        errors.push('Email is required');
      } else {
        this.hasError.email = false;
      }

      if (this.password.trim() === '') {
        this.hasError.password = true;
        errors.push('Password is required');
      } else {
        this.hasError.password = false;
      }

      return errors;
    },
    handleSuccessfulLogin(data) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user_id', data.user_id)
      this.$router.push({name: 'news'})
    },
    handleFailedLogin(data) {
      this.errorText = data.errors ? data.errors.error_text : 'Login failed. Please check your credentials.';
    },
    handleError(error) {
      console.error('Error fetching data:', error);

      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error_text) {
        this.errorText = error.response.data.errors.error_text;
      } else {
        this.errorText = 'An error occurred while processing your request. Please try again later.';
      }
    },
    async handleSubmit(event) {
      try {
        event.preventDefault();

        const errors = this.validateForm();
        if (errors.length > 0) {
          return;
        }

        this.loading = true;
        const response = await this.sendRequest();

        if (response.data.api_status === 200) {
          this.handleSuccessfulLogin(response.data)
        } else if (response.data.api_status === 300 && response.data.access_token) {
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push({name: 'RegisterAddInfoStep4View'})
        } else {
          this.handleFailedLogin(response.data);
        }
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        username: this.email,
        password: this.password
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      try {
        return await axios.post('https://preview.ummalife.com/api/auth', payload, {headers})
      } catch (error) {
        throw error
      }
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  },
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
  margin-bottom: 5px;
  font-size: 14px;
  width: max-content;
}

.login-button-section {
  display: flex;
  justify-content: center;
  margin-top: 64px;

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

.error-message {
  color: var(--color-valencia);
}

.input-wrapper {
  position: relative;

  &.error .phone__field-section {
    border: 1.4px solid red;
    border-radius: 10px;
  }

  .error-message {
    color: var(--color-valencia);
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
