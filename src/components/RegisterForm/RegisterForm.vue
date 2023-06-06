<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div :class="['input-wrapper', { error: hasError || isInvalidEmail }]">
      <input
        type="email"
        v-model="email"
        class="base-input"
        :placeholder="$t('register.placeholders.email')"
      />
      <small v-if="hasError || isInvalidEmail" class="error-message">
        {{ $t(isInvalidEmail ? 'register.validation.incorrect_email' : 'register.validation.empty_email') }}
      </small>
    </div>

    <check-box class="register-checkbox" name="agreement">
      {{ $t('register.messages.agreement_to_creating_account') }} <br>
      <router-link
        class="active-link"
        :to="`/${$i18n.locale}/terms`"
      >
        {{ $t('links.terms') }}
      </router-link>
      <span class="symbol__ampersand">&</span>
      <router-link
        class="active-link"
        :to="`/${$i18n.locale}/privacy-policy`"
      >
        {{ $t('links.privacy_policy') }}
      </router-link>
    </check-box>

    <div class="login-button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.get_code_by_email') }}</sample-button>
    </div>

    <div class="login-section">
      <label>{{ $t('register.label') }}</label>
      <router-link :to="`/${$i18n.locale}/login`">{{ $t('login.title') }}</router-link>
    </div>
  </form-auth>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import TitleSample from '@/components/ui/TitleSample.vue'

export default {
  components: {
    TitleSample,
    CheckBox,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      email: '',
      hasError: false
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
      this.$store.commit('setEmail', newEmail)
      if (newEmail.trim() !== '') {
        this.hasError = false
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$store.commit('setEmail', this.email)

      if (this.email.trim() === '' || this.isInvalidEmail) {
        this.hasError = true
      } else {
        // Perform form submission logic here
        // ...

        this.$emit('nextStep')
      }
    },

    submit (event) {
      console.log('submit button called')
      event.preventDefault()
      this.handleSubmit()

      // axios
      //   .post('/')
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
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

.symbol__ampersand {
  margin: 0 4px;
}

.login-section {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-section label {
  margin-right: 4px;
}

.login-section a {
  margin-left: 4px;
  color: #1F1F1F;
}

.login-section > label {
  color: #B0B0B0;
}

.register-checkbox {
  margin-top: 24px;
  margin-bottom: 64px;
  text-decoration: none;
}

.register-checkbox a {
  text-decoration: underline;
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
