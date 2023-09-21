<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <SessionIcon />
      </template>
      <template #title>Управление сеансами</template>
      <template #text>
        Управление сеансами - важная функция, позволяющая вам контролировать активные сеансы вашей
        учетной записи. Это дает вам дополнительную возможность обеспечить безопасность и защитить
        свою учетную запись от несанкционированного доступа. Вы можете просмотреть активные сеансы и
        завершить их при необходимости. Таким образом, вы получаете больший контроль над своим
        аккаунтом и можете быть уверены в его безопасности.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div>Sessions</div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import SessionIcon from '@/components/icons/settings/SessionIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
</script>
