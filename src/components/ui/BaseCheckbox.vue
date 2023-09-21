<template>
  <div class="selected__option--wrapper" @click="handleClick">
    <div class="selected__option--checkbox" :class="{ checked: isChecked }">
      <CheckMarkIcon v-if="isChecked" />
    </div>
    <div class="selected__option--text" v-if="label">{{ label }}</div>
  </div>
</template>

<script setup>
/* eslint-disable */
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import { ref } from 'vue'
const isChecked = ref(false)

const emit = defineEmits(['handleCheck'])
defineProps({
  label: {
    type: String,
    default: ''
  }
})
const handleClick = () => {
  isChecked.value = !isChecked.value
  emit('handleCheck', isChecked)
}
</script>

<style lang="scss" scoped>
.selected__option {
  &--checkbox {
    width: 24px;
    height: 24px;
    border: 1px solid var(--color-silver-chalice);
    border-radius: 5px;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.checked {
      border: 1px solid var(--color-hippie-blue);
      background-color: var(--color-hippie-blue);
      color: var(--color-white);
    }
  }
  &--wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
    width: fit-content;
  }
  &--text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
}
</style>
