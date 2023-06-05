<template>
  <form-auth @submit="submit">
    <title-sample>{{ $t('register.title') }}</title-sample>

    <div class="subtitles__text-fields">
      <h5 class="title medium">{{ $t('register.messages.fill_your_information') }}</h5>
      <label class="required-fields-label">{{ $t('register.messages.required_fields') }}</label>
    </div>

    <div class="sample__inputs-section">
      <div :class="['input-wrapper', { error: hasError }]">
        <input
          v-model="name"
          class="base-input"
          :placeholder="$t('register.placeholders.name')"
        />
        <small v-if="hasError" class="error-message">
          {{ $t(isInvalidEmail ? 'register.validation.incorrect_email' : 'register.validation.empty_email') }}
        </small>
      </div>

      <div :class="['input-wrapper', { error: hasError }]">
        <input
          v-model="last_name"
          class="base-input"
          :placeholder="$t('register.placeholders.last_name')"
        />
        <small v-if="hasError" class="error-message">
          {{ $t(isInvalidEmail ? 'register.validation.incorrect_email' : 'register.validation.empty_email') }}
        </small>
      </div>

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
import GenderDropdown from '@/components/ui/GenderDropdown.vue'

export default {
  components: {
    GenderDropdown,
    TitleSample,
    FormAuth,
    SampleButton
  },
  data () {
    return {
      name: '',
      last_name: '',
      gender: true,
      hasError: false
    }
  },
  methods: {
    handleSubmit () {
      // Выполните обработку данных формы
      if (this.name.trim() === '' || this.last_name.trim() === '' || this.gender.trim() === '') {
        this.hasError = true
      } else {
        // Perform form submission logic here
        // ...

        this.$emit('nextStep')
      }
    },
    submit (event) {
      event.preventDefault()
      this.handleSubmit()
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
}

.input-wrapper.error .base-input {
  border: 1.4px solid red;
}

.input-wrapper .error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
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
