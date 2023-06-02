<template>
  <LayoutAuth>
    <form-auth>
      <title-sample>{{ $t('login.forgot_password') }}</title-sample>

      <h5 class="text-1 roman reminder-message">{{ $t('login.messages.reset_password') }}</h5>

      <sample-input
        class="email-input"
        typpe="email"
        v-model="email"
        :placeholder="$t('login.placeholders.email')"
        :error="emailError"
        :error-message="$t('login.validation.email')"
      ></sample-input>

      <div class="login-button-section">
        <sample-button @click="submit" type="submit">{{ $t('buttons.submit') }}</sample-button>
      </div>
    </form-auth>
  </LayoutAuth>
</template>

<script>
import LayoutAuth from '@/components/layouts/LayoutAuth.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleInput from '@/components/ui/SampleInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    LayoutAuth,
    FormAuth,
    TitleSample,
    SampleInput,
    SampleButton
  },
  data () {
    return {
      email: ''
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
.email-input {
  margin-bottom: 24px;
}

.reminder-message {
  margin-bottom: 12px;
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
