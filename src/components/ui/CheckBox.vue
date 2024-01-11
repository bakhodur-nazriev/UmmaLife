<script setup>
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import {ref} from 'vue'

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
    type: String,
    default: '16px'
  },
  isChecked: {
    type: Boolean
  },
  size: {
    type: String,
    default: 'medium'
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
  <label :class="['checkbox', `text-size__${textSize}`]">
    <input
      class="checkbox__input visually-hidden"
      type="checkbox"
      :name="name"
      :checked="isChecked"
      @change="updateChecked"
    />
    <span :class="['checkbox__icon', `color__${color}`, `size__${size}`]">
      <CheckMarkIcon/>
    </span>
    <span class="checkbox__content">
      <slot/>
    </span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  user-select: none;

  &.text-size {
    &__small {
      font-size: 14px;
      color: var(--color-mine-shaft);
    }

    &__medium {
      font-size: 16px;
      color: var(--color-mine-shaft);
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    transition: 0.3s;

    &.color {
      &__primary {
        background: var(--color-white);
      }

      &__secondary {
        background: var(--color-seashell);
      }

      &__gray {
        background: var(--color-alto-first);
      }

      &__transparent {
        background: transparent;
        border: 1px solid var(--color-silver-chalice)
      }
    }

    &.size {
      &__small {
        width: 16px;
        height: 16px;
        padding: 3px;
        border-radius: 5px;
      }

      &__medium {
        width: 32px;
        height: 32px;
        border-radius: 5px;
        padding: 7px;
      }
    }
  }

  &__content {
    line-height: 1;
  }
}

.checkbox__input:checked + .checkbox__icon {
  background: #49a399;
  color: white;
  border: 1px solid var(--color-hippie-blue);
  border-radius: 5px;
}
</style>
