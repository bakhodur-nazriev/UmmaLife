<template>
  <FormAuth @submit="submit">
    <TitleSample>{{ $t('login.title') }}</TitleSample>
    <div class="sample__phone-input">

      <div :class="['input-wrapper', { error: hasError }]">
        <div class="phone__field-section">
          <SampleSelectedCountry @country-selected="handleCountrySelected"/>
          <input
              type="tel"
              class="base-input"
              v-model="phoneNumber"
              :placeholder="$t('login.placeholders.phone')"
          />
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
import SampleButton from '@/components/ui/SampleButton.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import SampleSelectedCountry from '@/components/ui/SampleSelectedCountry.vue'

export default {
  components: {
    SampleSelectedCountry,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      phoneNumber: '',
      selectedCountryCode: '',
      hasError: false
    }
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      const fullPhoneNumber = this.selectedCountry.code + newPhoneNumber
      this.$store.commit('setPhoneNumber', fullPhoneNumber)
      if (newPhoneNumber.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    handleSubmit() {
      this.hasError = this.phoneNumber.trim() === ''

      if (this.hasError) {
        return
      }

      this.phoneNumber = this.selectedCountry.code + this.phoneNumber
      this.$emit('next-step')
    },
    submit(event) {
      console.log('submit button called')
      event.preventDefault()
    },
    handleCountrySelected(countryCode) {
      this.selectedCountryCode = countryCode
    }
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  },
  mounted() {
    this.handleCountrySelected()
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

@media (min-width: 768px) {
  .login-button__section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }
}
</style>
