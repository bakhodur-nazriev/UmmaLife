<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <DeleteAccountIcon />
      </template>
      <template #title>Удалить акаунт</template>
      <template #text>
        Вы всегда имеете возможность удалить свою учетную запись на нашем сайте. Мы ценим ваше право
        на контроль над вашими личными данными и уважаем ваш выбор.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div>Удалить акаунт</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import DeleteAccountIcon from '@/components/icons/settings/DeleteAccountIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
</script>
