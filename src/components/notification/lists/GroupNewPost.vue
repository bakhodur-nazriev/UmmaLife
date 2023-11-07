<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div class="notification__list--avatar" :class="{ not__read: !data.isRead }">
        <img :src="data.group.avatar" :alt="data.group.name" />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text">
          В группе <a href="#">{{ data.group.name }}</a> появились новые публикации
        </div>
      </div>
      <div class="notification__list--post" v-if="data.group_photo">
        <img :src="data.group_photo" :alt="data.type" />
      </div>
    </div>

    <div v-if="typeof data.time === 'number'" class="notification__list--time">
      {{ data.time }} мин
    </div>
    <div v-else class="notification__list--time">{{ data.time }}</div>
  </div>
</template>
<script setup>
/* eslint-disable */
const props = defineProps({
  data: Object
})
</script>
