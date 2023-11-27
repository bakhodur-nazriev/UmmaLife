<template>
  <div class="comments reply__comments" v-on-click-outside="() => (isReplyMenuOpen = false)">
    <div class="comments__top">
      <UserInfo
        :username="comment.publisher.username"
        :avatar="comment.publisher.avatar"
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
      <div class="comments__top--menu">
        <MuviReplyMenuDetails
          :is-reply-menu-open="isReplyMenuOpen"
          :vertical="true"
          :owner="comment?.owner"
          @toggle-reply-menu="toggleReplyMenu"
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
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { timeFormat } from '@/mixins/timeFormat.js'
import { getFormData } from '@/utils'
import axios from 'axios'

import HeartIcon from '@/components/icons/HeartIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import MuviReplyMenuDetails from '@/components/ui/MenuDetails/MuviReplyMenuDetails.vue'
import ShortsLeaveReaction from '@/components/ui/Shorts/ShortsLeaveReaction.vue'
import ShortsCommentReactions from '@/components/ui/Shorts/ShortsCommentReactions.vue'

const props = defineProps({
  comment: Object,
  user: Object
})

const emit = defineEmits([
  'clickReactionHandler',
  'updateReplyMessages',
  'updateReplyComment',
  'reportReplyComment'
])

const isReplyMenuOpen = ref(false)
const isReactionWindowOpen = ref(false)

const toggleReplyMenu = () => {
  isReplyMenuOpen.value = !isReplyMenuOpen.value
}

const clickReactionHandler = (code) => {
  emit('clickReactionHandler', { reaction: code, reply_id: props.comment.id })
}

const unlikeHandler = (comment) => {
  emit('clickReactionHandler', { reaction: comment?.reaction?.type, reply_id: comment.id })
}

const deleteComment = async () => {
  isReplyMenuOpen.value = false
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      reply_id: props.comment?.id
    })

    await axios.post('/muvi-comments-reply-delete', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    emit('updateReplyMessages')
  } catch (err) {
    console.log(err)
  } finally {
  }
}

const updateComment = () => {
  isReplyMenuOpen.value = false
  emit('updateReplyComment', props.comment)
}

const reportComment = async () => {
  emit('reportReplyComment')
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      reply_id: props.comment?.id
    })

    await axios.post('/muvi-comments-reply-report', payload, {
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
</script>

<script>
export default {
  mixins: [timeFormat]
}
</script>

<style lang="scss" scoped>
.reply__comments {
  width: calc(100% - 52px);
  margin-left: auto;
  @media (max-width: 767px) {
    width: calc(100% - 16px);
  }
}
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
