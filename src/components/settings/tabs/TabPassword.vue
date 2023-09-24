<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <PasswordIcon />
      </template>
      <template #title>Пароль</template>
      <template #text>
        Пароль - важный элемент безопасности вашей учетной записи. Он обеспечивает защиту от
        несанкционированного доступа и сохраняет конфиденциальность ваших личных данных. Правильно
        выбранный пароль помогает предотвратить мошенничество и защищает вашу репутацию в
        онлайн-среде. Поэтому не забывайте создавать и использовать надежные пароли для своих
        аккаунтов и следить за их безопасностью.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form create__group--form-text pt-0">
          <label class="create__group--label">Ваш пароль</label>
          <input type="password" class="create__group--input pt-0" placeholder="Введите пароль" />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">Новый пароль</label>
          <input type="password" class="create__group--input" placeholder="Введите пароль" />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">Повторите новый пароль</label>
          <input type="password" class="create__group--input" placeholder="Введите пароль" />
        </div>
        <div class="create__group--form pb-0">
          <div class="create__group--label">Двухфакторная аутентификация</div>
          <BaseCustomSelect
            :options="['Отключена', 'Включена']"
            :default="'Отключена'"
            @input="handleSelect"
          />
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import PasswordIcon from '@/components/icons/settings/PasswordIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

const handleSelect = (event) => {
  // TODO
}
</script>
