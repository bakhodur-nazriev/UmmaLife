<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <RestoreContactIcon />
      </template>
      <template #title>{{ $t('settings.restore.info_title') }}</template>
      <template #text>
        {{ $t('settings.restore.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__restore">
          <div class="settings__restore--card">
            <div class="settings__restore--title">{{ $t('settings.restore.mobile_phone') }}</div>
            <div class="settings__restore--item">
              <div class="settings__restore--card_top">
                <div class="settings__restore--card_value">+90 123 45 67</div>
              </div>
              <div class="settings__restore--card_actions">
                <div class="settings__restore--btn success">
                  {{ $t('settings.restore.change') }}
                </div>
                <div class="settings__restore--btn danger">{{ $t('settings.restore.delete') }}</div>
              </div>
            </div>
            <div class="settings__restore--add">
              <PlusIcon />{{ $t('settings.restore.mobile_phone_add') }}
            </div>
          </div>

          <div class="settings__restore--card">
            <div class="settings__restore--title">{{ $t('settings.restore.reserve_email') }}</div>
            <div class="settings__restore--item">
              <input
                type="email"
                :placeholder="$t('settings.restore.reserve_email_placeholder')"
                class="settings__restore--input"
              />
              <div class="settings__restore--card_actions">
                <div class="settings__restore--btn danger">{{ $t('settings.restore.delete') }}</div>
              </div>
            </div>
            <div class="settings__restore--add">
              <PlusIcon />{{ $t('settings.restore.reserve_email_add') }}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import RestoreContactIcon from '@/components/icons/settings/RestoreContactIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import PlusIcon from '@/components/icons/settings/PlusIcon.vue'
</script>

<style lang="scss" scoped>
.settings__restore {
  &--card {
    &:not(:last-child) {
      padding-bottom: 24px;
      border-bottom: 1px solid var(--color-gallery-first);
    }
    &:not(:first-child) {
      padding-top: 24px;
    }
    &_value {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      color: var(--color-mine-shaft);
    }
    &_actions {
      display: flex;
      gap: 10px;
    }
  }
  &--item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 19px;
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 20px;
  }
  &--input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    color: var(--color-mine-shaft);
    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }
  &--btn {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid transparent;
    padding: 8px;
    width: 103px;
    cursor: pointer;
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s;
    &.success {
      border-color: 1px solid var(--color-hippie-blue);
      color: var(--color-hippie-blue);
      &:hover {
        background-color: var(--color-hippie-blue);
        color: var(--color-white);
      }
    }
    &.danger {
      border-color: 1px solid var(--color-valencia);
      color: var(--color-valencia);
      &:hover {
        background-color: var(--color-valencia);
        color: var(--color-white);
      }
    }
  }
  &--add {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-hippie-blue);
  }
}
</style>
