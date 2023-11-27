<template>
  <FormAuth @submit="handleSubmit">
    <TitleSample>{{ $t('login.title') }}</TitleSample>

    <h5 class="subhead roman reminder-message">{{ $t('login.messages.verify_with_phone') }}</h5>

    <h5 class="title bold reply__phone-number">{{ phoneNumber }}</h5>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="verify__number-section">
        <sample-code-number-input
            v-for="index in 6"
            :key="index"
            v-model="code[index - 1]"
            @next="focusNextInput"
            @backspace="handleBackspace"
            @input="checkCodeFilled"
        ></sample-code-number-input>
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('login.validation.incorrect_code') }}
      </small>
    </div>

    <span
        class="notification-message"
        v-if="notificationMessage"
    >
      {{ notificationMessage }}
    </span>

    <div class="login__button-section">
      <SampleButton
          type="submit"
          :disabled="!isCodeFilled"
          :title="`${$t('buttons.login')}`"
          :class="{ 'inActive-button': !isCodeFilled }"
      />
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <button
          class="link"
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
    SampleCodeNumberInput,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      isCodeFilled: false,
      code: ['', '', '', '', '', ''],
      hasError: false,
      countDown: 60,
      timer: null,
      notificationMessage: ''
    }
  },
  computed: {
    phoneNumber() {
      return localStorage.getItem('phone_number')
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

      const response = await this.sendRequest()
      if (response.status === 200) {
        console.log(response.data)
        this.notificationMessage = response.data.message
        this.$router.push({name: 'news'})
      }
    },
    async sendRequest() {
      const fullCode = this.code.join('')

      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        phone: this.phoneNumber,
        code: fullCode
      })

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }

      try {
        return await axios.post('/confirm-phone', payload, {headers})
      } catch (error) {
        throw error
      }
    },
    resendRequest() {
      try {
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY,
          phone: localStorage.getItem('phone_number')
        })

        const headers = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }

        return axios.post('/auth-phone', payload, {headers})
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    checkCodeFilled() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      this.isCodeFilled = Array.from(inputs).every((input) => input.value !== '')
    },
    handleBackspace() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)

      if (currentIndex > 0) {
        inputs[currentIndex - 1].focus()
      }
    },
    focusNextInput() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus()
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

<style scoped lang="scss">
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

.notification-message {
  font-size: 12px;
  color: var(--color-hippie-blue);
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

.resend__code > label,
a {
  margin: 0 4px;
}

.resend__code > label {
  color: var(--color-silver-chalice);
}

.reply__phone-number {
  margin-bottom: 32px;
  color: var(--color-silver-chalice);
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--color-mine-shaft);
  line-height: 1.5;
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
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }

  .resend__code {
    flex-direction: row;
  }

  .verify__number-section {
    gap: 17px;
  }

  .verify__number-section input {
    width: 66px;
    height: 66px;
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .reminder-message {
    font-size: 16px;
  }
}
</style>
