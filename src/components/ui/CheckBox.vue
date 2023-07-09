<script setup>
/* eslint-disable */

import CheckMarkIcon from "@/components/icons/CheckMarkIcon.vue";

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
  }
})
</script>

<template>
  <label :class="['checkbox', `checkbox__${textSize}`]">
    <input
      class="checkbox__input visually-hidden"
      type="checkbox"
      :name="name"
    >
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
}

.checkbox__input:checked + .checkbox__icon {
  background: #49A399;
  color: white;
}
</style>
