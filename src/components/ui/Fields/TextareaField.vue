<template>
  <div class="textarea__block">
    <textarea
      @input="adjustTextareaHeight"
      class="sample__textarea form__textarea"
      :value="replyAuthorName"
    ></textarea>

    <div class="textarea__right--buttons">
      <file-upload class="attach__file" label="file">
        <TextareaClipIcon />
      </file-upload>
      <SampleDivider class="textarea__right--buttons--divider" />
      <button class="send__button" type="button">
        <SendIcon />
      </button>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/ui/FileUpload.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import TextareaClipIcon from '@/components/icons/TextareaClipIcon.vue'
import SendIcon from '@/components/icons/SendIcon.vue'

export default {
  components: {
    SendIcon,
    TextareaClipIcon,
    SampleDivider,
    FileUpload
  },
  props: {
    replyAuthorName: {
      type: String,
      required: true
    }
  },
  methods: {
    adjustTextareaHeight () {
      const textarea = this.$el.querySelector('.form__textarea')
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`

      if (textarea.value === '') {
        textarea.style.height = '48px'
      }
    }
  }
}
</script>

<style scoped>
.textarea__block {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.sample__textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  background-color: var(--color-seashell);
  border-radius: 15px;
  padding: 12px;
  width: 100%;
}

.sample__textarea::placeholder {
  color: var(--color-silver-chalice);
}

.textarea__right--buttons--divider {
  height: 14px;
  border: 1px solid var(--color-alto-second);
}

.send__button,
.attach__file {
  border: none;
  cursor: pointer;
  background: none;
  display: flex;
  padding: 0;
}

.textarea__right--buttons {
  position: absolute;
  right: 20px;
  bottom: 17%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.form__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 125px 15px 15px;
  resize: none;
  overflow: hidden;
}
</style>
