<template>
  <router-link :to="`/${$i18n.locale}/messenger/${chat?.chatId}`" class="list">
    <div class="list__img">
      <img :src="chat?.chatImage" :alt="chat?.chatName" loading="lazy" />
    </div>
    <div class="list__info">
      <div class="list__info--top">
        <div class="list__info--name">{{ chat?.chatName }}</div>
        <div class="list__info--date">
          <!-- :class="online"   -->
          {{ formatCustomDate(chat?.message?.messageDate) }}
        </div>
      </div>
      <div class="list__info--bottom">
        <div class="list__info--text">
          {{ chat?.message?.message }}
        </div>
        <!-- <div
          class="list__info--status"
          v-if="user.messages[user.messages.length - 1].state === 'send'"
        >
          <double-check-icon
            v-if="user.messages[user.messages.length - 1].status === 'read'"
            color="#49A399"
          />
          <single-check-icon
            v-if="user.messages[user.messages.length - 1].status === 'notread'"
            color="#49A399"
          />
        </div> -->
      </div>
    </div>
  </router-link>
</template>

<script setup>
/* eslint-disable */
import { timeFormat } from '@/mixins/timeFormat.js'

import DoubleCheckIcon from '@/components/icons/DoubleCheckIcon.vue'
import SingleCheckIcon from '@/components/icons/SingleCheckIcon.vue'

const props = defineProps({
  chat: Object
})
</script>

<script>
export default {
  mixins: [timeFormat]
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  min-height: 104px;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &.router-link-active {
    background-color: var(--color-gallery-first);
  }
  &:first-child {
    border-top: 1px solid var(--color-gallery-first);
  }
  border-bottom: 1px solid var(--color-gallery-first);
  &__img {
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &__info {
    width: calc(100% - 88px);
    &--top {
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
      justify-content: space-between;
    }
    &--bottom {
      display: flex;
      gap: 20px;
      align-items: flex-end;
      justify-content: space-between;
    }
    &--name {
      width: calc(100% - 112px);
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--date {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: right;
      color: var(--color-silver-chalice);
      &.online {
        color: var(--color-green);
      }
    }
    &--text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      letter-spacing: 0.35px;
      color: var(--color-mine-shaft);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }
  }
}
</style>
