<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div
        class="notification__list--avatar notification__list--icon"
        :class="{ not__read: !data.isRead }"
      >
        <InfoIcon />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text">
          Только что был выполнен вход с устройства Windows PC (Reston, Virginia, US)
        </div>
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
import InfoIcon from '@/components/icons/notification/InfoIcon.vue'
const props = defineProps({
  data: Object
})
</script>
