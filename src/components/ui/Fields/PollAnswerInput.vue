<template>
  <div class="input__wrapper--block" :class="['input-wrapper', { error: isError }]">
    <label class="base__label" :for="inputId">{{ label }}</label>
    <input
      class="base-input"
      :placeholder="placeholder"
      :value="value"
      :id="inputId"
    />
    <div class="remove__item--button--block" @click="removeItem">
      <button
        type="button"
        class="remove__item--button"
      >
        <close-icon />
      </button>
    </div>
    <small v-if="isError" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script>
import CloseIcon from '@/components/icons/CloseIcon.vue'

export default {
  components: {
    CloseIcon
  },
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
  },
  methods: {
    removeItem () {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style scoped>
.remove__item--button--block {
  background-color: var(--color-white);
  border-radius: 50%;
  position: absolute;
  right: 15px;
  padding: 8px;
  cursor: pointer;
}

.remove__item--button {
  display: flex;
  color: var(--color-silver-chalice);
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.remove__item--button svg {
  width: 8px;
  height: 8px;
}

.input__wrapper--block {
  position: relative;
  display: flex;
  align-items: center;
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
  font-size: 14px;
}

.base__label {
  color: var(--color-silver-chalice);
}
</style>
