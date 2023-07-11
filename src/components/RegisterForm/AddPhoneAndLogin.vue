<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="subhead medium">{{ $t('register.messages.enter_your_phone') }}</h5>
    <label class="login__with-phone-label">{{ $t('register.messages.can_login_with_phone_number') }}</label>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="phone__field-section">
        <sample-selected-country @country-selected="handleCountrySelected"></sample-selected-country>
        <input
          type="text"
          class="base-input"
          v-model="phoneNumber"
          :placeholder="$t('login.placeholders.phone')"
        />
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.incorrect_phone_number') }}
      </small>
    </div>

    <div class="login__button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.login') }}</sample-button>
    </div>

    <div class="skip__link-section">
      <router-link :to="`/${$i18n.locale}/login`">{{ $t('links.skip') }}</router-link>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'
export default {
  components: {
    SampleSelectedCountry,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      phoneNumber: '',
      selectedCountryCode: '',
      hasError: false
    }
  },
  watch: {
    phoneNumber (newPhoneNumber) {
      if (newPhoneNumber.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы
      this.hasError = this.phoneNumber.trim() === ''

      if (this.hasError) {
        return
      }

      // Переключитесь на следующий шаг
      this.$emit('next-step')
    },
    submit (event) {
      console.log('submit button called')
      event.preventDefault()
    },
    handleCountrySelected (countryCode) {
      this.selectedCountryCode = countryCode
    }
  },
  mounted () {
    this.handleCountrySelected()
  }
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
}

.input-wrapper.error .phone__field-section {
  border: 1.4px solid red;
  border-radius: 10px;
}

.input-wrapper .error-message {
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

.skip__link-section {
  display: flex;
  justify-content: center;
}

.skip__link-section a {
  color: #1F1F1F;
  text-decoration: none;
  font-weight: 500;
}

.login__button-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.login__button-section button {
  width: 100%;
  margin-top: 64px;
}

.login__with-phone-label {
  font-size: 16px;
  font-weight: 400;
  margin-top: 32px;
  margin-bottom: 24px;
}

.phone__field-section {
  display: flex;
  justify-content: center;
}

.phone__field-section input {
  width: 100%;
  border-radius: 0 10px 10px 0;
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }
}
</style>
