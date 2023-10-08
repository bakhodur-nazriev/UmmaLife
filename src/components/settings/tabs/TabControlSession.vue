<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.control_sessions') }}</div>
      <div class="settings__header--ready">{{ $t('settings.accaunt.ready') }}</div>
    </div>
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
      <div class="create__group--block session__tab">
        <div class="settings__sessions">
          <div class="settings__sessions--card settings__sessions--card-first pt-0">
            <div class="settings__sessions--title">
              {{ $t('settings.session.current_session') }}
            </div>
            <div class="settings__sessions--wrapper">
              <div class="settings__sessions--left settings__sessions--left-first">
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
          <div class="settings__sessions--title settings__sessions--title-second">
            {{ $t('settings.session.recent_sessions') }}
          </div>
          <div class="settings__sessions--left-first">
            <div
              class="settings__sessions--card"
              @click="
                handleClickOption({
                  title: 'Iphone 13',
                  svg: 'iphone',
                  app: 'Safari',
                  location: 'Istanbul, Turkey',
                  ip: '85.000.000.00',
                  status: $t('settings.session.hour_ago')
                })
              "
            >
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
            <div
              class="settings__sessions--card"
              @click="
                handleClickOption({
                  title: 'Windows',
                  svg: 'windows',
                  app: 'Google Chrome',
                  location: 'Istanbul, Turkey',
                  ip: '85.000.000.00',
                  status: $t('settings.session.hour_ago')
                })
              "
            >
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
            :title="$t('settings.session.auto_quit_title')"
          />
        </div>
      </div>
      <div class="mobile-select--inner session__modal" v-if="screenWidth < 767 && open">
        <div
          class="mobile-select--block"
          :class="open && !className ? 'opened' : 'closed'"
          v-on-click-outside="handleClose"
        >
          <div class="mobile-select--header session__modal--header">
            <div class="session__modal--icon">
              <SessionPhoneIcon v-if="selectedOption.svg === 'iphone'" />
              <SessionWindowsIcon v-else-if="selectedOption.svg === 'windows'" />
            </div>
            <div class="session__modal--title">{{ selectedOption.title }}</div>
            <div class="session__modal--status">{{ selectedOption.status }}</div>
          </div>
          <div class="session__modal--block">
            <div class="session__modal--list">
              <p>{{ $t('settings.accaunt.app') }}</p>
              <span>{{ selectedOption.app }}</span>
            </div>
            <div class="session__modal--list">
              <p>{{ $t('settings.accaunt.ip') }}</p>
              <span>{{ selectedOption.ip }}</span>
            </div>
            <div class="session__modal--list">
              <p>{{ $t('settings.accaunt.location') }}</p>
              <span>{{ selectedOption.location }}</span>
            </div>
          </div>
          <div class="session__modal--btn">{{ $t('settings.accaunt.finish_seans') }}</div>
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
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import SessionIcon from '@/components/icons/settings/SessionIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'

// Session Icons
import SessionsMacIcon from '@/components/icons/settings/SessionsMacIcon.vue'
import SessionPhoneIcon from '@/components/icons/settings/SessionPhoneIcon.vue'
import SessionWindowsIcon from '@/components/icons/settings/SessionWindowsIcon.vue'
import StopSessionIcon from '@/components/icons/settings/StopSessionIcon.vue'

const emit = defineEmits(['handleSelectNav'])
const handleSelect = () => {
  // TODO
}
const selectedOption = ref({
  title: '',
  status: '',
  svg: '',
  app: '',
  ip: '',
  location: ''
})
const open = ref(false)
const className = ref(false)

const handleClickOption = (option) => {
  open.value = true
  selectedOption.value = option
}

const handleClose = () => {
  className.value = true
  setTimeout(() => {
    open.value = false
    className.value = false
  }, 100)
}
</script>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['screenWidth'])
  }
}
</script>

<style lang="scss" scoped>
.session__tab {
  @media (max-width: 767px) {
    background-color: var(--color-light-gray);
  }
}
.settings__sessions {
  &--card {
    padding: 24px 0;
    border-bottom: 1px solid var(--color-gallery-first);
    @media (max-width: 767px) {
      &:first-child {
        padding-top: 0;
        margin-bottom: 0 !important;
      }
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
      &:not(:last-child) {
        margin-bottom: 24px;
      }
      &-first {
        margin-bottom: 0 !important;
        padding: 0;
        border-bottom: none;
      }
    }
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    margin-bottom: 20px;
    color: var(--color-mine-shaft);
    &-second {
      margin-bottom: 0;
      margin-top: 24px;
      @media (max-width: 767px) {
        margin-bottom: 24px;
        margin-top: 0;
      }
    }
  }
  &--wrapper {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    @media (max-width: 767px) {
      width: 100%;
      display: block;
    }
  }
  &--left {
    display: flex;
    gap: 23px;
    @media (max-width: 767px) {
      &-first {
        width: 100%;
        border-radius: 10px;
        background-color: var(--color-white);
        box-shadow: 10px 0px 40px 0px rgba(108, 108, 108, 0.15);
        padding: 16px;
        margin-bottom: 24px;
        &:first-child {
          padding-bottom: 80px;
          position: relative;
        }
      }
      gap: 12px;
    }
    svg {
      width: 60px;
      height: 60px;
      @media (max-width: 767px) {
        width: 40px;
        height: 40px;
      }
    }
  }
  &--info {
    @media (max-width: 767px) {
      width: calc(100% - 52px);
    }
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
      @media (max-width: 767px) {
        position: absolute;
        border-top: 1px solid var(--color-gallery-first);
        width: calc(100% - 32px);
        padding-top: 20px;
        left: 16px;
        bottom: 16px;
        background: var(--color-white);
        justify-content: center;
      }
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
    transition: all 0.3s;
    &:hover {
      color: var(--color-hippie-blue);
      border-color: var(--color-hippie-blue);
    }
    @media (max-width: 767px) {
      display: none;
    }
  }
}
.session__modal {
  &--header {
    border-bottom: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  &--icon {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &--title {
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 4px;
  }
  &--status {
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-hippie-blue);
  }
  &--block {
    box-shadow: 10px 0px 40px 0px rgba(108, 108, 108, 0.15);
    border-radius: 10px;
    background-color: var(--color-white);
    padding: 0 16px;
    margin: 0 16px;
    margin-bottom: 40px;
    width: calc(100% - 32px);
  }
  &--list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 16px 0;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-seashell);
    }
    p {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0;
      margin: 0;
      color: var(--color-mine-shaft);
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
  }
  &--btn {
    box-shadow: 10px 0px 40px 0px rgba(108, 108, 108, 0.15);
    border-radius: 10px;
    cursor: pointer;
    padding: 16px;
    width: 100%;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    color: var(--color-valencia);

    margin: 0 16px;
    margin-bottom: 20px;
    width: calc(100% - 32px);
  }
}
</style>
