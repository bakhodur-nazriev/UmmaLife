<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'profile')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.delete_account') }}</div>
      <div class="settings__header--ready">{{ $t('settings.account.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <DeleteAccountIcon />
      </template>
      <template #title>{{ $t('settings.delete_account.info_title') }}</template>
      <template #text>
        {{ $t('settings.delete_account.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form">
          <div class="create__group--label">
            {{ $t('settings.delete_account.delete_account_title') }}
          </div>
          <div class="create__group--form--wrapper">
            <BaseCustomSelect
              :options="[
                `<div class=\'select--item\'>${$t('settings.session.if_not_active')}<span>${$t(
                  'settings.session.six_month'
                )}</span></div>`,
                `<div class=\'select--item\'>${$t('settings.session.if_not_active')}<span>${$t(
                  'settings.session.six_month'
                )}</span></div>`
              ]"
              :default="`<div class=\'select--item\'>${$t(
                'settings.session.if_not_active'
              )}<span>${$t('settings.session.six_month')}</span></div>`"
              @input="handleSelect"
              :title="$t('settings.delete_account.delete_account_title')"
            />
            <div class="settings__form--text mt-12">
              {{ $t('settings.delete_account.delete_account_text') }}
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <div class="create__group--label">{{ $t('settings.delete_account.enter_password') }}</div>
          <div class="create__group--form--wrapper">
            <input
              type="text"
              class="create__group--input pt-0"
              :placeholder="$t('settings.delete_account.enter_password_placeholder')"
            />
            <div class="delete__account">{{ $t('settings.delete_account.info_title') }}</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
import DeleteAccountIcon from '@/components/icons/settings/DeleteAccountIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
const emit = defineEmits(['handleSelectNav'])

const handleSelect = () => {
  // TODO
}
</script>

<style lang="scss">
.delete__account {
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
  color: var(--color-valencia);
  margin-top: 20px;
  cursor: pointer;
  width: fit-content;
  @media (max-width: 767px) {
    margin: 20px auto;
  }
}
.create__group--form--wrapper {
  @media (max-width: 767px) {
    width: 100%;
  }
}
</style>
