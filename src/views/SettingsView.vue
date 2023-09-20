<template>
  <main-layout>
    <div class="settings">
      <div class="settings__wrapper">
        <main class="settings__main">
          <div class="settings__main--inner">
            <TabMainSettings v-if="selectedTab === 0" />
            <TabPersonalData v-else-if="selectedTab === 1" />
            <TabEducation v-else-if="selectedTab === 2" />
            <TabWorkplace v-else-if="selectedTab === 3" />
            <TabConfidential v-else-if="selectedTab === 4" />
            <TabPassword v-else-if="selectedTab === 5" />
            <TabControlSession v-else-if="selectedTab === 6" />
            <TabRestoreContact v-else-if="selectedTab === 7" />
            <TabNotificationSettings v-else-if="selectedTab === 8" />
            <TabBlackList v-else-if="selectedTab === 9" />
            <TabDeleteAccount v-else-if="selectedTab === 10" />
          </div>
        </main>
        <SettingsNav :tabs="tabs" :selectedTab="selectedTab" @handleSelectTab="handleSelectTab" />
      </div>
    </div>
  </main-layout>
</template>

<script setup>
import MainLayout from '@/components/layouts/MainLayout.vue'
import SettingsNav from '@/components/settings/SettingsNav.vue'
import TabMainSettings from '@/components/settings/tabs/TabMainSettings.vue'
import TabPersonalData from '@/components/settings/tabs/TabPersonalData.vue'
import TabEducation from '@/components/settings/tabs/TabEducation.vue'
import TabWorkplace from '@/components/settings/tabs/TabWorkplace.vue'
import TabConfidential from '@/components/settings/tabs/TabConfidential.vue'
import TabPassword from '@/components/settings/tabs/TabPassword.vue'
import TabControlSession from '@/components/settings/tabs/TabControlSession.vue'
import TabRestoreContact from '@/components/settings/tabs/TabRestoreContact.vue'
import TabNotificationSettings from '@/components/settings/tabs/TabNotificationSettings.vue'
import TabBlackList from '@/components/settings/tabs/TabBlackList.vue'
import TabDeleteAccount from '@/components/settings/tabs/TabDeleteAccount.vue'

import { ref } from 'vue'
const tabs = ref([
  'Основные настройки',
  'Личные данные',
  'Образование',
  'Работа',
  'Конфиденциальность',
  'Пароль',
  'Управление сеансами',
  'Контакты для восстановления',
  'Настройки уведомлений',
  'Черный список',
  'Удалить аккаунт'
])

const selectedTab = ref(0)

const handleSelectTab = (i) => {
  selectedTab.value = i
}
</script>

<style lang="scss" scoped>
.settings {
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 430px;
    gap: 20px;
    padding: 24px 45px;
  }
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--inner {
      max-width: 800px;
      width: 100%;
      margin-left: 150px;
      @media (max-width: 1750px) {
        margin-left: 0;
      }
    }
  }
}
</style>
