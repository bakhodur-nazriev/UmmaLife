<template>
  <div class="input-with-eye" :class="['input-wrapper', { error: isError }]">
    <input
      name="password"
      :type="isPasswordVisible ? 'text' : 'password'"
      v-model="inputValue"
      class="base-input"
      :class="{'input-field': true, 'error': passwordError}"
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
    errorMessage: String
  },
  data () {
    return {
      isPasswordVisible: false,
      passwordError: false
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  },
  computed: {
    isError () {
      return this.error && !this.inputValue
    }
  }
}
</script>

<style scoped>
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
