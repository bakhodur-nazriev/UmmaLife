<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'profile')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.nav.education') }}</div>
      <div class="settings__header--ready">{{ $t('settings.account.ready') }}</div>
    </div>
    <SettingsInfo>
      <template #icon>
        <EducationIcon />
      </template>
      <template #title>{{ $t('settings.education.info_title') }}</template>
      <template #text>
        {{ $t('settings.education.info_text') }}
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0 create__group--form-text">
          <label class="create__group--label">{{ $t('settings.education.school') }}</label>
          <div class="settings__add">
            <div v-for="school in schools" :key="school">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.school_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <div class="settings__add--wrapper">
                <button
                  class="settings__add--btn"
                  type="button"
                  v-if="school === schools && schools !== 4"
                  @click="schools !== 4 ? schools++ : (schools = 4)"
                >
                  <PlusIcon /> <span>{{ $t('settings.education.school_add') }}</span>
                </button>
                <button
                  type="button"
                  class="settings__add--delete"
                  @click="schools !== 1 && schools--"
                >
                  <DeleteIcon /> <span>{{ $t('buttons.delete') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text">
          <label class="create__group--label">{{ $t('settings.education.college') }}</label>
          <div class="settings__add">
            <div v-for="college in colleges" :key="college">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.college_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <div class="settings__add--wrapper">
                <button
                  class="settings__add--btn"
                  type="button"
                  @click="colleges !== 4 ? colleges++ : (colleges = 4)"
                  v-if="college === colleges && colleges !== 4"
                >
                  <PlusIcon /> <span>{{ $t('settings.education.college_add') }}</span>
                </button>
                <button
                  type="button"
                  class="settings__add--delete"
                  @click="colleges !== 1 && colleges--"
                >
                  <DeleteIcon /> <span>{{ $t('buttons.delete') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <label class="create__group--label">{{ $t('settings.education.university') }}</label>
          <div class="settings__add">
            <div v-for="university in universities" :key="university">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.university_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <div class="settings__add--wrapper">
                <button
                  class="settings__add--btn"
                  type="button"
                  @click="universities !== 4 ? universities++ : (universities = 4)"
                  v-if="university === universities && universities !== 4"
                >
                  <PlusIcon /> <span>{{ $t('settings.education.university_add') }}</span>
                </button>
                <button
                  type="button"
                  class="settings__add--delete"
                  @click="universities !== 1 && universities--"
                >
                  <DeleteIcon /> <span>{{ $t('buttons.delete') }}</span>
                </button>
              </div>
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
import EducationIcon from '@/components/icons/settings/EducationIcon.vue'
import DeleteIcon from '@/components/icons/settings/DeleteIcon.vue'
import PlusIcon from '@/components/icons/settings/PlusIcon.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import { ref } from 'vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'
const emit = defineEmits(['handleSelectNav'])
const schools = ref(1)
const colleges = ref(1)
const universities = ref(1)
</script>

<style lang="scss" scoped>
.settings__add {
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 767px) {
    width: 100%;
    .create__group--input {
      margin-bottom: 16px;
    }
  }
  &--wrapper {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-top: 16px;
  }
  &--btn {
    display: flex;
    background: none;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 0;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-hippie-blue);
    }
  }
  &--delete {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    gap: 12px;

    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-valencia);
      transition: all 0.3s;
      letter-spacing: 0px;
    }
  }
}
</style>
