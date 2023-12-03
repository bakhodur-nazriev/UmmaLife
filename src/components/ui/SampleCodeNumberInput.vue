<template>
  <input
      type="text"
      :value="code[index]"
      @input="handleInput($event.target.value)"
      @keydown="handleKeyDown"
      @paste="handlePaste"
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
    },
    code: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      required: true
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
    handleInput(value) {
      if (value.length <= 1) {
        this.$emit('update:code', { index: this.index, value })
        if (value && value.length === 1) {
          this.$emit('next')
        }
      }
    },
    handleKeyDown(event) {
      const key = event.key
      if (key === 'Backspace' && (!this.inputValue || this.inputValue.length === 0)) {
        this.$emit('backspace')
      }
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text').replace(/\s/g, '');
      let currentIndex = this.code.findIndex(val => val === '');

      if (currentIndex === -1) return;

      for (let i = 0; i < pastedText.length; i++) {
        if (currentIndex < this.code.length) {
          this.$emit('update:code', {index: currentIndex, value: pastedText.charAt(i)});
          currentIndex = this.code.findIndex((val, index) => index > currentIndex && val === '');
        } else {
          break;
        }
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
