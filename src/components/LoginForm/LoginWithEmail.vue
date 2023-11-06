<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('login.title') }}</TitleSample>

    <div class="main__input-email-block">
      <div :class="['input-wrapper', { error: hasError.email || isInvalidEmail }]">
        <input
          name="username"
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('login.placeholders.email')"
        />
        <small v-if="hasError.email || isInvalidEmail" class="error-message">
          {{ $t(isInvalidEmail ? 'login.validation.incorrect_email' : 'login.validation.empty_email') }}
        </small>
      </div>
    </div>

    <div class="main__input-password-block">
      <div class="input-with-eye" :class="['input-wrapper', { error: hasError.password }]">
        <input
          name="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          class="base-input"
          :class="{'input-field': true, 'error': passwordError}"
          :placeholder="$t('login.placeholders.password')"
        />

        <button type="button" class="eye-button" @click="togglePasswordVisibility">
          <eye-slash-icon v-if="isPasswordVisible"></eye-slash-icon>
          <eye-icon v-else></eye-icon>
        </button>
      </div>
      <small v-if="hasError.password" class="error-message">
        {{ $t('register.validation.empty_password') }}
      </small>
    </div>

    <router-link
      :to="`/${$i18n.locale}/forgot-password`"
      class="forgot-password-link link"
    >
      {{ $t('login.forgot_password') }}
    </router-link>

    <div class="login-button-section">
      <SampleButton
        type="submit"
        :title="$t('buttons.login')"
      />
    </div>

    <router-link
      class="link create-account-link"
      :to="`/${$i18n.locale}/register`"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </FormAuth>
</template>

<script>
import SampleButton from '@/components/ui/SampleButton.vue'
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
// import axios from 'axios'

export default {
  components: {
    EyeSlashIcon,
    EyeIcon,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      email: '',
      password: '',
      passwordError: false,
      isPasswordVisible: false,
      hasError: {
        email: false,
        password: false
      }
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
      if (newEmail.trim() !== '') {
        this.hasError.email = false
      }
    },
    password (newPassword) {
      if (newPassword.trim() !== '') {
        this.hasError.password = false
      }
    }
  },
  methods: {
    handleSubmit (event) {
      event.preventDefault()

      const url = 'https://ummalife.com/api/auth'
      const serverKey = '7c5940661c603657d973782cfdff94c2'
      const username = 'nazriev1996@mail.ru'
      const password = 'KingSton1996'

      const loginData = {
        server_key: serverKey,
        username: username,
        password: password
      }

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          // Process the response data here
          console.log(data)
        })
        .catch(error => {
          // Handle errors
          console.error('Error fetching data:', error)
        })
      // this.hasError.email = this.email.trim() === ''
      // this.hasError.password = this.password.trim() === ''
      //
      // if (this.hasError.email || this.hasError.password) {
      //   return
      // }
      //
      // const loginData = {
      //   server_key: '7c5940661c603657d973782cfdff94c2',
      //   username: this.email,
      //   password: this.password
      // }
      //
      // axios
      //   .post('https://ummalife.com/api/auth', loginData)
      //   .then(res => {
      //     console.log(res.data)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    togglePasswordVisibility () {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>

<style scoped lang="scss">
.create-account-link {
  text-decoration: none;
  text-align: center;
  margin-top: 40px;
}

.forgot-password-link {
  margin-bottom: 64px;
  font-size: 14px;
  width: max-content;
}

.login-button-section {
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.main__input-email-block {
  margin-bottom: 24px;
}

.main__input-password-block {
  margin-bottom: 8px;
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

.input-with-eye {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.input-field {
  padding-right: 45px;
  width: 100%;
}

.eye-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.eye-button svg {
  color: var(--color-silver-chalice);
}

.rtl {
  direction: rtl;

  .input-field {
    padding-right: 16px;
    padding-left: 45px;
  }

  .eye-button {
    right: auto;
    left: 10px;
  }
}

@media (min-width: 768px) {
  .login-button-section button {
    max-width: 320px;
  }
}
</style>
