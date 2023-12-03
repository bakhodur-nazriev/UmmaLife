<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <div :class="['input-wrapper', { error: hasError || isInvalidEmail }]">
      <input
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('register.placeholders.email')"
      />
      <div class="error-message__block">
        <small v-if="hasError || isInvalidEmail" class="error-message">
          {{ $t(isInvalidEmail ? 'register.validation.incorrect_email' : 'register.validation.empty_email') }}
        </small>
        <small v-if="errorText" class="error-message">
          {{ errorText }}
        </small>
      </div>
    </div>

    <CheckBox
        class="register-checkbox"
        color="secondary"
        text-size="small"
        :isChecked="isAgreementChecked"
        @update:checked="handleCheckBoxUpdate"
    >
      {{ $t('register.messages.agreement_to_creating_account') }} <br>
      <router-link
          class="link register-checkbox__link"
          :to="`/${$i18n.locale}/terms`"
      >
        {{ $t('links.terms') }}
      </router-link>
      <span class="symbol__ampersand">&</span>
      <router-link
          class="link register-checkbox__link"
          :to="`/${$i18n.locale}/privacy-policy`"
      >
        {{ $t('links.privacy_policy') }}
      </router-link>
    </CheckBox>

    <div class="login-button-section">
      <SampleButton
          type="submit"
          :title="$t('buttons.get_code_by_email')"
          :disabled="isSubmitDisabled"
          :class="{ 'disabled-button': isSubmitDisabled }"
      >
      </SampleButton>
    </div>

    <div class="login-section">
      <label class="login-section__label">{{ $t('register.label') }}</label>
      <router-link
          class="login-section__link"
          :to="`/${$i18n.locale}/login-by-email`"
      >
        {{ $t('login.title') }}
      </router-link>
    </div>
  </FormAuth>
</template>

<script>
/* eslint-disable */
import SampleButton from '@/components/ui/SampleButton.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import axios from 'axios'
import {getFormData} from '@/utils'

export default {
  components: {
    TitleSample,
    CheckBox,
    FormAuth,
    SampleButton
  },
  data() {
    return {
      email: '',
      hasError: false,
      loading: false,
      submitting: false,
      errorText: '',
      isAgreementChecked: false
    }
  },
  computed: {
    isSubmitDisabled() {
      return this.email.trim() === ''
    },
    isInvalidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  watch: {
    email(newEmail) {
      this.$store.commit('setEmail', newEmail)
      if (newEmail.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    handleCheckBoxUpdate(value) {
      this.isAgreementChecked = value
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        email: this.email
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      try {
        return await axios.post('/check-email', payload, {headers})
      } catch (error) {
        throw error
      }
    },
    async handleSubmit(event) {
      event.preventDefault()
      localStorage.setItem('email', this.email);

      if (!this.email.trim()) {
        this.hasError = true
        return
      }

      if (!this.isAgreementChecked) {
        this.errorText = 'Вы должны согласиться с условиями'
        return
      }

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          this.$router.push({name: 'RegisterConfirmEmailStep2View'})
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.disabled-button {
  background-color: var(--color-silver-chalice);

  &:hover {
    background-color: var(--color-silver-chalice);
    cursor: not-allowed;
  }
}

.error-message__block {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 3px;
}

.input-wrapper {
  position: relative;
  height: 67px;
  margin: 0;

  &.error {
    .base-input {
      border: 1.4px solid red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 3px;
    }
  }
}

.error-message {
  color: red;
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

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}

.symbol__ampersand {
  margin: 0 4px;
}

.login-section {
  margin-top: 40px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;

  &__label {
    color: var(--color-silver-chalice);
  }

  &__link {
    margin-left: 4px;
    color: var(--color-mine-shaft);
  }
}

.register-checkbox {
  margin-top: 24px;
  margin-bottom: 64px;
  text-decoration: none;
  user-select: none;

  &__link {
    text-decoration: underline;
  }
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
