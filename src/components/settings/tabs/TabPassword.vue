<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <PasswordIcon />
      </template>
      <template #title>{{ $t('settings.password.info_title') }}</template>
      <template #text>
        {{ $t('settings.password.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form create__group--form-text pt-0">
          <label class="create__group--label">{{ $t('settings.password.your_password') }}</label>
          <input
            type="password"
            class="create__group--input pt-0"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{ $t('settings.password.new_password') }}</label>
          <input
            type="password"
            class="create__group--input"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{
            $t('settings.password.repeat_new_password')
          }}</label>
          <input
            type="password"
            class="create__group--input"
            :placeholder="$t('settings.password.password_placeholder')"
          />
        </div>
        <div class="create__group--form pb-0">
          <div class="create__group--label">{{ $t('settings.password.auth2') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.password.off'), $t('settings.password.on')]"
            :default="$t('settings.password.off')"
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
import PasswordIcon from '@/components/icons/settings/PasswordIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'

const handleSelect = (event) => {
  // TODO
}
</script>
