<template>
  <form action="" method="post" class="reply__form">
    <div class="reply__author--section">
      <img src="../../../assets/images/reply_avatar.png" alt="">
      <div class="reply__author--name">
        <span class="author__name">Courtney Henry</span>
        <span class="author__time">2 ч назад</span>
      </div>
    </div>

    <div>
      <div class="reply__textarea--section">
        <div class="reply__textarea--and--menu">
          <sample-textarea :placeholder="`${ $t('placeholders.comment_input') }`" @input="adjustTextareaHeight" class="reply__textarea"/>
          <sample-menu-details-button :is-menu-open="isMenuOpen" />
        </div>

        <div class="reply__buttons--section">
          <div class="reply__buttons">
            <button type="button">{{ $t('buttons.favourite') }}</button>
            <button type="button">{{ $t('buttons.answer') }}</button>
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
            <div><span class="reply__reactions--count">999К</span></div>
          </div>
        </div>
      </div>
    </div>
  </form>

</template>

<script>
import SampleTextarea from '@/components/ui/SampleTextarea.vue'
import SampleMenuDetailsButton from '@/components/ui/SampleMenuDetailsButton.vue'
import LikeIcon from '@/components/icons/reactions/men/reply-reactions/LikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/reply-reactions/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/reply-reactions/FireIcon.vue'
import SadIcon from '@/components/icons/reactions/men/reply-reactions/SadIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/reply-reactions/DislikeIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/reply-reactions/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/reply-reactions/ThinkIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/reply-reactions/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/reply-reactions/ScaredIcon.vue'

export default {
  components: {
    ScaredIcon,
    AngryIcon,
    ThinkIcon,
    LaughIcon,
    DislikeIcon,
    SadIcon,
    FireIcon,
    LoveIcon,
    LikeIcon,
    SampleMenuDetailsButton,
    SampleTextarea
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    adjustTextareaHeight () {
      const textarea = this.$el.querySelector('.reply__textarea')
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
.reply__reactions--count {
  color: var(--color-text);
}

.reply__icon {
  display: flex;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-gray-3);
  padding: 5px;
  cursor: pointer;
}

.reply__textarea {
  height: 48px;
  width: 100%;
  font-size: 16px;
  padding: 15px 110px 15px 15px;
  resize: none;
  overflow: hidden;
}

.reply__textarea--and--menu {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.reply__textarea--section {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.reply__textarea {
  width: 90%;
  margin-right: 18px;
}

.reply__form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.reply__author--section {
  display: flex;
}

.reply__author--name span {
  margin: 0 4px;
}

.author__time {
  color: var(--color-text)
}

.reply__buttons--section {
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.reply__buttons {
  display: flex;
  gap: 16px;
}

.reply__buttons button {
  border: none;
  background: none;
  color: var(--color-gray-4);
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.reply__reactions {
  display: flex;
  gap: 2px;
  padding-right: 8px;
}
</style>
