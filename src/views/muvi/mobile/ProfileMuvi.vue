<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="$router.go(-1)" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">{{ $t('muvi.tabs.profile') }}</div>
      <div class="left share__icon">
        <ShareLinkIcon />
      </div>
    </div>
    <div class="muvi__mobile--profile">
      <div class="muvi__mobile--profile-block">
        <div class="muvi__mobile--profile-top">
          <img :src="user.avatar" :alt="user.username" />
          <div class="muvi__mobile--profile-info">
            <div class="muvi__mobile--profile-name">
              {{ user?.first_name }} {{ user?.last_name }}
            </div>
          </div>
        </div>
        <div class="muvi__mobile--profile-middle">
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(user?.stats?.muvi || 0) }}</p>
            <span>{{ $t('tabs.profile_tabs.muvi') }}</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(user?.stats?.views || 0) }}</p>
            <span>{{ $t('video.views') }}</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(user?.stats?.reactions || 0) }}</p>
            <span>{{ $t('video.reactions') }}</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(user?.stats?.followers || 0) }}</p>
            <span>{{ $t('muvi.followers') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard
        v-for="(muvi, index) in muvies"
        :key="muvi.id"
        :muvi="muvi"
        @click="handleMuvieOpen(index)"
      />
    </div>
    <MuviesTab
      :muvies="muvies"
      :initialSlideIndex="initialSlideIndex"
      v-if="isMuviesOpen"
      @backTo="isMuviesOpen = false"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getFormData } from '@/utils'

import shortNum from 'number-shortener'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import ShareLinkIcon from '@/components/icons/ShareLinkIcon.vue'
import MuviesTab from '@/components/muvi/mobile/tabs/MuviesTab.vue'

const user = ref({})
const page = ref(1)
const initialSlideIndex = ref(0)
const isMuviesOpen = ref(false)
const muvies = ref([])

const handleMuvieOpen = (index) => {
  initialSlideIndex.value = index
  isMuviesOpen.value = true
}

const getUserProfile = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY
    })
    const { data } = await axios.post('/muvi-user-profile', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    user.value = data.data
  } catch (err) {
    console.log(err)
  }
}

const fetchMyMuvies = async () => {
  try {
    const payload = getFormData({
      server_key: process.env.VUE_APP_SERVER_KEY,
      user_id: user.value?.user_id,
      page: page.value
    })
    const { data } = await axios.post('/get-user-short-videos', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })
    muvies.value = data.data
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await getUserProfile()
  await fetchMyMuvies()
})
</script>

<style lang="scss" scoped>
.muvi__mobile {
  .share__icon {
    color: var(--color-hippie-blue);
    width: 24px;
    height: 24px;
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &--profile {
    padding: 20px 16px 0;
    &-block {
      background-color: var(--color-white);
      padding: 16px;
      box-shadow: 10px 0px 40px rgba(108, 108, 108, 0.15);
      border-radius: 8px;
    }
    &-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &-name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &-link {
      display: inline-block;
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      text-decoration-line: underline;
      color: var(--color-hippie-blue);
    }
    &-middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-grow: 1;
      &:not(:last-child) {
        border-right: 1px solid var(--color-seashell);
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
}
</style>
