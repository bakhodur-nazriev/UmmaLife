<template>
  <FormAuth @submit="submit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <h5 class="subhead medium">{{ $t('register.messages.enter_your_phone') }}</h5>
    <label class="login__with-phone-label">{{ $t('register.messages.can_login_with_phone_number') }}</label>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="phone-field__section">
        <SampleSelectedCountry @country-selected="handleCountrySelected"/>
        <input
            type="text"
            class="base-input phone-field__section-input"
            :class="{ '' : isRTL }"
            v-model="phoneNumber"
            :placeholder="$t('Login.placeholders.phone')"
        />
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.incorrect_phone_number') }}
      </small>
    </div>

    <div class="login-button__section">
      <SampleButton
          class="login-button__section-button"
          @click="handleSubmit"
          :title="`${ $t('buttons.Login') }`"
      />
    </div>

    <div class="skip-section">
      <router-link
          class="skip-section__link"
          :to="`/${$i18n.locale}/login`"
      >{{ $t('links.skip') }}</router-link>
    </div>
  </FormAuth>
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
  computed: {
    isRTL () {
      return this.$i18n.locale === 'ar'
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
