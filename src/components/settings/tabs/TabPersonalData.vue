<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'profile')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.accaunt.profile_info') }}</div>
      <div class="settings__header--ready">{{ $t('settings.accaunt.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <PersonalDataIcon />
      </template>
      <template #title>{{ $t('settings.privet_data.info_title') }}</template>
      <template #text>
        {{ $t('settings.privet_data.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0">
          <label class="create__group--label">{{ $t('settings.privet_data.first_name') }}</label>
          <input
            type="text"
            class="create__group--input pt-0"
            :placeholder="$t('settings.privet_data.first_name')"
            value="Ибрагим"
          />
        </div>
        <div class="create__group--form">
          <label class="create__group--label">{{ $t('settings.privet_data.last_name') }}</label>
          <input
            type="text"
            class="create__group--input"
            :placeholder="$t('settings.privet_data.last_name')"
            value="Ибрагимов"
          />
        </div>
        <div class="create__group--form create__group--form-text">
          <label class="create__group--label">{{ $t('settings.privet_data.about_me') }}</label>
          <textarea
            class="create__group--input create__group--textarea"
            :placeholder="$t('settings.privet_data.about_me_placeholder')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privet_data.marital_status') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privet_data.not_selected'), $t('settings.privet_data.married')]"
            :default="$t('settings.privet_data.not_selected')"
            @input="handleSelect"
            :title="$t('settings.privet_data.marital_status')"
          />
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <label for="address" class="create__group--label">{{
            $t('settings.main.address')
          }}</label>
          <input
            type="text"
            name="address"
            class="create__group--input pt-0 pb-0"
            :placeholder="$t('settings.main.address_placeholder')"
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
/* eslint-disable */
import PersonalDataIcon from '@/components/icons/settings/PersonalDataIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'

const emit = defineEmits(['handleSelectNav'])

const handleSelect = (event) => {
  // TODO
}
</script>
