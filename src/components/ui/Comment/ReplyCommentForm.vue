<template>
  <form action="" method="post" class="reply__form">
    <div class="comment-header__small">
      <div class="horizontal-line"></div>
      <div class="comment-header__section">
        <div class="comment-header__label">
          <span class="label">{{ $t('labels.comments.plural') }}</span>
          <span class="count">417</span>
        </div>
        <div class="comment-header__right-buttons">
          <div class="filter-form__button" @click="toggleFilter">
            <CommentFilter
              :is-filter-window-open="isFilterOpen"
            />
          </div>
          <div class="close-form__button" @click="closeCommentWindow">
            <CloseFormIcon />
          </div>
        </div>
      </div>
    </div>
    <SampleDivider />
    <div class="author__avatar--section">
      <img src="@/assets/images/reply_avatar.png" alt="">
    </div>
    <div class="reply__field--section">
      <div class="reply__author--section">
        <span class="author__name">{{ replyAuthorName }}</span>
        <span class="author__time">2 часа назад</span>
      </div>

      <div class="reply__textarea--and--button--section">
        <div class="reply__textarea--block">
          <SampleTextarea
            :placeholder="`${ $t('placeholders.comment_input') }`"
            @input="adjustTextareaHeight"
            v-model="textareaValue"
            :value="textareaValue"
            class="reply__textarea"
          />

          <div class="textarea__right--buttons">
            <FileUpload class="attach__file" label="file">
              <TextareaClipIcon />
            </FileUpload>
            <SampleDivider class="textarea__right--buttons--divider" />
            <button class="send__button" type="button">
              <SendIcon />
            </button>
          </div>
        </div>

        <div class="reply__detail--menu--section">
          <ReplyMenuDetails
            :is-reply-menu-open="isReplyMenuOpen"
            @toggle-reply-menu="toggleReplyMenu"
          />
        </div>
      </div>

      <div class="reply__buttons--section">
        <div class="reply__buttons">
          <button type="button">{{ $t('buttons.favourite') }}</button>
          <button type="button" @click="answerComment">{{ $t('buttons.answer') }}</button>
        </div>

        <div class="reply__reactions">
          <div class="reply__icon">
            <LikeIcon />
          </div>
          <div class="reply__icon">
            <DislikeIcon />
          </div>
          <div class="reply__icon">
            <LoveIcon />
          </div>
          <div class="reply__icon">
            <LaughIcon />
          </div>
          <div class="reply__icon">
            <FireIcon />
          </div>
          <div class="reply__icon">
            <ThinkIcon />
          </div>
          <div class="reply__icon">
            <AngryIcon />
          </div>
          <div class="reply__icon">
            <SadIcon />
          </div>
          <div class="reply__icon">
            <ScaredIcon />
          </div>
          <div class="reply__reactions--count--block">
            <span class="reply__reactions--count">999К</span>
          </div>
        </div>
      </div>

      <div v-if="isActiveAnswer" class="active__reply--field">
        <img src="@/assets/images/comment_avatar.png" width="48" height="48" alt="">

        <TextareaField :reply-author-name="replyAuthorName + ', '"/>
      </div>

      <div v-if="true" class="load__more--reply-answers">
        <SampleDropDown
          :color="parentColor"
          :drop-down-title="`${ $t('dropdown.reply_answer') }`"
        />
      </div>
    </div>
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/Fields/SampleTextarea.vue'
import LikeIcon from '@/components/icons/reactions/men/reply-reactions/LikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/reply-reactions/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/reply-reactions/FireIcon.vue'
import SadIcon from '@/components/icons/reactions/men/reply-reactions/SadIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/reply-reactions/DislikeIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/reply-reactions/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/reply-reactions/ThinkIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/reply-reactions/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/reply-reactions/ScaredIcon.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import TextareaClipIcon from '@/components/icons/TextareaClipIcon.vue'
import SendIcon from '@/components/icons/SendIcon.vue'
import ReplyMenuDetails from '@/components/ui/MenuDetails/ReplyMenuDetails.vue'
import TextareaField from '@/components/ui/Fields/TextareaField.vue'
import SampleDropDown from '@/components/ui/SampleDropDown.vue'
import CloseFormIcon from '@/components/icons/comment/CloseFormIcon.vue'
import CommentFilter from '@/components/ui/MenuDetails/CommentFilter.vue'

export default {
  components: {
    CommentFilter,
    CloseFormIcon,
    SampleDropDown,
    TextareaField,
    ReplyMenuDetails,
    SendIcon,
    TextareaClipIcon,
    SampleDivider,
    FileUpload,
    ScaredIcon,
    AngryIcon,
    ThinkIcon,
    LaughIcon,
    DislikeIcon,
    SadIcon,
    FireIcon,
    LoveIcon,
    LikeIcon,
    SampleTextarea
  },
  data () {
    return {
      textareaValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda blanditiis corporis deserunt doloribus ea eaque eos esse eveniet exercitationem, fuga iure laudantium libero maiores maxime natus nemo nostrum optio perferendis porro quas, qui, quia quod rerum saepe soluta sunt tenetur? Ab aut, dignissimos dolores esse excepturi expedita facilis fuga iusto modi nesciunt possimus quasi quos reiciendis.',
      textareaInsideValue: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, possimus!',
      isReplyMenuOpen: false,
      isActiveAnswer: false,
      isActiveInsideAnswer: false,
      replyAuthorName: 'Courtney Henry',
      parentColor: '#818181',
      isFilterOpen: false
    }
  },
  methods: {
    adjustTextareaHeight () {
      const textarea = this.$el.querySelector('.reply__textarea')

      if (textarea.value.trim() !== '') {
        this.textareaValue = textarea.value
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      } else {
        this.textareaValue = ''
        textarea.style.height = '48px'
      }
    },
    toggleReplyMenu () {
      this.isReplyMenuOpen = !this.isReplyMenuOpen
    },
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen
    },
    answerComment () {
      this.isActiveAnswer = !this.isActiveAnswer
    },
    closeCommentWindow() {
      console.log('closed')
    }
  },
  mounted () {
    this.adjustTextareaHeight()
  }
}
</script>

<style scoped lang="scss">
.horizontal-line {
  background-color: #9D9D9D;
  height: 2px;
  border-radius: 50px;
  width: 28px;
}

.reply__textarea--block {
  display: flex;
  align-items: center;
  width: 100%;
}

.load__more--reply-answers {
  margin: 12px 0;
}

.active__reply--field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0;
}

.send__button,
.attach__file {
  border: none;
  cursor: pointer;
  background: none;
  display: flex;
  padding: 0;
}
.textarea__right--buttons--divider {
  height: 14px;
  border: 1px solid var(--color-alto-second);
}
.author__avatar--section img {
  width: 40px;
  max-height: 40px;
}
.textarea__right--buttons {
  position: absolute;
  right: 62px;
  bottom: 9px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.reply__author--section .author__name {
  margin-right: 8px;
}
.reply__form {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}
.reply__form > :first-child {
  align-self: flex-start;
}
.reply__field--section {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 4px;
}
.reply__reactions--count--block {
  margin-left: 2px;
}
.reply__reactions--count {
  color: var(--color-silver-chalice);
}
.reply__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-gallery-second);
  padding: 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}
.reply__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 125px 15px 15px;
  resize: none;
  overflow: hidden;
}
.reply__textarea--and--button--section {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.reply__author--name span {
  margin: 0 4px;
}

.author__time {
  color: var(--color-silver-chalice)
}

.reply__buttons--section {
  display: flex;
  justify-content: space-between;
  width: 93%;
}

.reply__buttons {
  display: flex;
  gap: 16px;
}

.reply__buttons button {
  border: none;
  background: none;
  color: var(--color-gray);
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.reply__reactions {
  display: flex;
  gap: 4px;
}

.close-form__button {
  svg {
    transform: scale(1.2);
    color: var(--color-mine-shaft);
  }
}

@media (max-width: 576px) {
  .comment-header {
    &__small {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 8px;
      row-gap: 16px;
    }

    &__label {
      display: flex;
      gap: 8px;

      .label {
        color: var(--color-mine-shaft);
        font-weight: 500;
      }

      .count {
        color: #9d9d9d;
      }
    }

    &__section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    &__right-buttons {
      display: flex;
      height: 100%;
      gap: 20px;

      .close-form__button,
      .filter-form__button {
        display: flex;
      }
    }
  }

  .reply__form {
    flex-direction: column;
  }

  .reply__textarea--and--button--section {
    flex-direction: column-reverse;
  }

  .reply__field--section {
    display: block;
  }

  .author__avatar--section {
    display: none;
  }
}

@media (min-width: 768px) {
  .comment-header__small {
    display: none;
  }
}
</style>
