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

        <div class="sticker__button" @click="isOpenStickerWindow">
          <StickerButtonIcon class="sticker-icon"/>
        </div>

        <SampleDivider class="textarea__right--buttons--divider" />

        <button class="send__button" type="button">
          <SubmitIcon class="small-submit__icon" />
          <SendIcon class="big-submit__icon"/>
        </button>
      </div>

      <div class="main-sticker__window" v-if="stickerWindow">
        <div class="main-sticker__window-header">
          <FileUpload class="attach__file" label="file">
            <SmallClipFileIcon class="small-clip__icon"/>
          </FileUpload>

          <SampleTextarea
            class="main-sticker__window-header-textarea"
            :placeholder="`${ $t('placeholders.message')}`"
          />

          <SampleButton
            size="12"
            color="tertiary"
            icon="keyboard"
            class="keyboard-button"
          >
            <KeyboardIcon />
          </SampleButton>
        </div>

        <SampleDivider />
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
import SampleButton from '@/components/ui/SampleButton.vue'
import KeyboardIcon from '@/components/icons/comment/KeyboardIcon.vue'

export default {
  components: {
    KeyboardIcon,
    SampleButton,
    SendIcon,
    ClipIcon,
    SmallClipFileIcon,
    SubmitIcon,
    StickerButtonIcon,
    SampleDivider,
    FileUpload,
    SampleTextarea
  },
  data: () => ({
    stickerWindow: false
  }),
  methods: {
    adjustTextareaHeight () {
      const textarea = this.$el.querySelector('.form__textarea')
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`

      if (textarea.value === '') {
        textarea.style.height = '48px'
      }
    },
    isOpenStickerWindow() {
      this.stickerWindow = !this.stickerWindow
    }
  }
}
</script>

<style scoped lang="scss">
.main-sticker__window {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: var(--color-gray);
  width: 100%;
  height: 100px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-header {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;

    &-textarea {
      font-size: 14px;
      height: 40px;
      width: 100%;
    }
  }
}

.sticker__button {
  cursor: pointer;
  user-select: none;
}

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
    .keyboard-button {
    padding: 0;
    display: flex;
    span {
      margin-right: 0;
    }
  }

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
