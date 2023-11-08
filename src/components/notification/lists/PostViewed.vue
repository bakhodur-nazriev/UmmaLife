<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div class="notification__list--avatar" :class="{ not__read: !data.isRead }">
        <img :src="data.users[0].avatar" :alt="data.users[0].name" />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text" v-if="data.users.length > 1">
          <a href="#">{{ data.users[0].name }}</a> и
          <a href="#">{{ data.users[1].name }}</a> просмотрели ваш профиль
        </div>
        <div class="notification__list--text" v-else>
          <a href="#">{{ data.users[0].name }}</a> просмотрел ваш профиль
        </div>
        <div v-if="typeof data.time === 'number'" class="notification__list--time">
          {{ data.time }} мин
        </div>
        <div v-else class="notification__list--time">{{ data.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  data: Object
})
</script>
