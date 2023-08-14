<template>
  <form
    action=""
    method="post"
    class="comment__form"
  >
    <div class="text__field-section">
      <div class="comment__avatar">
        <img
          class="comment__author--avatar"
          src="@/assets/images/comment_avatar.png"
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
        <FileUpload class="attach__file" label="file">
          <SmallClipFileIcon class="small-clip__icon"/>
          <ClipIcon class="big-clip__icon"/>
        </FileUpload>

        <StickerButtonIcon class="sticker-icon"/>

        <SampleDivider class="textarea__right--buttons--divider" />

        <button class="send__button" type="button">
          <SubmitIcon class="small-submit__icon" />
          <SendIcon class="big-submit__icon"/>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/Fields/SampleTextarea.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import StickerButtonIcon from '@/components/icons/comment/StickerButtonIcon.vue'
import SubmitIcon from '@/components/icons/comment/SubmitIcon.vue'
import SmallClipFileIcon from '@/components/icons/comment/SmallClipFileIcon.vue'
import ClipIcon from '@/components/icons/ClipIcon.vue'
import SendIcon from '@/components/icons/SendIcon.vue'

export default {
  components: {
    SendIcon,
    ClipIcon,
    SmallClipFileIcon,
    SubmitIcon,
    StickerButtonIcon,
    SampleDivider,
    FileUpload,
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

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    width: 100%;
    height: 1px;
    background-color: var(--color-seashell);
  }
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
  background-color: var(--color-seashell);
}

.small-clip__icon,
.small-submit__icon {
  display: none;
}

.big-clip__icon,
.big-submit__icon {
  display: flex;
}

.sticker-icon {
  display: none;
}

.textarea__right--buttons--divider {
  display: flex;
  height: 14px;
  border: 1px solid var(--color-alto-second);
}

.big-clip__icon {
  color: var(--color-silver-chalice);
}

@media (max-width: 576px) {
  .small-clip__icon,
  .small-submit__icon {
    display: flex;
  }

  .big-clip__icon,
  .big-submit__icon {
    display: none;
  }

  .sticker-icon {
    display: flex;
  }

  .form__textarea {
    background-color: var(--color-white);
    border-radius: 0;
    font-size: 14px;
    padding: 10px 115px 10px 10px;
    height: 38px;
  }

  .comment__avatar {
    align-items: center;
  }

  .comment__author--avatar {
    width: 32px;
    height: 32px;
  }

  .textarea__right--buttons--divider {
    display: none;
  }

  .textarea__right--buttons {
    gap: 12px;
    bottom: 15px;
  }

  .comment__form {
    padding: 8px;
    &::before {
      display: none;
    }
  }
}
</style>
