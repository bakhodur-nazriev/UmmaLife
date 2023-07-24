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

    <CheckBox
      class="register-checkbox"
      name="agreement"
      color="secondary"
      text-size="small"
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
        @click="handleSubmit"
        :title="`${ $t('buttons.get_code_by_email') }`"
      />
    </div>

    <div class="login-section">
      <label class="login-section__label">{{ $t('register.label') }}</label>
      <router-link class="login-section__link" :to="`/${$i18n.locale}/login`">{{ $t('login.title') }}</router-link>
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

        this.$emit('next-step')
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

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  &.error {
    .base-input {
      border: 1.4px solid red;
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
