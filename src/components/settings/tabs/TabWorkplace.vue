<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <WorkplaceIcon />
      </template>
      <template #title>Работа</template>
      <template #text>
        В разделе "Работа" вы можете указать информацию об организации, в которой вы работаете и
        занимаемой должности. Это поможет другим пользователям лучше понять вашу профессиональную
        сферу интересов.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0">
          <label class="create__group--label">Место работы</label>
          <input type="text" class="create__group--input" placeholder="Укажите ваше место работы" />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">Веб-сайт компании</label>
          <input type="text" class="create__group--input" placeholder="example.com" />
        </div>
        <div class="create__group--form pb-0">
          <label class="create__group--label">Личная страница</label>
          <input type="text" class="create__group--input" placeholder="website.com" />
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import WorkplaceIcon from '@/components/icons/settings/WorkplaceIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
</script>
