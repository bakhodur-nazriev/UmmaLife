<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

    <sample-input
      type="email"
      v-model="email"
      :placeholder="$t('register.placeholders.email')"
      :error="emailError"
      :error-message="$t('login.validation.email')"
    ></sample-input>

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
import SampleInput from '@/components/ui/SampleInput.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import TitleSample from '@/components/ui/TitleSample.vue'

export default {
  components: {
    TitleSample,
    CheckBox,
    FormAuth,
    SampleInput,
    SampleButton
  },
  data () {
    return {
      email: '',
      emailError: false
    }
  },
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы

      // Переключитесь на следующий шаг
      this.$emit('next-step')
    },
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
