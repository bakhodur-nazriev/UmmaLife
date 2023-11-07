<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div class="notification__list--avatar" :class="{ not__read: !data.isRead }">
        <img :src="data.users[0].avatar" :alt="data.users[0].name" />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text" v-if="data.users.length > 1">
          <a href="#">{{ data.users[0].name }}</a> и
          <a href="#">{{ data.users[1].name }}</a> отреагировал <SmallLikeIcon /> на вашу статью
          <a href="#">{{ data.post_title }}</a>
        </div>
        <div class="notification__list--text" v-else>
          <a href="#">{{ data.users[0].name }}</a> отреагировал <SmallLikeIcon /> на вашу статью
          <a href="#">{{ data.post_title }}</a>
        </div>
      </div>
      <div class="notification__list--post">
        <img :src="data.post_photo" :alt="data.type" v-if="data.post_photo" />
        <NotificationPostIcon v-else />
      </div>
    </div>

    <div v-if="typeof data.time === 'number'" class="notification__list--time">
      {{ data.time }} мин
    </div>
    <div v-else class="notification__list--time">{{ data.time }}</div>
  </div>
</template>

<script setup>
import SmallLikeIcon from '@/components/icons/reactions/men/small/SmallLikeIcon.vue'
import NotificationPostIcon from '@/components/icons/notification/NotificationPostIcon.vue'

/* eslint-disable */
const props = defineProps({
  data: Object
})
</script>
