<template>
  <input
    type="text"
    v-model="inputValue"
    @input="handleInput"
    @keydown="handleKeyDown"
    class="base-input"
  />
</template>

<script>
export default {
  props: {
    error: Boolean,
    errorMessage: String,
    value: {
      type: Number
    }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  computed: {
    isError () {
      return this.error && !this.inputValue
    }
  },
  methods: {
    handleInput () {
      const value = this.inputValue
      this.$emit('input', this.inputValue)
      if (value.length === 1) {
        this.$emit('next')
      } else if (value.length > 1) {
        this.inputValue = value.slice(0, 1)
      }
    },
    handleKeyDown (event) {
      if (event.key === 'Backspace' && this.inputValue.length === 0) {
        // Если нажата клавиша Backspace и поле ввода пустое
        // Эмитировать событие 'backspace' для удаления предыдущего поля
        this.$emit('backspace')
      }
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
}

.base-input::placeholder {
  color: #B0B0B0;
}
</style>
