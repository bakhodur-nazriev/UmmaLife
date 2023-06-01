<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

    <h5 class="title medium reminder-message">{{ $t('register.messages.create_password') }}</h5>

    <password-input :placeholder="$t('register.placeholders.your_password')"></password-input>

    <div class="login__button-section">
      <sample-button @click="handleSubmit">{{ $t('buttons.next') }}</sample-button>
    </div>
  </form-auth>
</template>

<script>
import FormAuth from '@/components/ui/FormAuth.vue'
import TitleSample from '@/components/ui/TitleSample.vue'
import PasswordInput from '@/components/ui/PasswordInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    PasswordInput,
    TitleSample,
    FormAuth,
    SampleButton
  },
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы

      // Переключитесь на следующий шаг
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
.reminder-message {
  margin-top: 0;
}

.login__button-section {
  display: flex;
  justify-content: center;
}

.login__button-section button {
  width: 100%;
  margin-top: 64px;
}

@media (min-width: 768px) {
  .login__button-section button {
    max-width: 320px;
  }
}
</style>
