<script setup>
/* eslint-disable */
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import {ref, defineProps, defineEmits} from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  textSize: {
    type: String
  },
  isChecked: {
    type: Boolean
  }
})

const emit = defineEmits(['update:checked'])
const isChecked = ref(props.isChecked)
const updateChecked = (event) => {
  isChecked.value = event.target.checked
  emit('update:checked', event.target.checked)
}
</script>

<template>
  <label :class="['checkbox', `checkbox__${textSize}`]">
    <input
        class="checkbox__input visually-hidden"
        type="checkbox"
        :name="name"
        :checked="isChecked"
        @change="updateChecked"
    />
    <span :class="['checkbox__icon', `checkbox__${color}`]">
      <CheckMarkIcon/>
    </span>
    <span>
      <slot/>
    </span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 12px;

  &__small {
    font-size: 14px;
    color: var(--color-mine-shaft);
  }

  &__medium {
    font-size: 16px;
    color: var(--color-mine-shaft);
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    color: transparent;
    transition: 0.3s;
    padding: 7px;
  }

  &__primary {
    background: var(--color-white);
  }

  &__secondary {
    background: var(--color-seashell);
  }

  &__gray {
    background: var(--color-alto-first);
  }
}

.checkbox__input:checked + .checkbox__icon {
  background: #49a399;
  color: white;
}
</style>
