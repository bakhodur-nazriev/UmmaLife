<template>
  <div class="shorts__content">
    <div class="shorts__content--top">
      <div class="shorts__user--wrapper">
        <UserInfo
          :avatar="muvi.publisher.avatar"
          :username="`${muvi?.publisher?.first_name} ${muvi?.publisher?.last_name}`"
          :status="{
            is_investor: muvi?.publisher?.isInvestor || false,
            verified: muvi?.publisher?.verified || '0',
            is_premium: muvi?.publisher?.is_premium || '0'
          }"
        />
        <SampleMenuDetailsButton
          :is-menu-open="isMenuOpen"
          :muvi="muvi"
          v-on-click-outside="() => (isMenuOpen = false)"
          @toggle-menu="isMenuOpen = !isMenuOpen"
          @reported="isReportModalOpen = true"
          @commentStatus="commentStatus"
          @setPrivacyType="setPrivacyType"
          @deleteHandler="deleteShortVideo"
          @editHandle="isEditOpen = true"
        />
      </div>
      <template v-if="!isEditOpen">
        <div
          class="shorts__info--text"
          v-if="
            Object.keys(singleMuvi).length > 0 &&
            extractHashtagsAndText(singleMuvi?.description).textWithoutHashtags.length > 0
          "
        >
          {{ extractHashtagsAndText(singleMuvi?.description).textWithoutHashtags }}
        </div>
        <div
          class="shorts__info--hashtags"
          v-if="
            Object.keys(singleMuvi).length > 0 &&
            extractHashtagsAndText(singleMuvi?.description).hashtags.length > 0
          "
        >
          <div
            v-for="hashtag in extractHashtagsAndText(singleMuvi?.description).hashtags"
            :key="hashtag"
            class="shorts__info--hashtags-item"
          >
            {{ hashtag }}
          </div>
        </div>
      </template>
      <div v-else class="edit__description">
        <div class="edit__description--top">
          {{ textareaValue.length }} / {{ $t('add_muvi.max_length') }}
        </div>
        <textarea
          maxlength="5000"
          v-model="textareaValue"
          class="edit__description--textarea"
          :placeholder="$t('add_muvi.description') + '...'"
        ></textarea>
        <div class="edit__description--footer">
          <SampleButton
            :title="$t('buttons.accept')"
            :size="14"
            padding="10px"
            @click="editShortVideo"
          />
          <SampleButton
            color="default"
            :title="$t('buttons.cancel')"
            :size="14"
            padding="10px"
            @click="isEditOpen = false"
          />
        </div>
      </div>
      <div class="shorts__bottom">
        <div class="shorts__bottom--views">
          {{ shortNum(muvi.videoViews || 0) }} {{ $t('video.views') }}
        </div>
        <span>|</span>
        <div class="shorts__bottom--date">
          {{ multiFormatDateString(muvi.date_create) }}
        </div>
      </div>
      <div class="shorts__bottom--comments" v-if="muvi?.comments_status === '1'">
        <p>{{ $t('labels.comments.plural') }}</p>
        <span>{{ comments.length }}</span>
      </div>
    </div>
    <div class="shorts__block">
      <div class="shorts__comments" v-if="muvi?.comments_status === '1'">
        <div class="shorts__comments--inner" ref="room">
          <ShortsBlockComments
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :user="user"
            @clickReactionHandler="clickReactionHandler"
            @updateMessages="updateMessages"
            @updateComment="updateComment"
          />
        </div>
      </div>
      <div class="shorts__comments disabled__comments" v-else>
        {{ $t('muvi.comments_disabled') }}
      </div>
      <div class="shorts__info--bottom">
        <div class="shorts__info--reactions" v-if="singleMuvi?.reaction?.count > 0">
          <div class="reaction active">
            <like-icon></like-icon>
            <span>{{ shortNum(singleMuvi?.reaction?.count) }}</span>
          </div>
        </div>
        <div class="shorts__comments--actions">
          <div class="reaction__buttons--block">
            <div class="like__button open-reaction-button" @click="setReaction(muvi.id)">
              <HeartFilledIcon v-if="isLiked" />
              <HeartIcon v-else />
              <span>{{ $t('buttons.like') }}</span>
            </div>
          </div>
          <MenuShare />
        </div>
        <form
          v-if="muvi?.comments_status === '1'"
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
  <teleport to="body">
    <CommentReportModal v-if="isReportModalOpen" />
  </teleport>
</template>

<script setup>
/* eslint-disable */
import axios from 'axios'
import { ref, onMounted, nextTick, reactive, watch } from 'vue'
import shortNum from 'number-shortener'
import { vOnClickOutside } from '@vueuse/components'
import { getFormData, extractHashtagsAndText } from '@/utils'
import { useRouter } from 'vue-router'
import { timeFormat } from '@/mixins/timeFormat.js'

import MenuShare from '@/components/ui/MenuShare.vue'
import ShortsBlockComments from '@/components/ui/Shorts/ShortsBlockComments.vue'
import LikeIcon from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import HeartFilledIcon from '@/components/icons/HeartFilledIcon.vue'
import SendIcon from '@/components/icons/shorts/SendIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CommentReportModal from '@/components/ui/modals/CommentReportModal.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const props = defineProps({
  muvi: {
    type: Object
  }
})

const isMenuOpen = ref(false)
const commentText = ref('')
const isLoading = ref(false)
const isLiked = ref(false)
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const singleMuvi = ref({})
const comments = ref([])
const room = ref()
const actionType = ref('create')
const passedComment = ref({})
const isReportModalOpen = ref(false)
const textareaValue = ref('')
const isEditOpen = ref(false)
const router = useRouter()

const payload = reactive({
  server_key: process.env.VUE_APP_SERVER_KEY,
  video_id: props.muvi?.id,
  description: '',
  privacy_type: 0, //0 - Available to everyone * 1 - Who is following me * 2 - Who am I
  comments_status: '1'
})

const scrollToBottom = () => {
  nextTick(() => {
    room.value.scrollIntoView({ block: 'end', inline: 'nearest' })
  })
}

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

const getSingleMovi = async (video_id) => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id
    })
    const { data } = await axios.post('/get-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    singleMuvi.value = data?.data
    isLiked.value = data.data?.reaction?.type === '1' || data.data?.reaction?.type === '2'
    textareaValue.value = data?.data?.description || ''
  } catch (err) {
    console.log(err)
  }
}
const setReaction = async (video_id) => {
  isLiked.value = !isLiked.value
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id,
      reaction: '1'
    })
    await axios.post('/set-reaction-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    getSingleMovi(props.muvi.id)
  } catch (err) {
    console.log(err)
  }
}
const getComments = async (video_id) => {
  if (props.muvi?.comments_status === '0') return
  try {
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
  }
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

const commentStatus = async ({ isDisabled }) => {
  if (isDisabled) {
    payload.comments_status = '0'
  } else {
    payload.comments_status = '1'
  }
  await editShortVideo()
}

const setPrivacyType = async (type) => {
  payload.privacy_type = type
  await editShortVideo()
}

const editShortVideo = async () => {
  try {
    isLoading.value = true
    const submitPayload = getFormData(payload)

    await axios.post('/edit-short-video', submitPayload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
    await getSingleMovi(props.muvi?.id)
    isEditOpen.value = false
  }
}
const deleteShortVideo = async () => {
  try {
    isLoading.value = true
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      video_id: props.muvi?.id
    })

    await axios.post('/delete-short-video', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
    router.go(-1)
  }
}

const updateComment = (comment) => {
  actionType.value = 'update'
  passedComment.value = comment
  commentText.value = comment.text
}

watch(
  () => textareaValue.value,
  (val) => {
    payload.description = val
  }
)

const updateMessages = () => getComments(props.muvi.id)

Promise.all([getSingleMovi(props.muvi.id), getComments(props.muvi.id)])

onMounted(() => {
  isLiked.value = singleMuvi?.reaction?.type === '1' || singleMuvi?.reaction?.type === '2'
})
</script>

<script>
export default {
  mixins: [timeFormat]
}
</script>

<style lang="scss">
.shorts {
  &__content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    &--top {
      padding: 20px 20px 0;
      display: flex;
      flex-direction: column;
    }
  }
  &__block {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    flex-grow: 1;
  }

  &__info {
    &--bottom {
      background: var(--color-white);
      width: 100%;
      padding-top: 3px;
      border-top: 1px solid var(--color-gallery-first);
      padding-top: 20px;
    }
    &--hashtags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;

      &-item {
        padding: 8px 12px;
        border-radius: 8px;
        background-color: var(--color-seashell);
        color: var(--color-mine-shaft);
        font-size: 12px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
      }
    }
    &--details {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      svg {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
    &--text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      color: var(--color-mine-shaft);
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }

    &--reactions {
      padding: 0 20px 20px;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;

      .reaction {
        padding: 7px 12px;
        border-radius: 8px;
        background: var(--color-gallery-second);
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
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
          color: var(--color-silver-chalice);
        }
      }
    }
  }
  &__bottom {
    display: flex;
    gap: 4px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-silver-chalice);
    span,
    &--date,
    &--views {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &--comments {
      padding: 16px 0 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      p {
        margin: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-secondary);
      }
    }
  }
  &__comments {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    min-height: 0;
    position: relative;
    overflow-x: hidden;
    margin: 0 0 auto;
    &.disabled__comments {
      padding: 20px;
      text-align: center;
      margin-top: 20px;
      font-size: 18px;
      color: var(--color-mine-shaft);
    }
    &--inner {
      overflow-y: auto;
      flex-grow: 1;
      min-height: 100%;
      overflow-x: hidden;
      width: calc(100% - 32px);
      position: absolute;
      left: 16px;
      margin: 0;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &--form {
      width: 100%;
      display: flex;
      padding: 6px;
      .form {
        &__input {
          display: flex;
          align-items: center;
          gap: 6px;
          width: calc(100% - 34px);

          img {
            max-width: 28px;
            width: 100%;
            height: 28px;
            display: block;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
            overflow: hidden;
          }
          textarea {
            width: 100%;
            border: none;
            outline: none;
            padding: 6px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: var(--color-mine-shaft);
            resize: none;
            background-color: transparent;
            height: auto;
            &::placeholder {
              font-family: 'HelveticaNeueCyr', sans-serif;
              color: var(--color-secondary);
            }
          }
        }
        &__btn {
          max-width: 28px;
          width: 100%;
          height: 28px;
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
        }
      }
    }

    &--actions {
      display: flex;
      align-items: center;
      padding: 0 20px 20px 20px;
      gap: 24px;
      .like__button {
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
.edit__description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  &--top {
    color: var(--color-mine-shaft);
    text-align: right;
  }
  &--textarea {
    min-height: 120px;
    background-color: transparent;
    border: 1px solid var(--color-seashell);
    padding: 12px;
    outline: none;
    color: var(--color-mine-shaft);
  }
  &--footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style>
