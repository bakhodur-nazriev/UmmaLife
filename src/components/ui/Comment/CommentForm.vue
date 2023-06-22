<template>
  <form
    action=""
    method="post"
    class="comment__form"
  >
    <div class="comment__avatar">
      <img
        class="comment__author--avatar"
        src="../../../assets/images/Ellipse.png"
        width="48"
        height="48"
        alt=""
      >
    </div>

    <sample-textarea
      class="form__textarea"
      :placeholder="`${ $t('placeholders.comment_input') }`"
      @input="adjustTextareaHeight"
    />

    <div class="textarea__right--buttons">
      <file-upload class="attach__file" label="file">
        <textarea-clip-icon />
      </file-upload>
      <sample-divider class="textarea__right--buttons--divider" />
      <button class="send__button" type="button">
        <send-icon/>
      </button>
    </div>
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/SampleTextarea.vue'
import SendIcon from '@/components/icons/SendIcon.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import TextareaClipIcon from '@/components/icons/TextareaClipIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    SampleDivider,
    TextareaClipIcon,
    FileUpload,
    SendIcon,
    SampleTextarea
  },
  data () {
    return {}
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
.comment__avatar {
  display: flex;
}

.textarea__right--buttons--divider {
  height: 14px;
  border: 1px solid var(--color-gray-2);
}

.comment__author--avatar {
  margin-right: 12px;
}

.comment__form {
  display: flex;
  position: relative;
  height: auto;
  padding-top: 20px;
  padding-bottom: 8px;
  width: 100%;
}

.comment__form::before {
  content: "";
  position: absolute;
  top: 8px;
  width: 100%;
  height: 1px;
  background-color: var(--color-divider);
}

.send__button,
.attach__file {
  border: none;
  cursor: pointer;
  background: none;
  display: flex;;
  padding: 0;
}

.textarea__right--buttons {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: flex-end;
  gap: 24px;
}

.form__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 110px 15px 15px;
  resize: none;
  overflow: hidden;
}
</style>
