<template>
  <input
      type="text"
      v-model="inputValue"
      @input="handleInput"
      @keydown="handleKeyDown"
      class="base-input"
      maxlength="1"
  />
</template>

<script>
export default {
  props: {
    error: Boolean,
    errorMessage: String,
    value: {
      type: String
    }
  },
  data() {
    return {
      inputValue: this.value
    }
  },
  computed: {
    isError() {
      return this.error && !this.inputValue
    }
  },
  methods: {
    handleInput() {
      const value = this.inputValue
      this.$emit('input', this.inputValue)
      if (value && value.length === 1) {
        this.$emit('next')
      } else if (value && value.length > 1) {
        this.inputValue = value.slice(0, 1)
      }
    },
    handleKeyDown(event) {
      if (event.key === 'Backspace' && (!this.inputValue || this.inputValue.length === 0)) {
        this.$emit('backspace')
      }
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
}

.base-input::placeholder {
  color: var(--color-silver-chalice);
}
</style>
