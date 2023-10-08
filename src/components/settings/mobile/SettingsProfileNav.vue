<template>
  <div class="settings__header">
    <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
      <SettingsBackIcon />
    </div>
    <div class="settings__header--text">{{ $t('settings.accaunt.profile') }}</div>
    <div class="settings__header--back"></div>
  </div>
  <div class="settings__mobile--container wrapper">
    <div class="top">
      <div class="settings__mobile--title">{{ $t('settings.accaunt.profile_settings') }}</div>
      <ul class="settings__mobile--menu">
        <li class="settings__mobile--list" @click="emit('handleSelectNav', 'personal')">
          <span>{{ $t('settings.accaunt.profile_info') }}</span>
          <ArrowRight />
        </li>
        <li class="settings__mobile--list" @click="emit('handleSelectNav', 'education')">
          <span>{{ $t('settings.nav.education') }}</span>
          <ArrowRight />
        </li>
        <li class="settings__mobile--list" @click="emit('handleSelectNav', 'work')">
          <span>{{ $t('settings.nav.work') }}</span>
          <ArrowRight />
        </li>
      </ul>
    </div>
    <div class="bottom">
      <ul class="settings__mobile--menu">
        <li class="settings__mobile--list" @click="emit('handleSelectNav', 'delete')">
          <span>{{ $t('settings.nav.delete_account') }}</span>
          <DeleteAccountMobileIcon />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
import ArrowRight from '@/components/icons/settings/ArrowRight.vue'
import DeleteAccountMobileIcon from '@/components/icons/settings/DeleteAccountMobileIcon.vue'
const emit = defineEmits(['handleSelectNav'])
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
  min-height: calc(100dvh - 122px);
}
</style>
