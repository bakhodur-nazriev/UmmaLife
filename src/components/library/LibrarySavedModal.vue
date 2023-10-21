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
  }
  &--top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 50px;
    svg {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
  &--title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &--wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
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
    }
    svg {
      width: 24px;
      height: 24px;
      display: block;
    }
  }
}
</style>
