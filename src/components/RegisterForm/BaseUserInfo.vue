<template>
  <form-auth>
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div class="subtitles__text-fields">
      <h5 class="title medium">{{ $t('register.messages.fill_your_information') }}</h5>
      <label class="required-fields-label">{{ $t('register.messages.required_fields') }}</label>
    </div>

    <div class="sample__inputs-section">
      <sample-input :placeholder="$t('register.placeholders.name')"></sample-input>
      <sample-input :placeholder="$t('register.placeholders.last_name')"></sample-input>
      <gender-dropdown></gender-dropdown>
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
import SampleInput from '@/components/ui/SampleInput.vue'
import GenderDropdown from '@/components/ui/GenderDropdown.vue'

export default {
  components: {
    GenderDropdown,
    SampleInput,
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
.sample__inputs-section {
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}

.subtitles__text-fields {
  margin-bottom: 24px;
}

.required-fields-label {
  color: #B0B0B0;
  font-size: 14px;
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
