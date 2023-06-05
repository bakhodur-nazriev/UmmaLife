<template>
  <form-auth>
    <title-sample>{{ $t('login.title') }}</title-sample>

    <sample-input
      type="email"
      class="email-input"
      v-model="email"
      :placeholder="$t('login.placeholders.email')"
      :error="emailError"
      :error-message="$t('login.validation.empty_email')"
    ></sample-input>
    <password-input
      class="password-input"
      v-model="password"
      :placeholder="$t('login.placeholders.password')"
      :error="passwordError"
      :error-message="$t('login.validation.empty_password')"
    ></password-input>

    <router-link
      :to="`/${$i18n.locale}/forgot-password`"
      class="forgot-password-link active-link"
    >
      {{ $t('login.forgot_password') }}
    </router-link>

    <div class="login-button-section">
      <sample-button @click="submit">{{ $t('buttons.login') }}</sample-button>
    </div>

    <router-link
      class="active-link create-account-link"
      :to="`/${$i18n.locale}/register`"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </form-auth>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleInput from '@/components/ui/SampleInput.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
// import axios from 'axios'

export default {
  components: {
    TitleSample,
    FormAuth,
    PasswordInput,
    SampleInput,
    SampleButton
  },
  data () {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    submit (event) {
      console.log('submit button called')
      event.preventDefault()

      let isValid = true

      if (!this.email) {
        this.emailError = true
        isValid = false
      }

      if (!this.password) {
        this.passwordError = true
        isValid = false
      }

      if (isValid) {
        console.log('test')
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
}
</script>

<style scoped>
.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.forgot-password-link {
  margin-top: 8px;
  margin-bottom: 64px;
  font-size: 14px;
  width: max-content;
}

.email-input {
  margin-bottom: 24px;
}

.password-input {
  margin-bottom: 12px;
}

.login-button-section {
  display: flex;
  justify-content: center;
}

.login-button-section button {
  width: 100%;
}
.test{}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>
