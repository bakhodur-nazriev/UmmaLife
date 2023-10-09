<template>
  <div class="custom__radio" :class="{ checked: isSelected }">
    <div class="custom__radio--checked" v-if="isSelected"></div>
  </div>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  isSelected: Boolean
})
</script>

<style lang="scss" scoped>
.custom__radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--color-secondary);
  position: relative;
  &.checked {
    border-color: var(--color-hippie-blue);
  }
  &--checked {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-hippie-blue);
  }
}
</style>
