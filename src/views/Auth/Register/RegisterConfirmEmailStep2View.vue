<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <h5 class="subhead roman reminder-message">{{ $t('register.messages.verify_with_email') }}</h5>

    <h5 class="title bold reply__phone-number">{{ mainEmail }}</h5>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="verify__number-section">
        <SampleCodeNumberInput
            v-for="index in 6"
            :key="index"
            v-model="code[index - 1]"
            @next="focusNextInput"
            @backspace="handleBackspace"
        />
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.incorrect_code') }}
      </small>
      <small v-if="errorText" class="error-message">
        {{ errorText }}
      </small>
    </div>

    <div class="login__button-section">
      <SampleButton type="submit" :title="`${$t('buttons.next')}`"/>
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <button
          class="link"
          type="button"
          @click="resendRequest"
          :disabled="isResendDisabled"
      >
        {{ $t('links.resend') }} {{ formatTime(countDown) }}
      </button>
    </div>
  </FormAuth>
</template>

<script>
/* eslint-disable */
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleCodeNumberInput from '@/components/ui/SampleCodeNumberInput.vue'
import axios from 'axios'
import {getFormData} from '@/utils'

export default {
  components: {
    SampleButton,
    SampleCodeNumberInput,
    FormAuth,
    TitleSample
  },
  data() {
    return {
      code: ['', '', '', '', '', ''],
      hasError: false,
      countDown: 60,
      errorText: null
    }
  },
  computed: {
    mainEmail() {
      return localStorage.getItem('email')
    },
    isResendDisabled() {
      return this.countDown > 0
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()

      if (this.code.some((val) => val.trim() === '')) {
        this.hasError = true
      }

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          this.$router.push({name: 'RegisterCreatePasswordStep3View'})
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        email: this.mainEmail,
        code: this.code.join('')
      })

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }

      try {
        return await axios.post('https://ummalife.com/api/confirm-email', payload, {headers})
      } catch (error) {
        throw error
      }
    },
    async resendRequest() {
      try {
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY,
          email: localStorage.getItem('email')
        })

        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        }

        const response = await axios.post('https://ummalife.com/api/check-email', payload, {headers})

        if (!response.data.api_status === 200) {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    focusNextInput() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus()
      }
    },
    handleBackspace() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)

      if (currentIndex > 0) {
        inputs[currentIndex - 1].focus()
      }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const reminderSeconds = seconds % 60

      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = reminderSeconds.toString().padStart(2, '0')

      return `${formattedMinutes}:${formattedSeconds}`
    }
  },
  created() {
    this.startCountdown()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
  margin-bottom: 48px;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
}

.input-wrapper .error-message {
  color: red;
  font-size: 12px;
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--color-mine-shaft);
  line-height: 1.5;
}

.reply__phone-number {
  margin-bottom: 32px;
  color: var(--color-mine-shaft);
}

.resend__code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.resend__code > label,
a {
  margin: 0 4px;
  text-decoration: none;
}

.resend__code > label {
  color: #b0b0b0;
}

.verify__number-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 8px;
}

.verify__number-section input {
  width: 45px;
  height: 45px;
  font-size: 20px;
  text-align: center;
}

.login__button-section {
  display: flex;
  justify-content: center;
}

.login__button-section button {
  width: 100%;
  display: flex;
  justify-content: center;
}

.resend__code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .link {
    text-decoration: none;
    background: none;
    cursor: pointer;
    border: none;
    font-size: 16px;
    padding: 0;
    outline: inherit;
  }
}

@media (min-width: 768px) {
  .resend__code {
    flex-direction: row;
  }

  .login__button-section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }

  .verify__number-section {
    gap: 17px;
  }

  .verify__number-section input {
    width: 100%;
    height: 100%;
    font-size: 24px;
  }
}


@media (max-width: 768px) {
  .reminder-message {
    font-size: 16px;
  }
}
</style>