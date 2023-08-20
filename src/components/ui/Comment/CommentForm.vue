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

        <div class="stickers-block">
          <div class="stickers-filter">
            <TimeSmallIcon />
            <FavouriteSmallIcon />
          </div>

          <ul class="stickers-pack__item">
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
          </ul>
        </div>

        <SampleDivider />

        <div class="main__search--block">
          <LoupeIcon class="search__icon" />
          <input class="base__search--input" :placeholder="$t('placeholders.search_input')" />
        </div>

        <div class="popular-stickers__section">
          <p>{{ $t('labels.stickers.popular_stickers') }}</p>
        </div>

        <div class="">
          <ul class="popular-stickers__pack">
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
          </ul>
        </div>

        <div class="featured-stickers__section">
          <p>{{ $t('labels.stickers.featured_stickers') }}</p>
        </div>

        <div class="">
          <ul class="featured-stickers__pack">
            <li><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
            <li><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
          </ul>
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

export default {
  components: {
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
    stickerWindow: true
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
  background-color: var(--color-white);
  filter: drop-shadow(10px 0px 40px rgba(108, 108, 108, 0.15));
  width: 100%;
  height: 500px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 0 16px;

  &-header {
    display: flex;
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
  .popular-stickers__pack {
    list-style: none;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    li {
      width: 28px;
      height: 28px;
      img {
        border-radius: 2px;
      }
    }
  }

  .featured-stickers__pack {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      width: 62px;
      height: 62px;
    }
  }

  .base__search--input {
    border-radius: 10px;
    background-color: var(--color-seashell);
    color: var(--color-mine-shaft);
    border: none;
    outline: none;
    font-size: 14px;
    padding: 12px 12px 12px 48px;
    width: 100%;

    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }

  .main__search--block {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .search__icon {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      display: flex;
    }
  }

  .popular-stickers__section,
  .featured-stickers__section {
    width: 100%;
    display: flex;
    justify-content: center;

    p {
      font-size: 14px;
      color: var(--color-secondary);
      margin-bottom: 12px;
      margin-top: 20px;
    }
  }

  .keyboard-button {
    padding: 0;
    display: flex;
  }

  .stickers-block {
    display: flex;
    gap: 16px;
    align-items: center;

    .stickers-filter {
      display: flex;
      gap: 12px;
    }

    .stickers-pack__item {
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;

      li {
        display: flex;
        width: 28px;
        height: 28px;
        cursor: pointer;

        img {
          border-radius: 2px;
        }
      }
    }

    .main__search--block {
      width: 100%;
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
