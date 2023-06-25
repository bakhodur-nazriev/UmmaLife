<template>
  <form action="" method="post" class="reply__form">
    <div class="author__avatar--section">
      <img src="../../../assets/images/reply_avatar.png" alt="">
    </div>

    <div class="reply__field--section">
      <div class="reply__author--section">
        <span class="author__name">Courtney Henry</span>
        <span class="author__time">2 ч назад</span>
      </div>

      <div class="reply__textarea--section">
        <sample-textarea
          :placeholder="`${ $t('placeholders.comment_input') }`"
          @input="adjustTextareaHeight"
          v-model="textareaValue"
          :value="textareaValue"
          class="reply__textarea"
        ></sample-textarea>

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

      <div class="reply__buttons--section">
        <div class="reply__buttons">
          <button type="button">{{ $t('buttons.favourite') }}</button>
          <button type="button" @click="answerComment">{{ $t('buttons.answer') }}</button>
        </div>

        <div class="reply__reactions">
          <div class="reply__icon"><like-icon></like-icon></div>
          <div class="reply__icon"><dislike-icon></dislike-icon></div>
          <div class="reply__icon"><love-icon></love-icon></div>
          <div class="reply__icon"><laugh-icon></laugh-icon></div>
          <div class="reply__icon"><fire-icon></fire-icon></div>
          <div class="reply__icon"><think-icon></think-icon></div>
          <div class="reply__icon"><angry-icon></angry-icon></div>
          <div class="reply__icon"><sad-icon></sad-icon></div>
          <div class="reply__icon"><scared-icon></scared-icon></div>
          <div class="reply__reactions--count--block">
            <span class="reply__reactions--count">999К</span>
          </div>
        </div>
      </div>

      <div v-if="isActiveAnswer" class="activeReplyField">
        <img src="../../../assets/images/comment_avatar.png" width="48" height="48" alt="">
        <textarea-field :reply-author-name="replyAuthorName + ', '"/>
      </div>
    </div>

    <div class="reply__detail--menu--section">
      <reply-menu-details
        :is-reply-menu-open="isReplyMenuOpen"
        @toggle-reply-menu="toggleReplyMenu"
      />
    </div>
  </form>
</template>

<script>
import SampleTextarea from '@/components/ui/fields/SampleTextarea.vue'
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
import TextareaField from '@/components/ui/fields/TextareaField.vue'

export default {
  components: {
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
      isReplyMenuOpen: false,
      isActiveAnswer: false,
      replyAuthorName: 'Courtney Henry'
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
    answerComment () {
      this.isActiveAnswer = !this.isActiveAnswer
    }
  },
  mounted () {
    this.adjustTextareaHeight()
  }
}
</script>

<style scoped>
.activeReplyField {
  display: flex;
  align-items: center;
  gap: 8px;
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
  right: 20px;
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

.reply__textarea--section {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
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
</style>
