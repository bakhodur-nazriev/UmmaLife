<template>
  <div class="parent">
    <!-- <div class="parent__edit" v-if="edit">
      <div class="parent__edit--icon">
        <edit-gray-icon />
      </div>
      <div class="parent__edit--text">
        <div class="parent__edit--close" @click="$emit('clearValues')">
          <close-edit-icon />
        </div>
        <span>Edit Message</span>
        {{
          typeof selectedMessage.message === 'string'
            ? selectedMessage.message
            : selectedMessage.message.text
        }}
      </div>
    </div>
    <div class="parent__edit" v-if="share">
      <div class="parent__edit--icon">
        <share-big-icon />
      </div>
      <div class="parent__edit--text">
        <div class="parent__edit--close" @click="$emit('clearValues')">
          <close-edit-icon />
        </div>
        <span class="user">{{ user.name }}</span>
        {{
          typeof selectedMessage.message === 'string'
            ? selectedMessage.message
            : selectedMessage.message.text
        }}
      </div>
    </div> -->
    <form class="form" @submit.prevent="submitForm" ref="formRef">
      <div class="form__input">
        <div class="form__file">
          <attach-icon />
          <input type="file" />
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

<script>
/* eslint-disable */
import SendIcon from '@/components/icons/SendIcon.vue'
import AttachIcon from '@/components/icons/AttachIcon.vue'
import EditGrayIcon from '@/components/icons/MenuDetails/EditGrayIcon.vue'
import CloseEditIcon from '@/components/icons/MenuDetails/CloseEditIcon.vue'
import ShareBigIcon from '@/components/icons/MenuDetails/ShareBigIcon.vue'
import SpinnerGif from '@/components/icons/SpinnerGif.vue'

export default {
  components: { SendIcon, AttachIcon, EditGrayIcon, CloseEditIcon, ShareBigIcon, SpinnerGif },
  props: {
    edit: Boolean,
    share: Boolean,
    isLoading: Boolean
  },
  data() {
    return {
      textareaValue: ''
    }
  },
  computed: {
    textareaStyle() {
      return {
        'overflow-y': this.textareaRowCount > 4 ? 'scroll' : 'hidden',
        'max-height': '120px' // You can adjust the max height as needed
      }
    },
    textareaRowCount() {
      return this.textareaValue.split('\n').length
    }
  },
  emits: ['submitHandler', 'typeHandler', 'clearValues'],
  methods: {
    handleKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.submitForm()
      }
    },
    submitForm() {
      this.$emit('submitHandler', this.textareaValue)
      this.textareaValue = ''
    }
  },
  watch: {
    textareaValue() {
      this.$emit('typeHandler')
    }
  }
}
</script>

<script setup>
import Textarea from 'primevue/textarea'
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
      padding: 14px 16px 13px 0;
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
      width: calc(100% - 235px);
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
