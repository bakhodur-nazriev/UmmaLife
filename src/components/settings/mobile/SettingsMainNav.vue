<template>
  <div class="settings__header">
    <div class="settings__header--back"></div>
    <div class="settings__header--text">Ибрагим Ибрагимов</div>
    <SettingsClose @click="$router.go(-1)" />
  </div>
  <div class="settings__mobile--container">
    <div class="settings__mobile--title">{{ $t('settings.account.account_settings') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'settings')">
        <span>{{ $t('settings.nav.main') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'profile')">
        <span>{{ $t('settings.account.profile') }}</span>
        <ArrowRight />
      </li>
    </ul>
    <div class="settings__mobile--title">{{ $t('settings.account.safety') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'security')">
        <span>{{ $t('settings.nav.confidential') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'password')">
        <span>{{ $t('settings.nav.password') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'sessions')">
        <span>{{ $t('settings.nav.control_sessions') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'blacklist')">
        <span>{{ $t('settings.nav.black_list') }}</span>
        <ArrowRight />
      </li>
    </ul>
    <div class="settings__mobile--title">{{ $t('settings.account.display') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list" @click="emit('handleSelectNav', 'theme')">
        <span>{{ $t('settings.account.theme') }}</span>
        <ArrowRight />
      </li>
    </ul>
    <div class="settings__mobile--title">{{ $t('settings.account.notification') }}</div>
    <div class="settings__notif">
      <div class="settings__notif--top">
        <div class="settings__notif--title">{{ $t('settings.account.popup_notification') }}</div>
        <BaseToggle :checked="true" />
      </div>
      <div class="settings__notif--text">{{ $t('settings.account.show_popup_notification') }}</div>
      <a href="#" class="settings__notif--link">{{ $t('settings.account.to_system_settings') }}</a>
    </div>
    <div class="settings__mobile--title">{{ $t('settings.account.help_and_support') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list">
        <span>{{ $t('settings.account.report_problem') }}</span>
        <ArrowRight />
      </li>
    </ul>
    <div class="settings__mobile--title">{{ $t('links.about_us') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list">
        <span>{{ $t('links.about_us') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list">
        <span>{{ $t('links.privacy_policy') }}</span>
        <ArrowRight />
      </li>
      <li class="settings__mobile--list">
        <span>{{ $t('links.terms') }}</span>
        <ArrowRight />
      </li>
    </ul>
    <div class="settings__mobile--title">{{ $t('settings.account.quit') }}</div>
    <ul class="settings__mobile--menu">
      <li class="settings__mobile--list">
        <span class="quit">{{ $t('settings.session.quit') }}</span>
        <LogoutIcon />
      </li>
    </ul>
  </div>
</template>

<script setup>
/* eslint-disable */
import ArrowRight from '@/components/icons/settings/ArrowRight.vue'
import SettingsClose from '@/components/icons/settings/SettingsClose.vue'
import LogoutIcon from '@/components/icons/settings/LogoutIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'

const emit = defineEmits(['handleSelectNav'])
</script>
