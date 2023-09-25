<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <SessionIcon />
      </template>
      <template #title>{{ $t('settings.session.info_title') }}</template>
      <template #text>
        {{ $t('settings.session.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__sessions">
          <div class="settings__sessions--card pt-0">
            <div class="settings__sessions--title">
              {{ $t('settings.session.current_session') }}
            </div>
            <div class="settings__sessions--wrapper">
              <div class="settings__sessions--left">
                <SessionsMacIcon />
                <div class="settings__sessions--info">
                  <div class="settings__sessions--info_title">Mac</div>
                  <div class="settings__sessions--info_prog">Safari</div>
                  <div class="settings__sessions--info_loc">
                    <p>Istanbul, Turkey</p>
                    <span class="settings__sessions--info_status">{{
                      $t('settings.session.online')
                    }}</span>
                  </div>
                  <div class="settings__sessions--info_ip">
                    {{ $t('settings.session.ip_address') }}: 85.000.000.00
                  </div>
                  <div class="settings__sessions--info_stop">
                    <StopSessionIcon />{{ $t('settings.session.complete_all_sessions') }}
                  </div>
                </div>
              </div>
              <button type="button" class="settings__sessions--btn">
                {{ $t('settings.session.quit') }}
              </button>
            </div>
          </div>
          <div class="settings__sessions--card">
            <div class="settings__sessions--title">
              {{ $t('settings.session.recent_sessions') }}
            </div>
            <div class="settings__sessions--wrapper">
              <div class="settings__sessions--left">
                <SessionPhoneIcon />
                <div class="settings__sessions--info">
                  <div class="settings__sessions--info_title">Iphone 13</div>
                  <div class="settings__sessions--info_prog">Safari</div>
                  <div class="settings__sessions--info_loc">
                    <p>Istanbul, Turkey</p>
                    <span class="settings__sessions--info_status">{{
                      $t('settings.session.hour_ago')
                    }}</span>
                  </div>
                  <div class="settings__sessions--info_ip">
                    {{ $t('settings.session.ip_address') }}: 85.000.000.00
                  </div>
                </div>
              </div>
              <button type="button" class="settings__sessions--btn">
                {{ $t('settings.session.quit') }}
              </button>
            </div>
          </div>
          <div class="settings__sessions--card">
            <div class="settings__sessions--wrapper">
              <div class="settings__sessions--left">
                <SessionWindowsIcon />
                <div class="settings__sessions--info">
                  <div class="settings__sessions--info_title">Windows</div>
                  <div class="settings__sessions--info_prog">Google Chrome</div>
                  <div class="settings__sessions--info_loc">
                    <p>Istanbul, Turkey</p>
                    <span class="settings__sessions--info_status">{{
                      $t('settings.session.hour_ago')
                    }}</span>
                  </div>
                  <div class="settings__sessions--info_ip">
                    {{ $t('settings.session.ip_address') }}: 85.000.000.00
                  </div>
                </div>
              </div>
              <button type="button" class="settings__sessions--btn">
                {{ $t('settings.session.quit') }}
              </button>
            </div>
          </div>
        </div>
        <div class="create__group--form pb-0">
          <div class="create__group--label">{{ $t('settings.session.auto_quit_title') }}</div>
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
          />
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
import SessionIcon from '@/components/icons/settings/SessionIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

// Session Icons
import SessionsMacIcon from '@/components/icons/settings/SessionsMacIcon.vue'
import SessionPhoneIcon from '@/components/icons/settings/SessionPhoneIcon.vue'
import SessionWindowsIcon from '@/components/icons/settings/SessionWindowsIcon.vue'
import StopSessionIcon from '@/components/icons/settings/StopSessionIcon.vue'

const handleSelect = () => {
  // TODO
}
</script>

<style lang="scss" scoped>
.settings__sessions {
  &--card {
    padding: 24px 0;
    border-bottom: 1px solid var(--color-gallery-first);
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    margin-bottom: 20px;
    color: var(--color-mine-shaft);
  }
  &--wrapper {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  &--left {
    display: flex;
    gap: 23px;
    svg {
      width: 60px;
      height: 60px;
    }
  }
  &--info {
    &_title {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 4px;
    }
    &_prog {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 4px;
    }
    &_loc {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
        display: flex;
        align-items: center;
        white-space: nowrap;
        &::after {
          content: '';
          min-width: 4px;
          margin: 0 8px;
          height: 4px;
          background: var(--color-secondary);
          border-radius: 50%;
          display: block;
        }
      }
    }
    &_status {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-hippie-blue);
    }
    &_ip {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &_stop {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background-color: var(--color-seashell);
      cursor: pointer;
      border-radius: 10px;
      margin-top: 20px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  &--btn {
    border: 1px solid var(--color-valencia);
    border-radius: 10px;
    background: transparent;
    outline: none;
    padding: 13px;
    width: 112px;
    display: block;
    height: fit-content;
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-valencia);
  }
}
</style>
