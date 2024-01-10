<template>
  <div class="modal__overlay">
    <div class="modal__box" v-on-click-outside="closeHandler">
      <div class="modal__box--title">{{ title }}</div>
      <div class="modal__box--img" :class="className">
        <img :src="img" :alt="title" />
      </div>
      <div class="modal__box--bottom">
        <button
          type="button"
          class="modal__box--btn change"
          @click="emit('acceptImage', img, className)"
        >
          Изменить
        </button>
        <button type="button" class="modal__box--btn cancel" @click="closeHandler">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
const props = defineProps({
  title: String,
  img: String,
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['closeModal', 'acceptImage'])

const closeHandler = () => {
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  &__box {
    max-width: 700px;
    width: 100%;
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 24px;
    &--title {
      font-size: 18px;
      font-style: normal;
      font-weight: 550;
      line-height: 150%;
      color: var(--color-mine-shaft);
      margin-bottom: 24px;
    }
    &--img {
      height: 163px;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
      &.long {
        height: 300px !important;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &--bottom {
      display: flex;
      gap: 8px;
    }
    &--btn {
      padding: 15px;
      border: none;
      outline: none;
      width: 216px;
      border-radius: 10px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
      &.change {
        background: var(--color-hippie-blue);
        color: var(--color-white);
        &:hover {
          background-color: var(--color-deep-cerulean);
          color: var(--color-white);
          transition: all 0.15s ease-in-out;
        }
      }
      &.cancel {
        background: var(--color-seashell);
        color: var(--color-mine-shaft);
      }
    }
  }
}
</style>
