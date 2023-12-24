<template>
  <div class="modal__outer" v-on-click-outside="() => emit('closeModal')">
    <div class="modal">
      <div class="modal__title">Отправить фото</div>
      <div :class="uploadedFile.type === 'file' ? '' : 'modal__wrapper'">
        <SpinnerGif class="modal__spinner" v-if="isFileLoading" />
        <img
          :src="`${storage_url}${uploadedFile?.src}`"
          :alt="uploadedFile?.name"
          v-else-if="!isFileLoading && uploadedFile.type === 'image'"
        />
        <div class="modal__file" v-else-if="!isFileLoading && uploadedFile.type === 'file'">
          <div class="modal__file--icon">
            <FileIcon />
          </div>
          <div class="modal__file--text">
            <p>{{ uploadedFile?.name }}</p>
            <span>123 кб</span>
          </div>
        </div>
      </div>

      <Textarea
        class="modal__text"
        v-model="textareaValue"
        autoResize
        rows="1"
        placeholder="Подписать фото..."
      />
      <div class="modal__action">
        <SampleButton color="default" title="Отмена" width="100%" @click="emit('closeModal')" />
        <SampleButton title="Отправить" width="100%" @click="submitHandler" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import Textarea from 'primevue/textarea'
import SampleButton from '@/components/ui/SampleButton.vue'
import SpinnerGif from '@/components/icons/SpinnerGif.vue'
import FileIcon from '@/components/icons/FileIcon.vue'

const storage_url = ref(process.env.VUE_APP_STORAGE_URL)

const textareaValue = ref('')

const props = defineProps({
  isFileLoading: {
    type: Boolean,
    default: false
  },
  uploadedFile: {
    type: Object
  }
})

const emit = defineEmits(['closeModal', 'submitFileUpload'])

const submitHandler = () => {
  emit('submitFileUpload', { file: props.uploadedFile, message: textareaValue.value })
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.modal {
  max-width: 490px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  padding: 32px;
  border-radius: 20px;
  &__outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.7);
    z-index: 200;
  }
  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 16px;
    text-align: center;
  }
  &__wrapper {
    width: 100%;
    background-color: var(--color-seashell);
    border-radius: 4px;
    min-height: 331px;
    max-height: 331px;
    height: 100%;
    position: relative;
    margin-bottom: 20px;
    & > img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      object-fit: contain;
      object-position: center;
      height: inherit;
    }
  }
  &__spinner {
    width: 45px;
    height: 45px;
  }
  &__text {
    margin-bottom: 20px;
    width: 100%;
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
    padding: 14px 20px;
    outline: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    border: none;
    display: block;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: var(--color-secondary);
    }
  }
  &__action {
    width: 100%;
    display: flex;
    gap: 6px;
  }
  &__file {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
    &--icon {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      background-color: var(--color-seashell);
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
      display: flex;
      flex-direction: column;
      gap: 8px;
      p {
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
        padding: 0;
        margin: 0;
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
      }
    }
  }
}
</style>
