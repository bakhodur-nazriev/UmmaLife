<template>
  <div class="tab">
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
          <label class="create__group--label">{{ $t('settings.education.scholl') }}</label>
          <div class="settings__add">
            <div v-for="school in schools" :key="school">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.scholl_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <button
                class="settings__add--btn"
                type="button"
                @click="schools !== 4 ? schools++ : (schools = 4)"
                v-if="school === schools && schools !== 4"
              >
                <PlusIcon /> <span>{{ $t('settings.education.scholl_add') }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text">
          <label class="create__group--label">{{ $t('settings.education.colledge') }}</label>
          <div class="settings__add">
            <div v-for="college in colleges" :key="college">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.colledge_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <button
                class="settings__add--btn"
                type="button"
                @click="colleges !== 4 ? colleges++ : (colleges = 4)"
                v-if="college === colleges && colleges !== 4"
              >
                <PlusIcon /> <span>{{ $t('settings.education.colledge_add') }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <label class="create__group--label">{{ $t('settings.education.univercity') }}</label>
          <div class="settings__add">
            <div v-for="university in universities" :key="university">
              <input
                type="text"
                class="create__group--input pt-0"
                :placeholder="$t('settings.education.univercity_placeholder')"
              />
              <BaseCheckbox :label="$t('settings.education.completed')" />
              <button
                class="settings__add--btn"
                type="button"
                @click="universities !== 4 ? universities++ : (universities = 4)"
                v-if="university === universities && universities !== 4"
              >
                <PlusIcon /> <span>{{ $t('settings.education.univercity_add') }}</span>
              </button>
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
import PlusIcon from '@/components/icons/settings/PlusIcon.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import SettingsInfo from '@/components/settings/SettingsInfo.vue'
import { ref } from 'vue'
const schools = ref(1)
const colleges = ref(1)
const universities = ref(1)
</script>

<style lang="scss" scoped>
.settings__add {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &--btn {
    margin-top: 16px;
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
}
</style>
