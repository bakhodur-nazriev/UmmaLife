<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'profile')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.work') }}</div>
      <div class="settings__header--ready">{{ $t('settings.account.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <WorkplaceIcon />
      </template>
      <template #title>{{ $t('settings.work.info_title') }}</template>
      <template #text>
        {{ $t('settings.work.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0">
          <label class="create__group--label">{{ $t('settings.work.work_address') }}</label>
          <input
            type="text"
            class="create__group--input"
            :placeholder="$t('settings.work.work_address_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{ $t('settings.work.work_website') }}</label>
          <input type="text" class="create__group--input" placeholder="example.com" />
        </div>
        <div class="create__group--form pb-0">
          <label class="create__group--label">{{ $t('settings.work.self_site') }} </label>
          <input type="text" class="create__group--input" placeholder="website.com" />
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">{{ $t('buttons.save') }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
import WorkplaceIcon from '@/components/icons/settings/WorkplaceIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
const emit = defineEmits(['handleSelectNav'])
</script>
