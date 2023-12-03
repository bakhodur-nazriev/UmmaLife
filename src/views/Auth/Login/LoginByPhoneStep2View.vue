<template>
  <FormAuth @submit="handleSubmit">
    <div class="buttons-back__section">
      <SampleButton @click="goBack" icon="back" :size="20" color="none" :title="`${ $t('buttons.prev') }`">
        <ArrowLeftIcon/>
      </SampleButton>
    </div>

    <TitleSample>{{ $t('login.title') }}</TitleSample>

    <h5 class="subhead roman reminder-message">{{ $t('login.messages.verify_with_phone') }}</h5>

    <h5 class="title bold reply__phone-number">{{ phoneNumber }}</h5>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="verify__number-section">
        <SampleCodeNumberInput
            v-for="(inputValue, index) in code"
            :key="index"
            :code="code"
            :index="index"
            @next="focusNextInput"
            @backspace="handleBackspace"
            @update:code="updateCode"
        />
      </div>
      <div class="error-message__block">
        <small v-if="hasError" class="error-message">
          {{ $t('login.validation.incorrect_code') }}
        </small>
        <small v-if="errorText" class="error-message">
          {{ errorText }}
        </small>
      </div>
    </div>

    <span class="notification-message" v-if="notificationMessage">
      {{ notificationMessage }}
    </span>

    <div class="login__button-section">
      <SampleButton
        type="submit"
        :title="`${$t('buttons.login')}`"
        :disabled="isSubmitDisabled"
        :class="{ 'disabled-submit__button': isSubmitDisabled }"
      />
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <button
        type="button"
        @click="resendRequest"
        :disabled="isResendDisabled"
        :class="{ 'disabled-button': isResendDisabled, 'active-button': !isResendDisabled }"
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
import ArrowLeftIcon from "@/components/icons/shorts/ArrowLeftIcon.vue";

export default {
  components: {
    ArrowLeftIcon,
    SampleCodeNumberInput,
    FormAuth,
    TitleSample,
    SampleButton
  },
  data() {
    return {
      code: Array(6).fill(''),
      hasError: false,
      countDown: 60,
      notificationMessage: '',
      errorText: null
    }
  },
  computed: {
    phoneNumber() {
      return localStorage.getItem('phone_number')
    },
    isResendDisabled() {
      return this.countDown > 0
    },
    isSubmitDisabled() {
      return this.code.some((val) => val.trim() === '')
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
        this.notificationMessage = response.data.message
        this.$router.push({name: 'news'})
      } else {
        this.errorText = response.data.errors.error_text
      }
    },
    async sendRequest() {
      const fullCode = this.code.join('')

      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        phone: this.phoneNumber,
        code: fullCode
      })

      const headers = {'Content-Type': 'multipart/form-data'}

      try {
        return await axios.post('/confirm-phone', payload, {headers})
      } catch (error) {
        throw error
      }
    },
    async resendRequest() {
      try {
        const payload = getFormData({
          server_key: process.env.VUE_APP_SERVER_KEY,
          phone: localStorage.getItem('phone_number')
        })

        const headers = {'Content-Type': 'multipart/form-data'}

        const response = await axios.post('/auth-phone', payload, {headers})

        if (response.data.api_status === 200) {
          this.countDown = 60
          this.startCountdown()
        } else {
          this.errorText = response.data.errors.error_text.error
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    handleBackspace() {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)

      if (Array.isArray(this.code) && this.code.length > 0) {
        if (currentIndex >= 0 && currentIndex < this.code.length) {
          if (this.code[currentIndex] !== '') {
            this.code[currentIndex] = ''
          } else if (currentIndex > 0) {
            inputs[currentIndex - 1].focus()
          }
        } else if (currentIndex === -1 && this.code[this.code.length - 1] === '') {
          inputs[this.code.length - 1].focus()
        }
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
          this.isResendDisabled = false
        }
      }, 1000)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const reminderSeconds = seconds % 60

      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = reminderSeconds.toString().padStart(2, '0')

      return `${formattedMinutes}:${formattedSeconds}`
    },
    goBack() {
      return this.$router.push({name: 'LoginByPhoneStep1View'})
    },
    updateCode(payload) {
      const { index, value } = payload
      if (index >= 0 && index < this.code.length) {
        this.code[index] = value
      }
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
.disabled-submit__button {
  background-color: var(--color-silver-chalice);

  &:hover {
    background-color: var(--color-silver-chalice);
    cursor: not-allowed;
  }
}

.disabled-button {
  color: var(--color-silver-chalice);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: var(--color-silver-chalice);
    cursor: not-allowed;
  }
}

.active-button {
  color: var(--color-hippie-blue);
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

.resend__code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.buttons-back__section {
  width: 100%;
  margin-bottom: 22px;

  button {
    cursor: pointer;
    color: var(--color-hippie-blue);
  }
}

.error-message__block {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 3px;
}

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
