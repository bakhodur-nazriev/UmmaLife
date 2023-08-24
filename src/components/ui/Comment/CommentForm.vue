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
            <SmallClipFileIcon class="small-clip__header-icon"/>
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

        <StickerComponent v-if="selectedTab === 'stickers'" :is="currentComponent"/>
        <GifComponent v-if="selectedTab === 'gifs'" :is="currentComponent"/>

        <div class="main-sticker__window-footer">
          <button
            :class="['sticker-button', { 'active': selectedTab === 'stickers' }]"
            type="button"
            @click="selectedTab = 'stickers'"
          >{{ $t('tabs.stickers.title') }}</button>
          <button
            :class="['gif-button', { 'active': selectedTab === 'gifs' }]"
            type="button"
            @click="selectedTab = 'gifs'"
          >GIF</button>
        </div>
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
import FavouriteSmallIcon from '@/components/icons/comment/FavouriteSmallIcon.vue'
import TimeSmallIcon from '@/components/icons/comment/TimeSmallIcon.vue'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import StickerComponent from '@/components/ui/Comment/StickerComponent.vue'
import GifComponent from '@/components/ui/Comment/GifComponent.vue'

export default {
  components: {
    GifComponent,
    StickerComponent,
    LoupeIcon,
    TimeSmallIcon,
    FavouriteSmallIcon,
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
    stickerWindow: false,
    selectedTab: 'stickers'
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
  },
  computed: {
    currentComponent() {
      return this.selectedTab === 'stickers' ? 'StickerComponent' : 'GifComponent'
    }
  }
}
</script>

<style scoped lang="scss">
.main-sticker__window {
  position: absolute;
  right: 0;
  bottom: 65px;
  background-color: var(--color-white);
  filter: drop-shadow(10px 0px 40px rgba(108, 108, 108, 0.15));
  width: 100%;
  height: 500px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 0 16px;
  max-width: 390px;
  border-radius: 10px;
  box-shadow: 10px 0 40px 0 rgba(108, 108, 108, 0.15);

  &-header {
    display: none;
    align-items: center;
    gap: 16px;
    width: 100%;

    &-textarea {
      font-size: 14px;
      height: 40px;
      width: 100%;
      border-radius: 0;
      background: none;
      padding-left: 0;
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    background-color: var(--color-white);
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 40px;
    border-radius: 10px;

    .sticker-button,
    .gif-button {
      font-size: 14px;
      border: none;
      outline: none;
      color: var(--color-mine-shaft);
      background-color: var(--color-white);
      cursor: pointer;
    }

    .active {
      color: var(--color-white);
      background-color: var(--color-hippie-blue);
      padding: 4px 8px;
      border-radius: 6px;
    }
  }
}

.sticker__button {
  display: flex;
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

.big-clip__icon,
.big-submit__icon {
  display: flex;
}

.textarea__right--buttons--divider {
  display: flex;
  height: 14px;
  border: 1px solid var(--color-alto-second);
}

.big-clip__icon {
  color: var(--color-silver-chalice);
}

.small-clip__icon,
.small-submit__icon {
  display: none;
}

 .small-clip__header-icon {
   display: flex;
 }

@media (max-width: 576px) {
  .main-sticker__window {
    max-width: 100%;
    border-radius: 0;
    left: 0;
    bottom: 0;

    &-header {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
    }
  }

  .keyboard-button {
    padding: 0;
    display: flex;
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
