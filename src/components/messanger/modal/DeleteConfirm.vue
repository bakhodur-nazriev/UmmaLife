<template>
  <div class="modal open">
    <div class="modal__inner" v-on-click-outside="() => emit('close')">
      <div class="modal__title">
        {{ deleteAction === 'messege' ? $t('modal.delete_message') : $t('modal.delete_chat') }}
      </div>

      <div class="modal__subtitle">
        {{
          deleteAction === 'messege'
            ? $t('modal.sure_delete_message')
            : $t('modal.sure_delete_chat')
        }}
      </div>
      <label class="modal__confirm" v-if="deleteAction === 'messege'">
        <check-box
          class="checkbox__gray modal__checkbox"
          textSize="medium"
          :isChecked="isChecked"
          @update:checked="checkHandler"
        />
        <span>{{ $t('modal.also_delete_from') }} {{ chat?.chatName }}</span>
      </label>
      <SampleButton
        class="btn_rounded modal__btn"
        :title="deleteAction === 'messege' ? $t('modal.delete_message') : $t('modal.delete_chat')"
        @click="handleDelete"
      />
      <button class="modal__btn--close" @click="emit('close')">
        {{ $t('modal.cancel_delete') }}
      </button>
      <circle-close class="modal__close-circle" @click="emit('close')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import SampleButton from '@/components/ui/SampleButton.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import CircleClose from '@/components/icons/CircleClose.vue'
/* eslint-disable */
const emit = defineEmits(['close', 'handleDelete'])
const props = defineProps({
  deleteAction: {
    type: String,
    default: 'messege'
  },
  chat: Object
})

const isChecked = ref(false)

const handleDelete = () => {
  emit('handleDelete', { chat: props.chat, isChecked: isChecked.value })
  emit('close')
}

const checkHandler = (checked) => {
  isChecked.value = checked
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2.5px);
  width: 100%;
  height: 100%;
  z-index: 20;
  display: grid;
  place-items: center;
  &__inner {
    max-width: 594px;
    width: 100%;
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 32px 16px;
    position: relative;
  }
  &__close-circle {
    position: absolute;
    cursor: pointer;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: block;
  }
  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    text-align: center;
    color: var(--color-mine-shaft);
    margin-bottom: 32px;
  }
  &__subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 16px;
    text-align: center;
  }
  &__confirm {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    user-select: none;
    margin-bottom: 32px;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: 150%;
      color: var(--color-silver-chalice);
    }
  }
  &__checkbox {
    width: 32px;
    height: 32px;
    border-radius: 5px;
  }
  &__btn {
    display: block;
    max-width: 293px;
    width: 100%;
    margin: 0 auto 24px;
    &--close {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: var(--color-silver-chalice);
      cursor: pointer;
      border: none;
      outline: none;
      background-color: transparent;
      display: block;
      width: fit-content;
      margin: 0 auto;
    }
  }
}
</style>
