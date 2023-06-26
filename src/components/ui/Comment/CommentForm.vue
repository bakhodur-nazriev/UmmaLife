<template>
  <form
    action=""
    method="post"
    class="comment__form"
  >
    <div class="load__more-section">
      <sample-drop-down class="load__more-button" :drop-down-title="`${ $t('dropdown.download_comment') }`"/>
    </div>
    <div class="text__field-section">
      <div class="comment__avatar">
        <img
          class="comment__author--avatar"
          src="../../../assets/images/comment_avatar.png"
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
    </div>
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/fields/SampleTextarea.vue'
import SendIcon from '@/components/icons/SendIcon.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import TextareaClipIcon from '@/components/icons/TextareaClipIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import SampleDropDown from '@/components/ui/SampleDropDown.vue'

export default {
  components: {
    SampleDropDown,
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
.dropdown__button> span {
  color: var(--color-hippie-blue);
}

.load__more-section {
  margin-bottom: 20px;
}

.text__field-section {
  display: flex;
}

.comment__avatar {
  display: flex;
}

.textarea__right--buttons--divider {
  height: 14px;
  border: 1px solid var(--color-alto-second);
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
  flex-direction: column;
}

.comment__form::before {
  content: "";
  position: absolute;
  top: 8px;
  width: 100%;
  height: 1px;
  background-color: var(--color-seashell);
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
  bottom: 17px;
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
