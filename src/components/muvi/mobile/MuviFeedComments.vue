<template>
  <div class="mobile-select-model">
    <div class="mobile-select--inner" v-if="isCommentsOpen">
      <div
        class="mobile-select--block muvi__comments"
        :class="isCommentsOpen && !className ? 'opened' : 'closed'"
        v-on-click-outside="handleClose"
      >
        <div class="mobile-select--header">
          <div class="mobile-select--title">
            {{ $t('labels.comments.plural') }} <span>{{ comments.length }}</span>
          </div>
          <div class="close-form__button" @click="handleClose">
            <CloseFormIcon />
          </div>
        </div>

        <div class="comment--block">
          <div class="comment--block-inner" ref="room">
            <template v-if="comments.length > 0">
              <ShortsBlockComments
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :user="user"
                @clickReactionHandler="clickReactionHandler"
                @updateMessages="updateMessages"
                @updateComment="updateComment"
              />
            </template>
            <span class="comment-empty" v-else-if="!isLoading && comments.length === 0">{{
              $t('muvi_mobile.no_comments')
            }}</span>
          </div>
          <div class="muvi__comments--form">
            <form
              class="shorts__comments--form"
              @submit.prevent.enter="
                actionType === 'create' ? submitComment(muvi.id) : submitUpdateComment(muvi.id)
              "
            >
              <div class="form__input">
                <img :src="user.avatar" :alt="user.username" />
                <textarea
                  type="text"
                  :placeholder="$t('labels.comments.plural') + '...'"
                  v-model="commentText"
                  rows="1"
                />
              </div>
              <button class="form__btn" type="submit">
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, nextTick } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

import CloseFormIcon from '@/components/icons/comment/CloseFormIcon.vue'
import ShortsBlockComments from '@/components/ui/Shorts/ShortsBlockComments.vue'
import { getFormData } from '@/utils'
import axios from 'axios'
import SendIcon from '@/components/icons/shorts/SendIcon.vue'

const emit = defineEmits(['closeComment'])

const props = defineProps({
  isCommentsOpen: {
    type: Boolean,
    default: false
  },
  muvi: Object
})

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const comments = ref([])
const className = ref(false)
const commentText = ref('')
const passedComment = ref({})
const room = ref()
const isLoading = ref(false)

const scrollToBottom = () => {
  nextTick(() => {
    room.value?.scrollIntoView({ block: 'end', inline: 'nearest' })
  })
}
const clickReactionHandler = async (reactionPayload) => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      ...reactionPayload
    })

    await axios.post('/muvi-comments-add-reaction', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    getComments(props.muvi.id)
  } catch (err) {
    console.log(err)
  }
}
const updateComment = (comment) => {
  actionType.value = 'update'
  passedComment.value = comment
  commentText.value = comment.text
}
const updateMessages = () => getComments(props.muvi.id)

const actionType = ref('create')
const submitComment = async (video_id) => {
  if (!commentText.value) return
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id,
      text: commentText.value.trim()
    })
    commentText.value = ''
    await axios.post('/muvi-comments-add', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })

    await getComments(video_id)
    scrollToBottom()
  } catch (err) {
    console.log(err)
  }
}
const submitUpdateComment = async (video_id) => {
  if (!commentText.value) return
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      comment_id: passedComment.value.id,
      text: commentText.value.trim()
    })
    commentText.value = ''
    await axios.post('/muvi-comments-edit', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })

    await getComments(video_id)
  } catch (err) {
    console.log(err)
  } finally {
    actionType.value = 'create'
  }
}

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    emit('closeComment')
    className.value = false
  }, 100)
}
const getComments = async (video_id) => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id,
      reaction: '1'
    })
    const { data } = await axios.post('/muvi-comments', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    comments.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
getComments(props.muvi.id)
</script>

<style lang="scss">
.mobile-select-model {
  .mobile-select--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-color: var(--color-secondary);
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
  .comment--block {
    &-inner {
      padding: 0 16px 16px;
      min-height: 40dvh;
    }
    .muvi__comments--form {
      border-top: 1px solid var(--color-secondary);
    }
  }
  .comment-empty {
    color: var(--color-mine-shaft);
    font-size: 20px;
    padding-top: 50px;
    text-align: center;
    display: block;
  }
}
</style>
