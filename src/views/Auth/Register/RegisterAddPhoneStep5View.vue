<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <h5 class="subhead medium">{{ $t('register.messages.enter_your_phone') }}</h5>
    <label class="login__with-phone-label">{{
      $t('register.messages.can_login_with_phone_number')
    }}</label>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="phone-field__section">
        <vue-tel-input
          ref="vueTelInput"
          v-model="phoneNumber"
          v-bind="bindProps"
          @country-changed="countryChanged"
        >
        </vue-tel-input>
      </div>
      <div class="error-message__block">
        <small v-if="hasError" class="error-message">
          {{ $t('register.validation.incorrect_phone_number') }}
        </small>
        <small v-if="errorText" class="error-message">
          {{ errorText }}
        </small>
      </div>
    </div>

    <div class="login-button__section">
      <SampleButton
        type="submit"
        class="login-button__section-button"
        :title="`${$t('buttons.login')}`"
        :disabled="isSubmitDisabled"
        :class="{ 'disabled-button': isSubmitDisabled }"
      />
    </div>

    <div class="skip-section">
      <button class="skip-section__link" @click="skipPhoneStep">
        {{ $t('links.skip') }}
      </button>
    </div>
  </FormAuth>
</template>

<script>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import axios from 'axios'
import { VueTelInput } from 'vue-tel-input'
import { getFormData } from '@/utils'

export default {
  components: {
    VueTelInput,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data() {
    return {
      phoneNumber: '',
      selectedCountryCode: '',
      hasError: false,
      bindProps: {
        autoFormat: false,
        mode: 'international',
        inputOptions: {
          placeholder: this.$t('login.placeholders.phone'),
          name: 'phone',
          styleClasses: 'base-input'
        },
        dropdownOptions: {
          showFlags: true,
          showDialCodeInList: true,
          showDialCodeInSelection: true
        }
      },
      country: null,
      responseErrorText: null,
      errorText: null
    }
  },
  computed: {
    isSubmitDisabled() {
      return this.phoneNumber.trim() === ''
    },
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      if (newPhoneNumber.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      this.hasError = this.phoneNumber.trim() === ''

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          console.log(response.data)
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    async sendRequest() {
      const phoneNumberWithCountryCode = `+${this.selectedCountryCode + this.phoneNumber}`
      const payload = getFormData({
        server_key: import.meta.env.VITE_SERVER_KEY,
        phone: phoneNumberWithCountryCode
      })

      const headers = { 'Content-Type': 'multipart/form-data' }

      const accessToken = localStorage.getItem('access_token')
      const params = { access_token: accessToken }

      try {
        return axios.post('/check-phone', payload, { params, headers })
      } catch (error) {
        throw error
      }
    },
    handleCountrySelected(countryCode) {
      this.selectedCountryCode = countryCode
    },
    countryChanged(country) {
      this.selectedCountryCode = country.dialCode
    },
    skipPhoneStep() {
      this.$router.push({ name: 'RegisterCategoryInterestsStep6View' })
    }
  },
  mounted() {
    this.handleCountrySelected()
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  &.error {
    .phone-field__section {
      border: 1.4px solid red;
      border-radius: 10px;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}

.error-message__block {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 3px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.vue-tel-input {
  width: 100%;
  border: none;

  &:focus-within {
    box-shadow: none;
  }

  &::v-deep(.vti__dropdown) {
    background-color: var(--color-seashell);
    border-radius: 10px 0 0 10px;

    .vti__selection {
      .vti__country-code {
        font-size: 16px;
        color: var(--color-mine-shaft);
      }

      .vti__flag {
        width: 16px;
      }

      .vti__country-code {
        user-select: none;
      }
    }
  }

  &::v-deep(.base-input) {
    width: 100%;
    border-radius: 0 10px 10px 0;
    background-color: var(--color-seashell);
    border: none;
    outline: none;
    font-size: 16px;
    padding: 16px;
    color: var(--color-mine-shaft);

    &::placeholder {
      color: var(--color-silver-chalice);
    }
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

.skip-section {
  display: flex;
  justify-content: center;

  &__link {
    color: var(--color-mine-shaft);
    text-decoration: none;
    font-weight: 500;
    border: none;
    background: none;
    cursor: pointer;
  }
}

.login-button__section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  &-button {
    width: 100%;
    margin-top: 64px;
    display: flex;
    justify-content: center;
  }
}

.login__with-phone-label {
  font-size: 16px;
  font-weight: 400;
  margin-top: 32px;
  margin-bottom: 24px;
}

.phone-field__section {
  display: flex;
  justify-content: center;
  flex-direction: column;

  &-input {
    width: 100%;
    border-radius: 0 10px 10px 0;
  }
}

.rtl {
  direction: rtl;

  .base-input {
    border-radius: 10px 0 0 10px;
  }
}

@media (min-width: 768px) {
  .login-button__section button {
    max-width: 320px;
  }
}
</style>
