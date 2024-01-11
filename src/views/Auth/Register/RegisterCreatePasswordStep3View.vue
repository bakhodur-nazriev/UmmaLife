<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <h5 class="title medium reminder-message">{{ $t('register.messages.create_password') }}</h5>

    <div class="main-input__block">
      <div class="main-input__block-with-eye" :class="['input-wrapper', { error: hasError }]">
        <input
          name="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          class="base-input"
          :class="{ 'input-field': true, error: passwordError }"
          :placeholder="$t('register.placeholders.your_password')"
        />

        <button type="button" class="eye-button" @click="togglePasswordVisibility">
          <EyeSlashIcon class="eye-button__icon" v-if="isPasswordVisible" />
          <EyeIcon class="eye-button__icon" v-else />
        </button>
        <div class="error-message__block">
          <small v-if="hasError" class="error-message">
            {{ $t('register.validation.empty_password') }}
          </small>
          <small v-if="errorText" class="error-message">
            {{ errorText }}
          </small>
        </div>
      </div>
    </div>

    <div class="login-button__section">
      <SampleButton
        type="submit"
        class="login-button__section-next"
        :title="`${$t('buttons.next')}`"
        :disabled="isSubmitDisabled"
        :class="{ 'disabled-button': isSubmitDisabled }"
      />
    </div>
  </FormAuth>
</template>

<script>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import axios from 'axios'
import { getFormData } from '@/utils'

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
      password: '',
      hasError: false,
      isPasswordVisible: false,
      passwordError: false,
      errorText: null
    }
  },
  watch: {
    password(newPassword) {
      if (newPassword.trim() !== '') {
        this.hasError = false
      }
    }
  },
  computed: {
    isSubmitDisabled() {
      return this.password.trim() === ''
    },
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      if (this.password.trim() === '') {
        this.hasError = true
      }

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push({ name: 'RegisterAddInfoStep4View' })
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: import.meta.env.VITE_SERVER_KEY,
        email: localStorage.getItem('email'),
        password: this.password
      })

      const headers = { 'Content-Type': 'multipart/form-data' }

      try {
        return await axios.post('/create-account', payload, { headers })
      } catch (error) {
        throw error
      }
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>

<style scoped lang="scss">
.error-message__block {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 3px;
}

.disabled-button {
  background-color: var(--color-silver-chalice);
  &:hover {
    background-color: var(--color-silver-chalice);
    cursor: not-allowed;
  }
}

.input-wrapper {
  position: relative;
  margin: 0 auto;
  height: 50px;

  &.error .base-input {
    border: 1.4px solid red;
  }
}

.error-message {
  color: red;
  font-size: 12px;
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 40px;
  color: var(--color-mine-shaft);
}

.login-button__section {
  display: flex;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
  }

  &-next {
    width: 100%;
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

.input-field {
  padding-right: 45px;
  width: 100%;
}

.main-input__block {
  margin-bottom: 64px;

  &-with-eye {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
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
  color: var(--color-silver-chalice);
}

.rtl {
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
  .login-button__section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }
}
</style>
