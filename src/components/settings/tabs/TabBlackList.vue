<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <BlackListIcon />
      </template>
      <template #title>{{ $t('settings.black_list.info_title') }}</template>
      <template #text>
        {{ $t('settings.black_list.info_text') }}
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
