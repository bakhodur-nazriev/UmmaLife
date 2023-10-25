<template>
  <div class="saved__books">
    <div class="saved__books--inner" v-on-click-outside="() => emit('closeHandler')">
      <div class="saved__books--top">
        <div class="saved__books--title">Добавленные закладки</div>
        <CloseIcon @click="emit('closeHandler')" />
      </div>
      <div class="saved__books--wrapper">
        <div
          class="saved__books--list"
          v-for="saved in savedPages"
          :key="saved.epubcifi"
          @click="emit('passBookData', saved)"
        >
          <span>{{ saved.label }} / {{ saved.page }}</span>
          <SavedBookIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'

import CloseIcon from '@/components/icons/CloseIcon.vue'
import SavedBookIcon from '@/components/icons/SavedBookIcon.vue'

const emit = defineEmits(['closeHandler', 'passBookData'])
const props = defineProps({
  savedPages: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.saved__books {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #1f1f1f, $alpha: 0.4);
  z-index: 50;
  &--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 750px;
    width: 100%;
    min-height: 90dvh;
    max-height: 90dvh;
    overflow-y: auto;
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 36px;
    @media (max-width: 767px) {
      width: calc(100vw - 32px);
      padding: 24px;
      min-height: 70dvh;
      max-height: 70dvh;
    }
  }
  &--top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 50px;
    @media (max-width: 767px) {
      margin-bottom: 24px;
    }
    svg {
      width: 18px;
      height: 18px;
      cursor: pointer;
      @media (max-width: 767px) {
        width: 14px;
        height: 14px;
      }
    }
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    @media (max-width: 767px) {
      font-size: 16px;
    }
  }
  &--wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
    @media (max-width: 767px) {
      gap: 30px;
    }
  }

  &--list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
    svg {
      width: 24px;
      height: 24px;
      display: block;
      @media (max-width: 767px) {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
