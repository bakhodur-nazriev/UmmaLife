<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="title medium reminder-message">{{ $t('register.messages.create_password') }}</h5>

    <div class="main-input__block">
      <div class="main-input__block-with-eye" :class="['input-wrapper', { error: hasError }]">
        <input
            name="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="password"
            class="base-input"
            :class="{ 'input-field': true, error: passwordError }"
            :placeholder="$t('register.placeholders.your_password')"
        />

        <button type="button" class="eye-button" @click="togglePasswordVisibility">
          <eye-slash-icon class="eye-button__icon" v-if="isPasswordVisible"></eye-slash-icon>
          <eye-icon class="eye-button__icon" v-else></eye-icon>
        </button>
      </div>
      <small v-if="hasError" class="error-message">
        {{ $t('register.validation.empty_password') }}
      </small>
    </div>

    <div class="login-button__section">
      <SampleButton
          @click="handleSubmit"
          class="login-button__section-next"
          :title="`${$t('buttons.next')}`"
      />
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
  data() {
    return {
      password: '',
      hasError: false,
      isPasswordVisible: false,
      passwordError: false
    }
  },
  watch: {
    password(newPassword) {
      if (newPassword.trim() !== '') {
        this.hasError = false
      }
    }
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar'
    }
  },
  methods: {
    handleSubmit() {
      // Выполните обработку данных формы
      if (this.password.trim() === '') {
        this.hasError = true
      } else {
        // Perform form submission logic here
        // ...

        this.$emit('next-step')
        // Переключитесь на следующий шаг
      }
    },
    submit(event) {
      event.preventDefault()
      this.handleSubmit()
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
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
      display: block;
    }
  }
}

.reminder-message {
  margin-top: 0;
  margin-bottom: 40px;
  color: var(--color-mine-shaft);
}

.login-button__section {
  display: flex;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
  }

  &-next {
    width: 100%;
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

.input-field {
  padding-right: 45px;
  width: 100%;
}

.main-input__block {
  margin-bottom: 64px;

  &-with-eye {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
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
  color: var(--color-silver-chalice);
}

.rtl {
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
  .login-button__section button {
    max-width: 320px;
    display: flex;
    justify-content: center;
  }
}
</style>
