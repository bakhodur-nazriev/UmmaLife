<template>
  <div class="settings__mobile">
    <SettingsMainNav v-if="selectedMenu === 'main'" @handleSelectNav="handleSelectNav" />
    <SettingsProfileNav v-else-if="selectedMenu === 'profile'" @handleSelectNav="handleSelectNav" />
    <TabPersonalData v-else-if="selectedMenu === 'personal'" @handleSelectNav="handleSelectNav" />
    <TabMainSettings v-else-if="selectedMenu === 'settings'" @handleSelectNav="handleSelectNav" />
    <TabEducation v-else-if="selectedMenu === 'education'" @handleSelectNav="handleSelectNav" />
    <TabWorkplace v-else-if="selectedMenu === 'work'" @handleSelectNav="handleSelectNav" />
    <TabDeleteAccount v-else-if="selectedMenu === 'delete'" @handleSelectNav="handleSelectNav" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SettingsMainNav from '@/components/settings/mobile/SettingsMainNav.vue'
import SettingsProfileNav from '@/components/settings/mobile/SettingsProfileNav.vue'
import TabPersonalData from '@/components/settings/tabs/TabPersonalData.vue'
import TabMainSettings from '@/components/settings/tabs/TabMainSettings.vue'
import TabEducation from '@/components/settings/tabs/TabEducation.vue'
import TabWorkplace from '@/components/settings/tabs/TabWorkplace.vue'
import TabDeleteAccount from '@/components/settings/tabs/TabDeleteAccount.vue'

const selectedMenu = ref('main')

const handleSelectNav = (menu) => {
  selectedMenu.value = menu
}
</script>

<style lang="scss">
.settings {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    box-shadow: 0px 2px 3px 0px rgba(157, 157, 157, 0.3);
    width: 100%;
    position: sticky;
    top: 0;
    background-color: var(--color-white);
    z-index: 10;
    @media (min-width: 767px) {
      display: none;
    }
    &--text {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--back {
      width: 24px;
      height: 24px;
    }
    &--ready {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      cursor: pointer;
      color: var(--color-hippie-blue);
    }
  }
  &__mobile {
    width: 100%;
    height: 100%;
    background: var(--color-white);
    min-height: calc(100dvh - 66px);
    &--container {
      padding: 12px 16px 76px;
    }
    &--title {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-secondary);
      margin-bottom: 16px;
    }
    &--menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
    &--list {
      padding: 11px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--color-seashell);
      border-radius: 10px;
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
        &.quit {
          color: var(--color-valencia);
        }
      }
    }
  }
  &__notif {
    padding: 13px 16px 16px;
    background-color: var(--color-seashell);
    border-radius: 10px;
    margin-bottom: 24px;
    &--top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    &--title {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &--text {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
      margin-bottom: 16px;
    }
    &--link {
      width: fit-content;
      display: block;
      text-decoration: underline;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-hippie-blue);
    }
  }
}
</style>
