<template>
  <div :class="['input-wrapper', { error: isError }]">
    <label class="base__label" :for="inputId">{{ label }}</label>
    <input
      class="base-input"
      :placeholder="placeholder"
      :value="value"
      :id="inputId"
    />
    <small v-if="isError" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    error: Boolean,
    errorMessage: String,
    value: String,
    label: String
  },
  data () {
    return {
      inputId: `input-${Math.random().toString(36).substring(2, 8)}`
    }
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
  border: 1.4px solid var(--color-valencia);
}

.input-wrapper .error-message {
  color: var(--color-valencia);
  font-size: 12px;
  margin-top: 4px;
}

.base-input {
  background-color: var(--color-seashell);
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 16px;
  color: var(--color-mine-shaft);
  width: 100%;
}

.base-input::placeholder {
  color: var(--color-silver-chalice);
  font-size: 16px;
}

.base__label {
  color: var(--color-silver-chalice);
}
</style>
