<template>
  <form
    action=""
    method="post"
    class="reply__form"
    v-for="(comment ,i) in postComments"
    :key="i"
  >
    <div class="comment-header__small">
      <div class="horizontal-line"></div>
      <div class="comment-header__section">
        <div class="comment-header__label">
          <span class="label">{{ $t('labels.comments.plural') }}</span>
          <span class="count">417</span>
        </div>
        <div class="comment-header__right-buttons">
          <div class="filter-form__button" @click="toggleFilter">
            <CommentFilter :is-filter-window-open="isFilterOpen"/>
          </div>
          <div class="close-form__button" @click="closeCommentWindow">
            <CloseFormIcon/>
          </div>
        </div>
      </div>
    </div>

    <SampleDivider class="divider"/>

    <div class="pin-section">
      <SampleButton
        color="secondary"
        :title="`${$t('buttons.pinned_message')}`"
        :size="12"
        icon="pin"
      >
        <PinIcon/>
      </SampleButton>
    </div>

    <div class="author__avatar--section">
      <img :src="comment.publisher.avatar" alt=""/>
    </div>
    <div class="reply__field--section">
      <div class="reply-header">
        <div class="reply__author--section">
          <div class="author__avatar--section-small">
            <img :src="comment.publisher.avatar" alt=""/>
          </div>
          <span class="author__name">{{ comment.publisher.name }}</span>
          <span class="author__time">{{ multiFormatDateString(comment.time_formatted) }}</span>
        </div>

        <div class="reply__detail--menu--section-small">
          <ReplyMenuDetails
            :is-reply-menu-open="isReplyMenuOpen"
            @toggle-reply-menu="toggleReplyMenu"
          />
        </div>
      </div>

      <div class="reply__textarea--and--button--section">
        <div class="reply__textarea--block">
          <SampleTextarea
            :placeholder="`${$t('placeholders.comment_input')}`"
            @input="adjustTextareaHeight"
            v-model="textareaValue"
            :value="comment.text"
            class="reply__textarea"
            ref="replyTextarea"
          />

          <div class="reply__reactions-small" ref="replyReactions">
            <div class="reply__icon" v-for="(reaction, i) in reactions" :key="i">
              <component :is="reaction.icon"/>
              <span>{{ reaction.count }}</span>
            </div>
          </div>

          <div class="textarea__right--buttons">
            <FileUpload class="attach__file" label="file">
              <TextareaClipIcon/>
            </FileUpload>
            <SampleDivider class="textarea__right--buttons--divider"/>
            <button class="send__button" type="button">
              <SendIcon/>
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
          <button type="button" class="reply__buttons--favourite">
            {{ $t('buttons.favourite') }}
          </button>
          <button type="button" @click="answerComment" class="reply__buttons--answer">
            <SmallCommentIcon/>
            {{ $t('buttons.answer') }}
          </button>
        </div>
        <div class="reply__reactions" ref="replyReactions">
          <div class="reply__icon" v-for="(reaction, i) in reactions" :key="i">
            <component :is="reaction.icon"/>
            <span class="reply__icon--count">{{ reaction.count }}</span>
          </div>

          <div class="reply__reactions-block">
            <span class="reply__reactions--count">999К</span>
          </div>
        </div>
      </div>

      <div v-if="isActiveAnswer" class="active__reply--field">
        <img :src="postComments[0].publisher.avatar" alt=""/>

        <TextareaField :reply-author-name="postComments[0].publisher.name + ', '"/>
      </div>

      <div class="load__more--reply-answers">
        <SampleDropDown color="primary" :drop-down-title="`${$t('dropdown.reply_answer')}`"/>
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
import PinIcon from '@/components/icons/comment/PinIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import SmallCommentIcon from '@/components/icons/comment/SmallCommentIcon.vue'
import {timeFormat} from '@/mixins/timeFormat'
import UserInfo from "@/components/ui/UserInfo.vue";

export default {
  mixins: [timeFormat],
  components: {
    UserInfo,
    SmallCommentIcon,
    SampleButton,
    PinIcon,
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
  props: {
    postComments: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textareaValue: '',
      isReplyMenuOpen: false,
      isActiveAnswer: false,
      isActiveInsideAnswer: false,
      isFilterOpen: false,
      reactions: [
        {id: 1, icon: 'LikeIcon', count: 1.7},
        {id: 2, icon: 'DislikeIcon', count: 123},
        {id: 3, icon: 'LoveIcon', count: 354},
        {id: 4, icon: 'LaughIcon', count: 2.5},
        {id: 5, icon: 'FireIcon', count: 867},
        {id: 6, icon: 'ThinkIcon', count: 52},
        {id: 7, icon: 'AngryIcon', count: 96},
        {id: 8, icon: 'SadIcon', count: 78},
        {id: 8, icon: 'ScaredIcon', count: 125}
      ]
    }
  },
  methods: {
    adjustTextareaHeight() {
      const textarea = this.$el.querySelector('.reply__textarea');
      if (textarea) {
        if (textarea.value.trim() !== '') {
          this.textareaValue = textarea.value;
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        } else {
          this.textareaValue = '';
          textarea.style.height = '48px';
        }
      }
    },
    toggleReplyMenu() {
      this.isReplyMenuOpen = !this.isReplyMenuOpen
    },
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen
    },
    answerComment() {
      this.isActiveAnswer = !this.isActiveAnswer
    },
    closeCommentWindow() {
      this.$emit('close-comment-window', false)
    },
    answerInsideComment() {
      this.isActiveInsideAnswer = !this.isActiveInsideAnswer
    }
  },
  mounted() {
    this.$nextTick(() => {
      const textarea = this.$refs.replyTextarea;
      if (textarea && textarea.$el) {
        textarea.$el.addEventListener('input', this.adjustTextareaHeight);
      }
    });
  }
}
</script>

<style lang="scss">
.horizontal-line {
  background-color: #9d9d9d;
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
  padding-left: 0;
}

.active__reply--field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
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

.textarea__right--buttons--divider {
  height: 14px;
  border: 1px solid var(--color-alto-second);
}

.author__avatar--section {
  display: flex;

  img {
    width: 48px;
    max-height: 48px;
    border-radius: 50%;
  }
}

.author__avatar--section-small {
  display: none;
}

.textarea__right--buttons {
  position: absolute;
  right: 62px;
  bottom: 9px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.reply__form {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  &:first-child {
    align-self: flex-start;
  }
}

.reply__field--section {
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 4px;
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

  &--count {
    display: none;
  }
}

.reply__textarea {
  min-height: 48px;
  max-height: 120px;
  width: 100%;
  font-size: 16px;
  padding: 0 125px 0 15px;
  resize: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: var(--color-silver-chalice);
}

.author__name {
  color: var(--color-mine-shaft);
}

.reply__buttons {
  display: flex;
  gap: 16px;

  &--section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 93%;
    padding-right: 10px;
  }

  button {
    border: none;
    background: none;
    color: var(--color-gray);
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    height: fit-content;
  }
}

.reply__reactions {
  display: flex;
  gap: 4px;
}

.close-form__button {
  cursor: pointer;

  svg {
    transform: scale(1.2);
    color: var(--color-mine-shaft);
  }
}

.divider {
  display: none;
}

.reply__author--section {
  display: flex;
  gap: 8px;
  align-items: center;
}

.reply__buttons--section {
  position: relative;
  padding-left: 0;
}

.reply__detail--menu--section-small {
  display: none;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pin-section {
  display: none;
}

.reply__reactions-small {
  display: none;
}

.reply__buttons--favourite {
  display: block;
}

.reply__buttons--answer {
  display: flex;
  align-items: center;

  svg {
    display: none;
  }
}

@media (max-width: 576px) {
  .reply__buttons--answer {
    gap: 4px;

    svg {
      display: block;
    }
  }

  .pin-section {
    display: flex;
    font-size: 12px;
    width: 100%;
    cursor: pointer;

    button {
      all: unset;
      background-color: var(--color-seashell);
      padding: 4px 12px 4px 8px;
      border-radius: 8px;
      display: flex;

      .btn__icon {
        margin-right: 4px;
      }
    }
  }

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
    padding: 0 14px 14px;
    align-items: center;
  }

  .reply__textarea--and--button--section {
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 4px;
    padding-left: 42px;

    .author__section {
      order: 1;
    }
  }

  .reply__field--section {
    display: flex;
  }

  .author__avatar--section-small {
    display: flex;

    img {
      width: 40px;
      max-height: 40px;
    }
  }

  .textarea__right--buttons {
    display: none;
  }

  .reply__textarea {
    padding: 15px;
  }

  .divider {
    display: flex;
  }

  .author__section {
    display: flex;
    align-items: center;
    gap: 8px;

    .author__name--section {
      display: flex;
      align-items: center;
      gap: 4px;

      .author__name {
        font-size: 16px;
      }

      .author__time {
        font-size: 14px;
      }
    }
  }

  .author__avatar--section {
    display: none;
  }

  // .reply__reactions {
  //   display: none;
  //   position: absolute;
  //   bottom: 35px;
  //   left: 56px;
  // }

  .reply__detail--menu--section {
    display: none;
  }

  .reply__detail--menu--section-small {
    display: flex;
  }

  .reply__textarea--block {
    background-color: var(--color-seashell);
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    .reply__reactions-small {
      padding: 0 15px 15px;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
  }

  .reply__buttons--section {
    padding-left: 42px;
    margin-top: 8px;
  }

  .load__more--reply-answers {
    padding-left: 42px;
  }

  .reply__buttons--favourite {
    display: none;
  }
}

@media (min-width: 768px) {
  .comment-header__small {
    display: none;
  }
}

.book__comment {
  .comment-header__small {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .reply__form {
    @media (max-width: 576px) {
      padding: 0;
      .sample__divider {
        display: none;
      }
    }
  }
}
</style>
