<template>
  <router-link
    :to="`/${$i18n.locale}/messenger/${chat?.chatId}`"
    class="list"
    @click="cleatMessage(chat)"
  >
    <div class="list__img">
      <img :src="chat?.chatImage" :alt="chat?.chatName" loading="lazy" />
    </div>
    <div class="list__info">
      <div class="list__info--top">
        <div class="list__info--name">{{ chat?.chatName }}</div>
        <div
          class="list__info--date"
          :class="{
            online:
              chat?.isTyping ||
              (formatCustomDate(chat?.userLastSeen, true) === 'chat.online' &&
                !store.getters['messenger/getIsLoading'])
          }"
        >
          <div class="list__info--status" v-if="chat?.message?.messageOwner">
            <PreloaderIcon
              v-if="store.getters['messenger/getIsLoading'] && chat?.chatId === +route.params?.id"
            />
            <double-check-icon v-else-if="chat?.message?.messageSeen" color="#49A399" />
            <single-check-icon v-else color="#49A399" />
          </div>
          <template v-if="chat?.isTyping">
            {{ $t('chat.typing') }}
          </template>
          <template v-else>
            {{
              formatCustomDate(chat?.userLastSeen, true) === 'chat.online' &&
              !store.getters['messenger/getIsLoading']
                ? $t(formatCustomDate(chat?.userLastSeen, true))
                : formatCustomDate(chat?.message?.messageDate)
            }}
          </template>
        </div>
      </div>
      <div class="list__info--bottom">
        <div class="list__info--text">
          {{ chat?.message?.message }}
        </div>
        <div
          class="list__info--indicator"
          v-if="newMessages[index] && newMessages[index]?.countUnreedMessages > 0"
        >
          {{ newMessages[index]?.countUnreedMessages }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
/* eslint-disable */
import { timeFormat } from '@/mixins/timeFormat.js'
import { ref, onUpdated, onMounted } from 'vue'
import DoubleCheckIcon from '@/components/icons/DoubleCheckIcon.vue'
import SingleCheckIcon from '@/components/icons/SingleCheckIcon.vue'
import PreloaderIcon from '@/components/icons/PreloaderIcon.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const props = defineProps({
  chat: Object
})

const index = ref(-1)
const newMessages = ref([])

const updateIndex = () => {
  newMessages.value = JSON.parse(localStorage.getItem('newMessages') || '[]')
  index.value = newMessages.value.findIndex((chat) => chat?.chatId === props.chat?.chatId)
}

const cleatMessage = (chat) => {
  newMessages.value = JSON.parse(localStorage.getItem('newMessages') || '[]')
  newMessages.value = newMessages.value.filter((m) => m.chatId !== chat?.chatId)
  localStorage.setItem('newMessages', JSON.stringify(newMessages.value))
}

onUpdated(updateIndex)
onMounted(updateIndex)
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
    &--indicator {
      background-color: var(--color-hippie-blue);
      color: var(--color-stable-white);
      max-width: 25px;
      width: 100%;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 12px;
      margin: auto 0;
    }
    &--bottom {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      min-height: 42px;
      max-height: 42px;
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
      display: flex;
      align-items: center;
      gap: 5px;
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
