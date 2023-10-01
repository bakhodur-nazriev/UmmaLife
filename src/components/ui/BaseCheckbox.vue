<template>
  <div class="selected__option--wrapper" @click="handleClick">
    <div class="selected__option--checkbox" :class="{ checked: isChecked }">
      <transition name="scale">
        <CheckMarkIcon v-if="isChecked" />
      </transition>
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
    transition: 0.3s ease-in-out;
    color: var(--color-white);
    cursor: pointer;
    &.checked {
      border: 1px solid var(--color-hippie-blue);
      background-color: var(--color-hippie-blue);
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
.scale-enter-active {
  animation: scale 0.3s;
}

.scale-leave-active {
  animation: scale 0.3s reverse;
}

@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
