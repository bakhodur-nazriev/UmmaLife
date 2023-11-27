<template>
  <FormAuth>
    <TitleSample>{{ $t('login.title') }}</TitleSample>
    <div class="sample__phone-input">

      <div :class="['input-wrapper', { error: hasError }]">
        <div class="phone__field-section">
          <vue-tel-input
              ref="vueTelInput"
              v-model="phoneNumber"
              v-bind="bindProps"
              @country-changed="countryChanged"
          >
          </vue-tel-input>

          <span v-if="responseErrorText" class="error-message">{{ responseErrorText }}</span>
        </div>
        <small v-if="hasError" class="error-message">
          {{ $t('register.validation.incorrect_phone_number') }}
        </small>
      </div>
    </div>
    <div class="login-button__section">
      <SampleButton
          class="login-button__section-button"
          @click="handleSubmit"
          :title="`${ $t('buttons.login') }`"
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
        :to="`/${$i18n.locale}/login-by-email`"
        class="link-with-phone-number"
    >
      {{ $t('login.with_email') }}
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import SampleButton from '@/components/ui/SampleButton.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import axios from 'axios'
import {VueTelInput} from 'vue-tel-input'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import {getFormData} from '@/utils'

export default {
  components: {
    DropdownIcon,
    VueTelInput,
    FormAuth,
    TitleSample,
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
        },
      },
      country: null,
      responseErrorText: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await this.sendLoginRequest()

        if (response.data.api_status === 200) {
          // Отправить запрос на /api/auth-phone
          const authPhoneResponse = await this.sendAuthPhoneRequest()

          if (authPhoneResponse.data.api_status === 200) {
            this.$router.push({ name: 'LoginByPhoneStep2View' });
          } else {
            this.responseErrorText = authPhoneResponse.data.errors.error_text
            console.error(authPhoneResponse.data)
          }
        } else {
          this.responseErrorText = response.data.errors.error_text
          console.error(response.data)
        }
      } catch (error) {
        console.error('Error sending request:', error)
      }
    },
    sendLoginRequest() {
      const fullPhoneNumber = this.selectedCountryCode + this.phoneNumber
      localStorage.setItem('phone_number', fullPhoneNumber)

      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        phone: fullPhoneNumber
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      return axios.post('/check-user-phone', payload, {headers})
    },
    sendAuthPhoneRequest() {
      const fullPhoneNumber = this.selectedCountryCode + this.phoneNumber
      localStorage.setItem('phone_number', fullPhoneNumber)

      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        phone: fullPhoneNumber
      })

      const headers = {

        'Content-Type': 'multipart/form-data'
      }

      return axios.post('/auth-phone', payload, {headers})
    },
    countryChanged(country) {
      this.selectedCountryCode = '+' + country.dialCode
    },
  },
  computed: {
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

.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.sample__phone-input {
  margin-bottom: 64px;
}

.login-button__section {
  display: flex;
  justify-content: center;

  &-button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.phone__field-section {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .base-input {
    width: 100%;
    border-radius: 0 10px 10px 0;
    background-color: var(--color-seashell);
    border: none;
    outline: none;
    font-size: 14px;
    padding: 16px;
    color: var(--color-mine-shaft);

    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }
}

.rtl {
  direction: rtl;

  .base-input {
    border-radius: 10px 0 0 10px;
  }
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

      //.vti__dropdown-arrow {
      //  background-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3707 6.5L8.06035 9.81035L4.75 6.5" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      //  width: 16px;
      //  height: 16px;
      //
      //  font-size: 0;
      //  color: transparent;
      //  text-indent: -9999px;
      //}
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

@media (min-width: 768px) {
  .login-button__section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }
}
</style>
