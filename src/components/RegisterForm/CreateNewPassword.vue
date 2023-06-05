<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="title medium reminder-message">{{ $t('register.messages.create_password') }}</h5>

    <div class="main__input-block">
      <div class="input-with-eye" :class="['input-wrapper', { error: hasError }]">
        <input
          name="password"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          class="base-input"
          :class="{'input-field': true, 'error': passwordError}"
          :placeholder="$t('register.placeholders.your_password')"
        />

        <button type="button" class="eye-button" @click="togglePasswordVisibility">
          <eye-slash-icon v-if="isPasswordVisible"></eye-slash-icon>
          <eye-icon v-else></eye-icon>
        </button>
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.empty_password') }}
      </small>
    </div>

    <div class="login__button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.next') }}</sample-button>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'

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
      password: '',
      hasError: false,
      isPasswordVisible: false,
      passwordError: false
    }
  },
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы
      if (this.password.trim() === '') {
        this.hasError = true
      } else {
        // Perform form submission logic here
        // ...

        this.$emit('nextStep')
        // Переключитесь на следующий шаг
      }
    },
    submit (event) {
      event.preventDefault()
      this.handleSubmit()
    },
    togglePasswordVisibility () {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>

<style scoped>
.main__input-block{
  margin-bottom: 64px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
}

.input-wrapper .error-message {
  color: red;
  font-size: 12px;
  display: block;
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 40px;
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
}

.base-input {
  background-color: #f1f1f1;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: #1F1F1F;
  width: 100%;
}

.base-input::placeholder {
  color: #B0B0B0;
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
  color: #B0B0B0;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
