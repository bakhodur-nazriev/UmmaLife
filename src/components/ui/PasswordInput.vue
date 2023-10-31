<template>
  <div class="input-with-eye" :class="['input-wrapper', { error: isError }]">
    <input
      name="password"
      :type="isPasswordVisible ? 'text' : 'password'"
      v-model="inputValue"
      class="base-input"
      :class="{ 'input-field': true, error: passwordError }"
      :placeholder="placeholder"
    />

    <button type="button" class="eye-button" @click="togglePasswordVisibility">
      <eye-slash-icon v-if="isPasswordVisible"></eye-slash-icon>
      <eye-icon v-else></eye-icon>
    </button>
  </div>
  <small v-if="isError" class="error-message">{{ errorMessage }}</small>
</template>

<script>
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'

export default {
  components: { EyeSlashIcon, EyeIcon },
  props: {
    placeholder: String,
    error: Boolean,
    errorMessage: String,
    value: {
      type: String
    }
  },
  data() {
    return {
      isPasswordVisible: false,
      passwordError: false,
      inputValue: this.value
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    validate() {
      return this.inputValue.trim() !== ''
    }
  },
  watch: {
    inputValue() {
      this.$emit('input', this.inputValue)
    }
  },
  computed: {
    isError() {
      return !this.validate()
    }
  }
}
</script>

<style scoped>
.base-input {
  background-color: var(--color-seashell);
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: var(--color-mine-shaft);
  width: 100%;
}

.base-input::placeholder {
  color: var(--color-silver-chalice);
}

.input-with-eye {
  position: relative;
  display: flex;
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
  color: var(--color-silver-chalice);
}

.input-wrapper.error .base-input {
  border: 1.4px solid var(--color-valencia);
}

.error-message {
  color: var(--color-valencia);
  font-size: 12px;
  margin-top: 4px;
}
</style>
