<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <BlackListIcon />
      </template>
      <template #title>Черный список</template>
      <template #text>
        Черный список - это функция, которая позволяет вам контролировать и ограничивать
        взаимодействие с определенными пользователями на нашем сайте. Вы можете добавлять
        пользователей в черный список, чтобы предотвратить получение сообщений, комментариев или
        упоминаний от них.
      </template>
    </SettingsInfo>
    <div class="settings__form create__group">
      <div class="create__group--block">
        <div class="users__wrapper">
          <UserCard v-for="user in groupsUsers" :black-list="true" :user="user" :key="user.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BlackListIcon from '@/components/icons/settings/BlackListIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import UserCard from '@/components/groups/details/UserCard.vue'

import { groupsUsers } from '@/dummy.js'
</script>
