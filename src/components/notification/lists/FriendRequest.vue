<template>
  <div class="notification__list">
    <div class="notification__list--wrapper">
      <div class="notification__list--avatar" :class="{ not__read: !data.isRead }">
        <img :src="data.users[0].avatar" :alt="data.users[0].name" />
      </div>
      <div class="notification__list--content">
        <div class="notification__list--text">
          <a href="#">{{ data.users[0].name }}</a> отправил вам запрос на добавление в друзья
        </div>
        <div v-if="typeof data.time === 'number'" class="notification__list--time">
          {{ data.time }} мин
        </div>
        <div v-else class="notification__list--time">{{ data.time }}</div>
      </div>
    </div>
    <div class="notification__list--actions">
      <SampleButton title="Принять" padding="11px 24px" :size="14" width="136px" />
      <SampleButton
        title="Отклонить"
        padding="11px 24px"
        :size="14"
        color="default"
        width="136px"
      />
    </div>
  </div>
</template>

<script setup>
import SampleButton from '@/components/ui/SampleButton.vue'

/* eslint-disable */
const props = defineProps({
  data: Object
})
</script>
