<template>
  <form
    action=""
    method="post"
    class="comment__form"
  >
    <img class="comment__author--avatar" src="../../assets/images/Ellipse.png" width="48" height="48" alt="">

    <sample-textarea
        class="form__textarea"
        :placeholder="`${ $t('placeholders.comment_input') }`"
        @input="adjustTextareaHeight"
      ></sample-textarea>

    <div class="textarea__right--buttons">
      <file-upload class="attach__file" label="file">
        <textarea-clip-icon />
      </file-upload>
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

export default {
  components: {
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
    }
  }
}
</script>

<style scoped>
.comment__author--avatar {
  margin-right: 12px;
}

.comment__form {
  display: flex;
  position: relative;
  align-items: center;
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
  padding: 0;
}

.textarea__right--buttons {
  position: absolute;
  right: 20px;
  display: flex;
  gap: 24px;
}

.form__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 100px 15px 15px;
  resize: none;
  overflow: hidden;
}
</style>
