<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="subhead roman reminder-message">{{ $t('register.messages.verify_with_email') }}</h5>

    <h5 class="title bold reply__phone-number">mylovelymail@gmail.com</h5>

    <div class="verify__number-section">
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
      <sample-code-number-input @next="focusNextInput" @backspace="clearPreviousInputs"></sample-code-number-input>
    </div>

    <div class="login__button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.next') }}</sample-button>
    </div>

    <div class="resend__code">
      <label>{{ $t('login.messages.didnt_receive_code') }}</label>
      <router-link
        class="active-link"
        :to="`/${$i18n.locale}/login`"
      >
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
  data () {
    return {}
  },
  methods: {
    handleSubmit () {
      // Выполните необходимую обработку данных формы

      // Переключитесь на следующий шаг
      this.$emit('next-step')
    },

    focusNextInput () {
      // Получить все компоненты sample-input внутри verify__number-section
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      // Найти индекс текущего активного input
      const currentIndex = Array.from(inputs).findIndex(input => input === document.activeElement)
      // Если currentIndex >= 0 и currentIndex < inputs.length - 1, установить фокус на следующий input
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus()
      }
    },

    clearPreviousInputs () {
      const inputs = this.$el.querySelectorAll('.verify__number-section input')
      const currentIndex = Array.from(inputs).findIndex((input) => input === document.activeElement)

      // Измените условие в цикле for, чтобы он не очищал текущее поле
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (inputs[i].value !== '') {
          inputs[i].value = '' // Очистить предыдущее поле
        } else {
          break // Прекратить цикл, если найдено пустое поле
        }
      }
    }
  }
}
</script>

<style scoped>
.reminder-message {
  margin-top: 0;
  margin-bottom: 24px;
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

.resend__code > label, a {
  margin: 0 4px;
  text-decoration: none;
}

.resend__code > label {
  color: #B0B0B0;
}

.verify__number-section {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
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
  .resend__code {
    flex-direction: row;
  }

  .login__button-section button {
    max-width: 320px;
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
