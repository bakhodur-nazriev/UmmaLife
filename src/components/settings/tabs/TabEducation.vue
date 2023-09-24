<template>
  <div class="tab">
    <SettingsInfo>
      <template #icon>
        <EducationIcon />
      </template>
      <template #title>Образование</template>
      <template #text>
        В разделе "Образование и работа" вы можете указать информацию о вашем образовании и
        занимаемой должности. Это поможет другим пользователям лучше понять вашу академическую и
        профессиональную сферу интересов.
      </template>
    </SettingsInfo>
    <form class="settings__form create__group">
      <div class="create__group--block">
        <div class="create__group--form pt-0 create__group--form-text">
          <label class="create__group--label">Школа</label>
          <div class="settings__add">
            <div v-for="school in schools" :key="school">
              <input
                type="text"
                class="create__group--input pt-0"
                placeholder="Введите название вашей школы"
              />
              <BaseCheckbox label="Закончил" />
              <button
                class="settings__add--btn"
                type="button"
                @click="schools !== 4 ? schools++ : (schools = 4)"
                v-if="school === schools && schools !== 4"
              >
                <PlusIcon /> <span>Добавить школу</span>
              </button>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text">
          <label class="create__group--label">Колледж</label>
          <div class="settings__add">
            <div v-for="college in colleges" :key="college">
              <input
                type="text"
                class="create__group--input pt-0"
                placeholder="Введите название вашего колледжа"
              />
              <BaseCheckbox label="Закончил" />
              <button
                class="settings__add--btn"
                type="button"
                @click="colleges !== 4 ? colleges++ : (colleges = 4)"
                v-if="college === colleges && colleges !== 4"
              >
                <PlusIcon /> <span>Добавить колледж</span>
              </button>
            </div>
          </div>
        </div>
        <div class="create__group--form create__group--form-text pb-0">
          <label class="create__group--label">Университет</label>
          <div class="settings__add">
            <div v-for="university in universities" :key="university">
              <input
                type="text"
                class="create__group--input pt-0"
                placeholder="Введите название вашего университета"
              />
              <BaseCheckbox label="Закончил" />
              <button
                class="settings__add--btn"
                type="button"
                @click="universities !== 4 ? universities++ : (universities = 4)"
                v-if="university === universities && universities !== 4"
              >
                <PlusIcon /> <span>Добавить университет</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="create__group--actions">
        <button type="submit" class="create__group--btn submit">Сохранить</button>
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
