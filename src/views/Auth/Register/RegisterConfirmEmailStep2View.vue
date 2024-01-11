<template>
  <FormAuth @submit="handleSubmit">
    <div class="buttons-back__section">
      <SampleButton
        @click="goBack"
        icon="back"
        :size="20"
        color="none"
        :title="`${$t('buttons.prev')}`"
      >
        <ArrowLeftIcon />
      </SampleButton>
    </div>

    <TitleSample>{{ $t('register.title') }}</TitleSample>

    <h5 class="subhead roman reminder-message">{{ $t('register.messages.verify_with_email') }}</h5>

    <h5 class="title bold reply__phone-number">{{ mainEmail }}</h5>

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
          {{ $t('register.validation.incorrect_code') }}
        </small>
        <small v-if="errorText" class="error-message">
          {{ errorText }}
        </small>
      </div>
    </div>

    <div class="login__button-section">
      <SampleButton
        type="submit"
        :title="`${$t('buttons.next')}`"
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
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleCodeNumberInput from '@/components/ui/SampleCodeNumberInput.vue'
import axios from 'axios'
import { getFormData } from '@/utils'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'

export default {
  components: {
    ArrowLeftIcon,
    SampleButton,
    SampleCodeNumberInput,
    FormAuth,
    TitleSample
  },
  data() {
    return {
      isCodeFilled: false,
      code: Array(6).fill(''),
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

      try {
        const response = await this.sendRequest()

        if (response.data.api_status === 200) {
          this.$router.push({ name: 'RegisterCreatePasswordStep3View' })
        } else {
          this.errorText = response.data.errors.error_text
        }
      } catch (error) {
        console.error('Error occurred:', error)
      }
    },
    async sendRequest() {
      const payload = getFormData({
        server_key: import.meta.env.VITE_SERVER_KEY,
        email: this.mainEmail,
        code: this.code.join('')
      })

      const headers = { 'Content-Type': 'multipart/form-data' }

      try {
        return await axios.post('/confirm-email', payload, { headers })
      } catch (error) {
        throw error
      }
    },
    async resendRequest() {
      try {
        const payload = getFormData({
          server_key: import.meta.env.VITE_SERVER_KEY,
          email: localStorage.getItem('email')
        })

        const headers = { 'Content-Type': 'multipart/form-data' }

        const response = await axios.post('/check-email', payload, { headers })

        if (response.data.api_status === 200) {
          this.countDown = 60
          this.startCountdown()
        } else {
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
      return this.$router.push({ name: 'RegisterAddEmailStep1View' })
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
  cursor: not-allowed;
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

.buttons-back__section {
  width: 100%;
  margin-bottom: 22px;

  button {
    cursor: pointer;
    color: var(--color-hippie-blue);
  }
}

.resend__code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.error-message__block {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 3px;
}

.input-wrapper {
  position: relative;
  height: 60px;
  margin: 0 0 48px;

  &.error {
    .base-input {
      border: 1.4px solid red;
    }
  }

  .error-message {
    color: red;
    font-size: 12px;
  }

  .verify__number-section {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 0;

    input {
      width: 65px;
      height: 65px;
      font-size: 20px;
      text-align: center;
    }
  }
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

.resend__code > label,
a {
  margin: 0 4px;
  text-decoration: none;
}

.resend__code > label {
  color: var(--color-silver-chalice);
}

.login__button-section {
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
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

@media (max-width: 767px) {
  .reminder-message {
    font-size: 16px;
  }

  .input-wrapper {
    .verify__number-section {
      justify-content: center;

      input {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  }
}
</style>
