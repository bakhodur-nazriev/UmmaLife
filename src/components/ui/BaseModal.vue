<template>
  <div class="modal">
    <transition name="scale">
      <div class="modal__inner" v-on-click-outside="closeHandler" v-show="isOpen">
        <div class="modal__title"><slot name="title" /></div>
        <div class="modal__text">
          <slot name="text" />
        </div>
        <div class="modal__body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
const emit = defineEmits(['closeModal'])
const props = defineProps(['isOpen'])
const closeHandler = () => {
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.modal {
  background: rgba($color: #000, $alpha: 0.7);
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  &__inner {
    background-color: var(--color-white);
    padding: 32px;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
  }
  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    text-align: center;
    color: var(--color-mine-shaft);
    margin-bottom: 16px;
  }
  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    text-align: center;
    color: var(--color-secondary);
    margin-bottom: 28px;
  }
}
.scale-enter-active {
  animation: scale-up 0.2s;
}

.scale-leave-active {
  animation: scale-up 0.2s reverse;
}

@keyframes scale-up {
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
