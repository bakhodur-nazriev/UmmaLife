<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="subhead roman reminder-message">{{ $t('register.messages.verify_with_email') }}</h5>

    <h5 class="title bold reply__phone-number">{{ mainEmail }}</h5>

    <div :class="['input-wrapper', { error: hasError }]">
      <div class="verify__number-section">
        <sample-code-number-input
          v-for="index in 6"
          :key="index"
          v-model="code[index - 1]"
          @next="focusNextInput"
          @backspace="handleBackspace"
        ></sample-code-number-input>
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.incorrect_code') }}
      </small>
    </div>

    <div class="login__button-section">
      <SampleButton @click="handleSubmit" :title="`${$t('buttons.next')}`" />
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <router-link class="link" :to="`/${$i18n.locale}/login`">
        {{ $t('links.resend') }} 00:32
      </router-link>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SampleCodeNumberInput from '@/components/ui/SampleCodeNumberInput.vue'

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
      hasError: false
    }
  },
  computed: {
    mainEmail() {
      return this.$store.getters.getEmail
    }
  },
  methods: {
    handleSubmit() {
      if (this.code.some((val) => val.trim() === '')) {
        this.hasError = true
      } else {
        const fullCode = this.code.join('') // объединение значений кода в одну строку
        console.log(fullCode)
        // Perform form submission logic here
        // ...

        this.$emit('next-step')
      }
    },

    submit(event) {
      event.preventDefault()
      this.handleSubmit()
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
    }
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
}

.reply__phone-number {
  margin-bottom: 32px;
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
    width: 66px;
    height: 66px;
    font-size: 24px;
  }
}
</style>
