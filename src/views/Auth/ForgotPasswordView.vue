<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('login.forgot_password') }}</TitleSample>

    <h5 class="reminder-message">{{ $t('login.messages.reset_password') }}</h5>

    <div :class="['input-wrapper', { error: hasError || isInvalidEmail }]">
      <input
          type="email"
          v-model="email"
          class="base-input"
          :placeholder="$t('login.placeholders.email')"
      />
      <small v-if="hasError || isInvalidEmail" class="error-message">
        {{
          $t(isInvalidEmail ? 'forgot_password.validation.incorrect_email' : 'forgot_password.validation.empty_email')
        }}
      </small>

      <span class="error-message" v-if="errorText">
        {{ errorText }}
      </span>
      <span class="succeed-message" v-if="succeedText">
        {{ succeedText }}
      </span>
    </div>

    <div class="login-button-section">
      <SampleButton
          type="submit"
          :title="`${$t('buttons.submit')}`"
      />
    </div>
  </FormAuth>

  <div class="link-register__block">
    <router-link
        :to="`/${$i18n.locale}/register`"
        class="link-register"
    >
      {{ $t('login.create_account') }}
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import axios from "axios";

export default {
  components: {
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      email: '',
      hasError: false,
      errorText: null,
      succeedText: null
    }
  },
  watch: {
    email(newEmail) {
      if (newEmail.trim() !== '') {
        this.hasError = false
      }
    }
  },
  computed: {
    isInvalidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.email.trim() !== '' && !emailRegex.test(this.email)
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      if (this.email.trim() === '' || this.isInvalidEmail) {
        this.hasError = true;
        return
      }

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          this.succeedText = this.$t('reset_password.succeed_text')
        } else {
          console.error('Response status is not 200');
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error sending request:', error);
      }
    },

    async sendRequest() {
      const formData = new FormData()
      formData.append('server_key', process.env.VUE_APP_SERVER_KEY)
      formData.append('email', this.email)

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }

      try {
        return await axios.post('https://preview.ummalife.com/api/send-reset-password-email', formData, {headers});
      } catch (error) {
        throw error
      }
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const link1Param = urlParams.get('link1');
    console.log('Значение параметра link1:', link1Param);

    if (link1Param === 'reset-password') {
      this.$router.push({name: 'ResetPasswordView'});
    }
  },
}
</script>

<style scoped>
.link-register {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-mine-shaft);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.link-register__block {
  margin-top: 32px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.input-wrapper.error .base-input {
  border: 1.4px solid var(--color-valencia);
}

.input-wrapper .error-message {
  color: var(--color-valencia);
  font-size: 12px;
  margin-top: 4px;
}

.succeed-message {
  font-size: 12px;
  margin-top: 4px;
  color: var(--color-hippie-blue);
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
}

.base-input::placeholder {
  color: var(--color-silver-chalice);
}

.reminder-message {
  margin-bottom: 12px;
  color: var(--color-mine-shaft);
  font-size: 20px;
  line-height: 1.5;
  margin-top: 0;
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

@media (max-width: 768px) {
  .reminder-message {
    font-size: 14px;
  }
}
</style>
