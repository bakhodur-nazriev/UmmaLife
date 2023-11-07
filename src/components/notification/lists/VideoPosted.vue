<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div
        class="notification__list--avatar notification__list--icon"
        :class="{ not__read: !data.isRead }"
      >
        <BellIcon />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text">Ваше видео опубликовано</div>
        <div v-if="typeof data.time === 'number'" class="notification__list--time">
          {{ data.time }} мин
        </div>
        <div v-else class="notification__list--time">{{ data.time }}</div>
      </div>
      <div class="notification__list--post">
        <img :src="data.post_photo" :alt="data.type" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BellIcon from '@/components/icons/notification/BellIcon.vue'

/* eslint-disable */
const props = defineProps({
  data: Object
})
</script>
