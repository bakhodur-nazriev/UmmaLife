<template>
  <div class="muvi__feeds--reactions">
    <UserInfo
      :noName="true"
      :avatar="muvi?.publisher?.avatar || muvi?.user_avatar"
      :username="muvi?.publisher?.name || muvi?.name"
      :status="{
        is_investor: muvi?.publisher?.isInvestor || false,
        verified: muvi?.publisher?.verified || '0',
        is_premium: muvi?.publisher?.is_premium || '0'
      }"
    />
    <div class="reaction like" @click="setReaction(muvi?.id)">
      <HeartFilledIcon v-if="isLiked" />
      <HeartIcon v-else />
      <p>{{ shortNum(singleMuvi?.reaction?.count || 0) }}</p>
    </div>
    <div class="reaction" @click="emit('commentClicked')">
      <MessageBlackIcon />
      <p>{{ shortNum(muvi?.comments || 0) }}</p>
    </div>
    <div class="reaction" @click="emit('shareClicked')">
      <ForwardIcon />
      <p>{{ shortNum(muvi?.shares || 0) }}</p>
    </div>
    <div class="reaction" @click="emit('menuClicked')">
      <MenuBlackDetailsIcon />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import shortNum from 'number-shortener'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import HeartFilledIcon from '@/components/icons/HeartFilledIcon.vue'
import MessageBlackIcon from '@/components/icons/MessageBlackIcon.vue'
import ForwardIcon from '@/components/icons/ForwardIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'
import { getFormData } from '@/utils'
import axios from 'axios'

const isLiked = ref(false)

const emit = defineEmits(['modalClicked', 'shareClicked', 'menuClicked', 'commentClicked'])
const props = defineProps({
  muvi: Object
})

const singleMuvi = ref({})

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
    singleMuvi.value = data.data
    isLiked.value = data.data?.reaction?.type === '1' || data.data?.reaction?.type === '2'
  } catch (err) {
    console.log(err)
  }
}

getSingleMovi(props.muvi.id)
onMounted(() => {
  isLiked.value = singleMuvi?.reaction?.type === '1' || singleMuvi?.reaction?.type === '2'
})
</script>

<style lang="scss" scoped>
.muvi__feeds {
  &--reactions {
    position: absolute;
    bottom: 114px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    .profile {
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-hippie-blue);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
    }
    .reaction {
      color: var(--color-stable-white);
      display: flex;
      flex-direction: column;
      gap: 3px;
      &.like {
        svg {
          height: 28px;
        }
      }
      svg {
        width: 24px;
      }
      p {
        margin: 0;
        padding: 0;
        text-align: center;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>
