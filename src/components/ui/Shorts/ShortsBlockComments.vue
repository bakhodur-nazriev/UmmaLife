<template v-on-click-outside="() => (isReplyFormOpen = false)">
  <div class="comments">
    <div class="comments__top">
      <UserInfo
        :username="`${comment?.publisher?.first_name} ${comment?.publisher?.last_name}`"
        :avatar="comment?.publisher?.avatar"
        :status="{
          is_investor: comment?.publisher?.isInvestor || false,
          verified: comment?.publisher?.verified || '0',
          is_premium: comment?.publisher?.is_premium || '0'
        }"
      >
        <template #time>
          <div class="comments__top--time">
            {{ multiFormatDateString(comment.time_formatted) }}
          </div>
        </template>
      </UserInfo>
      <div class="comments__top--menu" v-on-click-outside="() => (isReplyMenuOpen = false)">
        <MuviReplyMenuDetails
          :is-reply-menu-open="isReplyMenuOpen"
          @toggle-reply-menu="toggleReplyMenu"
          :vertical="true"
          :owner="comment?.owner"
          @updateComment="updateComment"
          @deleteComment="deleteComment"
          @reportComment="reportComment"
        />
      </div>
    </div>
    <div class="comments__text">{{ comment.text }}</div>
    <ShortsCommentReactions :comment="comment" @unlikeHandler="unlikeHandler" />
    <div class="comments__bottom">
      <div class="comments__bottom--wrapper">
        <div
          class="comments__bottom--reply"
          @click="isReactionWindowOpen = !isReactionWindowOpen"
          v-on-click-outside="() => (isReactionWindowOpen = false)"
        >
          <HeartIcon />
          <span>{{ $t('muvi.like') }}</span>
          <ShortsLeaveReaction
            v-if="isReactionWindowOpen"
            :user="user"
            @clickReaction="clickReactionHandler"
          />
        </div>
        <div class="comments__bottom--reply" @click="replyHandler(comment)">
          <ReplyIcon />
          <span>{{ $t('muvi.reply') }}</span>
        </div>
      </div>
      <div
        class="comments__bottom--more"
        v-if="comment.replies_count > 0"
        @click="replyClickHandler"
      >
        {{
          isReplyOpen
            ? $t('muvi.hide_reply')
            : `${$t('muvi.view_reply')} (${comment.replies_count})`
        }}
      </div>
    </div>
    <div v-if="replyComments.length > 0 && isReplyOpen">
      <ShortsBlockReplys
        v-for="repyComment in replyComments"
        :key="repyComment.id"
        :comment="repyComment"
        :user="user"
        @clickReactionHandler="clickReplyReactionHandler"
        @unlikeHandler="clickReplyReactionHandler"
        @updateReplyMessages="updateReplyMessages"
        @updateReplyComment="updateReplyComment"
        @reportReplyComment="reportReplyComment"
      />
    </div>
    <form
      class="shorts__comments--form reply__comment"
      v-if="isReplyFormOpen"
      @submit.prevent.enter="submitReplyHandler"
    >
      <div class="form__input">
        <img :src="user.avatar" :alt="user.username" />
        <div class="reply__comment--textarea">
          <textarea
            type="text"
            :placeholder="$t('labels.comments.plural') + '...'"
            v-model="replyCommentText"
            rows="1"
            ref="replyFormRef"
          />
        </div>
      </div>
      <button class="form__btn" type="submit">
        <SendIcon />
      </button>
    </form>
  </div>
  <teleport to="body">
    <CommentReportModal v-if="isReportModalOpen" @modalClose="isReportModalOpen = false" />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import { ref, nextTick } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { timeFormat } from '@/mixins/timeFormat.js'
import { sleep, getFormData } from '@/utils'
import axios from 'axios'

import ReplyIcon from '@/components/icons/shorts/ReplyIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import MuviReplyMenuDetails from '@/components/ui/MenuDetails/MuviReplyMenuDetails.vue'
import ShortsLeaveReaction from '@/components/ui/Shorts/ShortsLeaveReaction.vue'
import ShortsCommentReactions from '@/components/ui/Shorts/ShortsCommentReactions.vue'
import ShortsBlockReplys from '@/components/ui/Shorts/ShortsBlockReplys.vue'
import SendIcon from '@/components/icons/shorts/SendIcon.vue'
import CommentReportModal from '@/components/ui/modals/CommentReportModal.vue'

const props = defineProps({
  comment: Object,
  user: Object
})

const emit = defineEmits(['clickReactionHandler', 'updateMessages', 'updateComment'])

const isReplyMenuOpen = ref(false)
const isReactionWindowOpen = ref(false)
const replyCommentText = ref('')
const isReplyFormOpen = ref(false)
const replyFormRef = ref(null)
const replyComments = ref([])
const isReplyOpen = ref(false)
const actionType = ref('create')
const replyComment = ref({})
const isReportModalOpen = ref(false)

const replyClickHandler = () => {
  isReplyOpen.value = !isReplyOpen.value
  isReplyFormOpen.value = false
}

const toggleReplyMenu = () => {
  isReplyMenuOpen.value = !isReplyMenuOpen.value
}

const clickReactionHandler = (code) => {
  emit('clickReactionHandler', { reaction: code, comment_id: props.comment.id })
  isReplyMenuOpen.value = false
}

const unlikeHandler = (comment) => {
  emit('clickReactionHandler', { reaction: comment?.reaction?.type, comment_id: comment.id })
}

const replyHandler = async (comment) => {
  isReplyFormOpen.value = !isReplyFormOpen.value
  isReplyOpen.value = false
  if (isReplyFormOpen.value) {
    replyCommentText.value = `${comment?.publisher?.username}, `
    await sleep(0)
    replyFormRef.value?.focus()
  } else {
    replyCommentText.value = ''
    replyFormRef.value = null
  }
}

const getReplyComments = async (action) => {
  if (props.comment.replies_count === 0 && action !== 'pass') return
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      comment_id: props.comment?.id
    })

    const { data } = await axios.post('/muvi-comments-replies', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    replyComments.value = data.data
  } catch (err) {
    console.log(err)
  }
}

const submitReplyHandler = async () => {
  if (!replyCommentText.value) return
  try {
    let payload
    if (actionType.value === 'create') {
      payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        comment_id: props.comment?.id,
        text: replyCommentText.value.trim()
      })
    } else {
      payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        reply_id: replyComment.value?.id,
        text: replyCommentText.value.trim()
      })
    }

    await axios.post(
      actionType.value === 'create' ? '/muvi-comments-reply-add' : '/muvi-comments-reply-edit',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          access_token: localStorage.getItem('access_token')
        }
      }
    )

    emit('updateMessages')
  } catch (err) {
    console.log(err)
  } finally {
    nextTick(async () => {
      await getReplyComments('pass')
      isReplyOpen.value = true
      isReplyFormOpen.value = false
      actionType.value = 'create'
    })
  }
}

const clickReplyReactionHandler = async (reactionPayload) => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      ...reactionPayload
    })

    await axios.post('/muvi-comments-reply-add-reaction', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    await getReplyComments()
  } catch (err) {
    console.log(err)
  }
}

const deleteComment = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      comment_id: props.comment?.id
    })

    await axios.post('/muvi-comments-delete', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    emit('updateMessages')
  } catch (err) {
    console.log(err)
  } finally {
    nextTick(async () => {
      await getReplyComments('pass')
      isReplyFormOpen.value = false
    })
  }
}

const updateComment = async () => {
  emit('updateComment', props.comment)
  isReplyMenuOpen.value = false
}

const updateReplyMessages = () => {
  getReplyComments('pass')
  emit('updateMessages')
}

const updateReplyComment = (comment) => {
  isReplyFormOpen.value = true
  isReplyMenuOpen.value = false
  replyCommentText.value = comment?.text
  actionType.value = 'edit'
  replyComment.value = comment
}

const reportComment = async () => {
  try {
    isReportModalOpen.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      comment_id: props.comment?.id
    })

    await axios.post('/muvi-comments-report', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const reportReplyComment = () => {
  isReportModalOpen.value = true
}
getReplyComments()
</script>

<script>
export default {
  mixins: [timeFormat]
}
</script>

<style lang="scss" scoped>
.comments {
  padding: 10px 0;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    &--user {
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &--name {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 4px;
    }
    &--time {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &--menu {
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-mine-shaft);
    margin-bottom: 8px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    gap: 20px;
    &--wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    &--reply {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: var(--color-secondary);
      position: relative;
      svg {
        width: 16px;
        height: 16px;
        display: block;
      }
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
      }
    }
    &--more {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      color: var(--color-green);
      line-height: normal;
      cursor: pointer;
    }
  }
}
.reply__comment {
  padding: 8px;
  border-radius: 10px;
  background-color: var(--color-seashell);
  margin-top: 12px;
  &--textarea {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>
