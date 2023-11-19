<template>
  <div class="muvi__profile">
    <div class="muvi__profile--top">
      <img :src="user.avatar" :alt="user.username" class="muvi__profile--img" />
      <div class="muvi__profile--info">
        <div class="muvi__profile--name">{{ user?.first_name }} {{ user?.last_name }}</div>
        <ul class="muvi__profile--list">
          <li>
            <p>{{ shortNum(user?.stats?.muvi || 0) }}</p>
            <span>{{ $t('tabs.profile_tabs.muvi') }}</span>
          </li>
          <li>
            <p>{{ shortNum(user?.stats?.views || 0) }}</p>
            <span>{{ $t('video.views') }}</span>
          </li>
          <li>
            <p>{{ shortNum(user?.stats?.reactions || 0) }}</p>
            <span>{{ $t('video.reactions') }}</span>
          </li>
          <li>
            <p>{{ shortNum(user?.stats?.followers || 0) }}</p>
            <span>{{ $t('muvi.followers') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <MuviTabSwitch
      :tabs="[$t('muvi.my_muvi'), $t('muvi.saved')]"
      :activeIndex="activeIndex"
      @handleTabClick="handleTabClick"
      class="muvi__profile--tab"
    />

    <TabMyMuvies :user="user" v-if="activeIndex === 0" />
    <TabSavedMuvies :user="user" v-else />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import shortNum from 'number-shortener'

import MuviTabSwitch from '@/components/muvi/MuviTabSwitch.vue'

import { getFormData } from '@/utils'
import axios from 'axios'
import TabMyMuvies from '@/components/muvi/tabs/TabMyMuvies.vue'
import TabSavedMuvies from '@/components/muvi/tabs/TabSavedMuvies.vue'

const user = ref({})

const activeIndex = ref(0)

const handleTabClick = (index) => {
  activeIndex.value = index
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

getUserProfile()
</script>

<style lang="scss" scoped>
.muvi__profile {
  &--tab {
    margin: 0 0 28px !important;
  }
  &--top {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 28px;
    @media (max-width: 991px) {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
  }
  &--img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  &--name {
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 24px;
  }
  &--list {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 40px;
      @media (max-width: 991px) {
        padding: 0 20px;
      }
      &:first-child {
        padding-left: 0;
      }
      &:not(:last-child) {
        border-right: 1px solid var(--color-alto-first);
      }
      p {
        margin: 0 0 8px;
        padding: 0;
        font-size: 20px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-gray);
      }
    }
  }
}
</style>
