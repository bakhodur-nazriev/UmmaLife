<template>
  <div class="input__wrapper--block" :class="['input-wrapper', { error: isError }]">
    <label class="base__label" :for="inputId">{{ label }}</label>
    <sample-textarea
      class="base__textarea"
      @input="adjustTextareaHeight"
      :placeholder="placeholder"
      :value="value"
      :id="inputId"
    />
    <div class="remove__item--button--block" @click="removeItem">
      <button type="button" class="remove__item--button">
        <CloseIcon />
      </button>
    </div>
    <div class="move__item--button--block">
      <button type="button" class="move__item--button">
        <MoveIcon />
      </button>
    </div>
    <small v-if="isError" class="error-message">{{ errorMessage }}</small>
  </div>
</template>

<script>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import SampleTextarea from '@/components/ui/Fields/SampleTextarea.vue'

export default {
  components: {
    SampleTextarea,
    MoveIcon,
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
    },
    adjustTextareaHeight () {
      const textarea = this.$el.querySelector('.base__textarea')

      if (textarea.value.trim() !== '') {
        this.textareaValue = textarea.value
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      } else {
        this.textareaValue = ''
        textarea.style.height = '48px'
      }
    },
    mounted () {
      this.adjustTextareaHeight()
    }
  }
}
</script>

<style scoped>
.move__item--button--block {
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 8px;
  width: 13px;
}

.remove__item--button--block {
  background-color: var(--color-white);
  border-radius: 50%;
  position: absolute;
  right: 30px;
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

.move__item--button {
  display: flex;
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

.input-wrapper.error .base__textarea {
  border: 1.4px solid var(--color-valencia);
}

.input-wrapper .error-message {
  color: var(--color-valencia);
  font-size: 12px;
  margin-top: 4px;
}

.base__textarea {
  background-color: var(--color-seashell);
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 16px 65px 16px 16px;
  color: var(--color-mine-shaft);
  width: 100%;
  resize: none;
  overflow: hidden;
  height: 48px;
}

.base__textarea::placeholder {
  color: var(--color-silver-chalice);
  font-size: 16px;
}

.base__label {
  color: var(--color-silver-chalice);
}
</style>
