<template>
  <form
    action=""
    method="post"
    class="comment__form"
  >
    <div class="load__more-section">
      <SampleDropDown
        :color="parentColor"
        class="load__more-button"
        :drop-down-title="`${ $t('dropdown.download_comment') }`"
      />
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

      <SampleTextarea
        class="form__textarea"
        :placeholder="`${ $t('placeholders.comment_input') }`"
        @input="adjustTextareaHeight"
      />

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
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/Fields/SampleTextarea.vue'
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
    return {
      color: '#49A399'
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
  },
  computed: {
    parentColor () {
      return this.color
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown__button {
  span  {
    color: var(--color-hippie-blue);
  }
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
