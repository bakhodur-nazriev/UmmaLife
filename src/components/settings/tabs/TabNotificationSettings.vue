<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <NotificationSettingsIcon />
      </template>
      <template #title>Настройки уведомлений</template>
      <template #text>
        Настройки уведомлений позволяют вам настроить информацию и оповещения, которые вы получаете
        от нашего сайта.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__categories">
          <div class="create__group--label">Системные уведомления</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox
              v-for="notification in systemNotifications"
              :key="notification"
              :label="notification"
            />
          </div>
        </div>
        <div class="settings__categories">
          <div class="create__group--label">E-mail уведомления</div>
          <div class="settings__categories--wrapper">
            <BaseCheckbox
              v-for="notification in systemNotifications"
              :key="notification"
              :label="notification"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotificationSettingsIcon from '@/components/icons/settings/NotificationSettingsIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'

const systemNotifications = ref([
  'Нравятся мои заметки',
  'Прокомментировали мои заметки',
  'Поделились моими заметками',
  'Подписаны на меня',
  'Нравится моя страница',
  'Упомянули меня',
  'Вступили в мою группу',
  'Приняли запрос на подписку',
  'Публикация на стене профиля'
])
</script>

<style lang="scss" scoped>
.settings__categories--wrapper {
  grid-template-columns: 1fr;
}
.settings__categories {
  padding-top: 0 !important;
  &:not(:last-child) {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--color-gallery-first);
  }
}
</style>
