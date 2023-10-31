<template>
  <div class="mobile-select-model">
    <div class="mobile-select--inner" v-if="isCommentsOpen">
      <div
        class="mobile-select--block muvi__comments"
        :class="isCommentsOpen && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="mobile-select--header">
          <div class="mobile-select--title">Comments <span>415</span></div>
          <div class="close-form__button" @click="handleClose">
            <CloseFormIcon />
          </div>
        </div>

        <div class="session__modal--block">
          <div class="muvi__comments--block" v-for="i in 5" :key="i">
            <div class="pin-section" v-if="i === 1">
              <SampleButton
                color="secondary"
                :title="`${$t('buttons.pinned_message')}`"
                size="12"
                icon="pin"
              >
                <PinIcon />
              </SampleButton>
            </div>
            <div class="author__avatar--section">
              <img src="@/assets/images/reply_avatar.png" alt="" />
            </div>
            <div class="reply__field--section">
              <div class="reply-header">
                <div class="reply__author--section">
                  <div class="author__avatar--section-small">
                    <img src="@/assets/images/reply_avatar.png" alt="" />
                  </div>
                  <span class="author__name">{{ replyAuthorName }}</span>
                  <span class="author__time">2 часа назад</span>
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
                    :value="textareaValue"
                    class="reply__textarea"
                    ref="replyTextarea"
                  />

                  <div class="reply__reactions-small" ref="replyReactions">
                    <div class="reply__icon" v-for="(reaction, i) in reactions" :key="i">
                      <component :is="reaction.icon" />
                      <span>{{ reaction.count }}</span>
                    </div>
                  </div>

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
                  <button type="button" class="reply__buttons--favourite">
                    {{ $t('buttons.favourite') }}
                  </button>
                  <button type="button" @click="answerComment" class="reply__buttons--answer">
                    <SmallCommentIcon />
                    {{ $t('buttons.answer') }}
                  </button>
                </div>

                <div class="reply__reactions" ref="replyReactions">
                  <div class="reply__icon" v-for="(reaction, i) in reactions" :key="i">
                    <component :is="reaction.icon" />
                    <span class="reply__icon--count">{{ reaction.count }}</span>
                  </div>
                </div>
                <div class="reply__reactions--count--block">
                  <span class="reply__reactions--count">999К</span>
                </div>
              </div>

              <div v-if="isActiveAnswer" class="active__reply--field">
                <img src="@/assets/images/comment_avatar.png" width="48" height="48" alt="" />

                <TextareaField :reply-author-name="replyAuthorName + ', '" />
              </div>

              <div v-if="true" class="load__more--reply-answers">
                <SampleDropDown
                  color="primary"
                  :drop-down-title="`${$t('dropdown.reply_answer')}`"
                />
              </div>
            </div>
          </div>
          <div class="muvi__comments--form">
            <CommentForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import CommentForm from '@/components/ui/Comment/CommentForm.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import PinIcon from '@/components/icons/comment/PinIcon.vue'
import ReplyMenuDetails from '@/components/ui/MenuDetails/ReplyMenuDetails.vue'
import LikeIcon from '@/components/icons/reactions/men/reply-reactions/LikeIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/reply-reactions/LoveIcon.vue'
import FireIcon from '@/components/icons/reactions/men/reply-reactions/FireIcon.vue'
import SadIcon from '@/components/icons/reactions/men/reply-reactions/SadIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/reply-reactions/DislikeIcon.vue'
import LaughIcon from '@/components/icons/reactions/men/reply-reactions/LaughIcon.vue'
import ThinkIcon from '@/components/icons/reactions/men/reply-reactions/ThinkIcon.vue'
import AngryIcon from '@/components/icons/reactions/men/reply-reactions/AngryIcon.vue'
import ScaredIcon from '@/components/icons/reactions/men/reply-reactions/ScaredIcon.vue'
import TextareaField from '@/components/ui/Fields/TextareaField.vue'
import SmallCommentIcon from '@/components/icons/comment/SmallCommentIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import TextareaClipIcon from '@/components/icons/TextareaClipIcon.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import SampleTextarea from '@/components/ui/Fields/SampleTextarea.vue'
import SampleDropDown from '@/components/ui/SampleDropDown.vue'
import CloseFormIcon from '@/components/icons/comment/CloseFormIcon.vue'

const props = defineProps({
  isCommentsOpen: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeComment'])

const className = ref(false)
const reactions = ref([
  { id: 1, icon: LikeIcon, count: 1.7 },
  { id: 2, icon: DislikeIcon, count: 123 },
  { id: 3, icon: LoveIcon, count: 354 },
  { id: 4, icon: LaughIcon, count: 2.5 },
  { id: 5, icon: FireIcon, count: 867 },
  { id: 6, icon: ThinkIcon, count: 52 },
  { id: 7, icon: AngryIcon, count: 96 },
  { id: 8, icon: SadIcon, count: 78 },
  { id: 8, icon: ScaredIcon, count: 125 }
])
const replyTextarea = ref()
const textareaValue = ref(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda blanditiis corporis deserunt doloribus ea eaque eos esse eveniet exercitationem, fuga iure laudantium libero maiores maxime natus nemo nostrum optio perferendis porro quas, qui, quia quod rerum saepe soluta sunt tenetur? Ab aut, dignissimos dolores esse excepturi expedita facilis fuga iusto modi nesciunt possimus quasi quos reiciendis.'
)

const isReplyMenuOpen = ref(false)
const replyAuthorName = ref('Courtney Henry')
const isActiveAnswer = ref(false)

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    emit('closeComment')
    className.value = false
  }, 100)
}

const adjustTextareaHeight = () => {
  const textarea = replyTextarea.value

  if (textarea.value.trim() !== '') {
    textareaValue.value = textarea.value
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  } else {
    textareaValue.value = ''
    textarea.style.height = '48px'
  }
}
const toggleReplyMenu = () => {
  isReplyMenuOpen.value = !isReplyMenuOpen.value
}

const answerComment = () => {
  isActiveAnswer.value = !isActiveAnswer.value
}
</script>

<style lang="scss">
.mobile-select-model {
  .mobile-select--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mobile-select--inner {
    position: absolute;
  }
  .muvi__comments {
    max-height: 80dvh;
  }
  .mobile-select--title {
    display: flex;
    gap: 8px;
    align-items: center;
    span {
      color: var(--color-secondary);
    }
  }
  .muvi__comments--block {
    padding: 20px 16px;
  }
  .pin-section {
    margin-bottom: 8px;
  }
  .muvi__comments--form {
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-white);
  }
}
</style>
