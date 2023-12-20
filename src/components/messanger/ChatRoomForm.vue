<template>
  <div class="parent">
    <div class="parent__edit" v-if="isEditOpen">
      <div class="parent__edit--icon">
        <edit-gray-icon />
      </div>
      <div class="parent__edit--text">
        <div class="parent__edit--close" @click="closeEdit">
          <close-edit-icon />
        </div>
        <span>Edit Message</span>
        {{ selectedMessage.message }}
      </div>
    </div>
    <div class="parent__edit" v-if="isReplyOpen">
      <div class="parent__edit--icon">
        <share-big-icon />
      </div>
      <div class="parent__edit--text">
        <div class="parent__edit--close" @click="emit('closeReply')">
          <close-edit-icon />
        </div>
        <span class="user">{{ selectedMessage?.messageAuthor }}</span>
        {{ selectedMessage?.message }}
      </div>
    </div>
    <form class="form" @submit.prevent="submitForm">
      <div class="form__input">
        <div class="form__file">
          <attach-icon />
          <input type="file" @input="fileHandler" />
        </div>
        <Textarea
          class="form__input--text"
          autoResize
          rows="1"
          v-model="textareaValue"
          @keydown="handleKeyDown"
          :placeholder="`${$t('chat.placeholder')}...`"
          :style="textareaStyle"
        />
      </div>
      <button type="submit" class="form__btn">
        {{ $t('chat.send') }}
        <spinner-gif v-if="isLoading" />
        <send-icon v-else />
      </button>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, computed, watch } from 'vue'

import Textarea from 'primevue/textarea'
import SendIcon from '@/components/icons/SendIcon.vue'
import AttachIcon from '@/components/icons/AttachIcon.vue'
import EditGrayIcon from '@/components/icons/MenuDetails/EditGrayIcon.vue'
import CloseEditIcon from '@/components/icons/MenuDetails/CloseEditIcon.vue'
import ShareBigIcon from '@/components/icons/MenuDetails/ShareBigIcon.vue'
import SpinnerGif from '@/components/icons/SpinnerGif.vue'

const props = defineProps({
  selectedMessage: Object,
  isReplyOpen: Boolean,
  isLoading: Boolean,
  isEditOpen: Boolean
})

const emit = defineEmits(['submitHandler', 'typeHandler', 'closeReply', 'closeEdit', 'fileHandler'])

const textareaValue = ref('')

const textareaStyle = computed(() => {
  return {
    'overflow-y': textareaRowCount.value > 4 ? 'scroll' : 'hidden',
    'max-height': '120px' // You can adjust the max height as needed
  }
})
const textareaRowCount = computed(() => {
  return textareaValue.value.split('\n').length
})

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    submitForm()
  }
}
const submitForm = () => {
  emit('submitHandler', {
    message: textareaValue.value,
    replyId: props.selectedMessage ? props.selectedMessage.messageId : null
  })
  textareaValue.value = ''
  emit('closeReply')
}

const closeEdit = () => {
  emit('closeEdit')
  textareaValue.value = ''
}

const fileHandler = (event) => {
  emit('fileHandler', event?.target?.files[0])
}

watch(
  () => textareaValue.value,
  () => emit('typeHandler')
)
watch(
  () => {
    return {
      isReplyOpen: props.isReplyOpen,
      isEditOpen: props.isEditOpen
    }
  },
  ({ isReplyOpen, isEditOpen }) => {
    const textarea = document.querySelector('.form__input--text')
    if (isEditOpen || (isReplyOpen && textarea)) {
      if (isEditOpen) {
        textareaValue.value = props.selectedMessage.message
      }
      textarea.focus()
    }
  }
)
</script>

<style scoped lang="scss">
.parent {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px 16px;
  &__edit {
    padding: 8px 0 4px;
    border-top: 1px solid var(--color-edit-border);
    position: relative;
    display: flex;
    align-items: center;
    &--close {
      position: absolute;
      top: 0;
      right: 0;
    }
    &--icon {
      padding: 14px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 32px;
        height: 32px;
        display: block;
      }
    }
    &--text {
      position: relative;
      background-color: var(--color-white);
      border-left: 2px solid var(--color-green);
      padding: 12px 12px 8px 14px;
      width: calc(100% - 250px);
      border-radius: 0px 10px 10px 0px;
      span {
        display: block;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: var(--color-silver-chalice);
        margin-bottom: 4px;
      }
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      letter-spacing: 0.35px;
      color: var(--color-mine-shaft);
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      white-space: nowrap;
    }
    &--close {
      cursor: pointer;
    }
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 171px;
    gap: 16px;
    background-color: var(--color-seashell);
    align-items: flex-end;
    &__input {
      background-color: var(--color-white);
      display: flex;
      border-radius: 10px;
      &--text {
        width: 100%;
        border: none;
        padding: 18px 24px 16px;
        outline: none;
        color: var(--color-mine-shaft);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border-radius: 10px;
        resize: none;
        height: 56px;
        overflow: hidden;
        background-color: var(--color-white);
        &:focus {
          outline: none;
          box-shadow: none;
        }
        &::placeholder {
          color: var(--color-silver-chalice);
        }
      }
    }
    &__file {
      padding: 19px 24px;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      margin-top: auto;
      svg {
        width: 18px;
        height: 18px;
        display: block;
      }
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }
      &::after {
        content: '';
        width: 1px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background-color: var(--color-silver-chalice);
      }
    }
    &__btn {
      border-radius: 10px;
      border: 1px solid var(--color-deep-cerulean);
      outline: none;
      color: var(--color-deep-cerulean);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      height: 56px;
      background-color: transparent;
      svg {
        width: 18px;
        height: 18px;
        display: block;
      }
      img {
        width: 45px;
        height: 45px;
        margin-left: -10px;
      }
    }
  }
}
</style>
