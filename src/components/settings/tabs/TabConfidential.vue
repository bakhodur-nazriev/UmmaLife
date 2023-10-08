<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.confidential') }}</div>
      <div class="settings__header--ready">{{ $t('settings.accaunt.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <ConfidentialIcon />
      </template>
      <template #title>{{ $t('settings.privacy.info_title') }}</template>
      <template #text>
        {{ $t('settings.privacy.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="settings__form--text">
          {{ $t('settings.privacy.top_text') }}
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question1') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question1')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question2') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question2')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question3') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question3')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question4') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question4')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question5') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question5')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question6') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
            :default="$t('settings.privacy.available_all')"
            @input="handleSelect"
            :title="$t('settings.privacy.question6')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question7') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.yes'), $t('settings.privacy.no')]"
            :default="$t('settings.privacy.yes')"
            @input="handleSelect"
            :title="$t('settings.privacy.question7')"
          />
        </div>
        <div class="create__group--form create__group--form-text">
          <div class="create__group--label">
            {{ $t('settings.privacy.question8') }}
          </div>
          <div>
            <BaseCustomSelect
              :options="[$t('settings.privacy.available_all'), $t('settings.privacy.only_friends')]"
              :default="$t('settings.privacy.available_all')"
              @input="handleSelect"
              :title="$t('settings.privacy.question8')"
            />
            <div class="settings__form--text mt-12">
              {{ $t('settings.privacy.question8_text') }}
            </div>
          </div>
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question9') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.yes'), $t('settings.privacy.no')]"
            :default="$t('settings.privacy.yes')"
            @input="handleSelect"
            :title="$t('settings.privacy.question9')"
          />
        </div>
        <div class="create__group--form">
          <div class="create__group--label">{{ $t('settings.privacy.question10') }}</div>
          <BaseCustomSelect
            :options="[$t('settings.privacy.yes'), $t('settings.privacy.no')]"
            :default="$t('settings.privacy.yes')"
            @input="handleSelect"
            :title="$t('settings.privacy.question10')"
          />
        </div>
        <div class="create__group--form create__group--form-text">
          <div class="create__group--label">{{ $t('settings.privacy.question11') }}</div>
          <div>
            <div class="settings__toggle">
              <span>{{ $t('settings.privacy.question11_title') }}</span>
              <BaseToggle v-model:isChecked="isChecked" />
            </div>
            <div class="settings__form--text mt-12">
              {{ $t('settings.privacy.question11_text') }}
            </div>
          </div>
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
import { ref } from 'vue'
import ConfidentialIcon from '@/components/icons/settings/ConfidentialIcon.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import BaseCustomSelect from '@/components/ui/BaseCustomSelect.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'

const emit = defineEmits(['handleSelectNav'])
const isChecked = ref(false)

const handleSelect = (event) => {
  // TODO
}
</script>

<style lang="scss">
.settings__form {
  &--text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-secondary);
    @media (max-width: 767px) {
      &:first-child {
        margin-bottom: 16px;
      }
    }
  }
  @media (max-width: 767px) {
    .create__group--block {
      padding: 16px 12px 80px 12px;
    }
    .create__group--actions {
      display: none;
    }
    .create__group--form {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
      border-bottom: none !important;
      padding: 0;
      &:not(:last-child) {
        margin-bottom: 22px;
      }
    }
    .create__group--label {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-secondary);
    }
    .create__group--input {
      background-color: var(--color-seashell);
      padding: 16px;
      border-radius: 10px;
      font-size: 14px;
    }
  }
}
.settings__toggle {
  border-radius: 10px;
  background-color: var(--color-seashell);
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mt-12 {
  margin-top: 12px;
}
</style>
