<template>
  <div :class="['input-wrapper', { error: isError }]">
    <input
      class="base-input"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <small v-if="isError" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    error: Boolean,
    errorMessage: String
  },
  computed: {
    isError () {
      return this.error && !this.inputValue
    },
    inputValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
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
</style>
