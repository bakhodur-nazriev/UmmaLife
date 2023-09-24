<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <RestoreContactIcon />
      </template>
      <template #title>Контакты для восстановления</template>
      <template #text>
        Если вы забудете пароль, мы поможем восстановить доступ к вашей почте в течении нескольких
        минут: на указанный здесь мобильный телефон или резервный email будет отправлен код
        восстановления. Проверьте свои контакты и при необходимости замените их на новые.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div>restore contact</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import RestoreContactIcon from '@/components/icons/settings/RestoreContactIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
</script>
