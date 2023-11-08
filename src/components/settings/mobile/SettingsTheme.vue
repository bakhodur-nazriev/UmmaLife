<template>
  <div class="tab">
    <div class="settings__header">
      <div class="settings__header--back" @click="emit('handleSelectNav', 'main')">
        <SettingsBackIcon />
      </div>
      <div class="settings__header--text">{{ $t('settings.account.theme') }}</div>
      <div class="settings__header--ready">{{ $t('settings.account.ready') }}</div>
    </div>
    <div class="theme__wrapper">
      <label
        class="theme__list"
        v-for="(theme, i) in themes"
        :key="theme.name"
        @click="handleCheck(i)"
      >
        <div class="theme__list--left">
          <component :is="theme.icon" :isChecked="theme.isChecked" />
          <span>{{ $t(theme.name) }}</span>
        </div>

        <div class="mobile-select--radio">
          <input type="radio" name="radio" :checked="theme.isChecked" />
          <div class="mobile-select--radio-input"></div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import SettingsBackIcon from '@/components/icons/settings/SettingsBackIcon.vue'

const emit = defineEmits(['handleSelectNav'])

const themes = ref([
  {
    isChecked: true,
    name: 'themes.system',
    icon: 'system-icon'
  },
  {
    isChecked: false,
    name: 'themes.light',
    icon: 'light-icon'
  },
  {
    isChecked: false,
    name: 'themes.dark',
    icon: 'dark-icon'
  }
])

const handleCheck = (index) => {
  themes.value = themes.value.map((theme) => {
    return {
      ...theme,
      isChecked: false
    }
  })

  themes.value[index].isChecked = true
}
</script>

<script>
import SystemIcon from '@/components/icons/themes/SystemIcon.vue'
import LightIcon from '@/components/icons/themes/LightIcon.vue'
import DarkIcon from '@/components/icons/themes/DarkIcon.vue'
export default {
  components: { SystemIcon, LightIcon, DarkIcon }
}
</script>

<style lang="scss">
.theme__wrapper {
  padding: 0 16px;
}
.theme__list {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-seashell);
  }
  &--left {
    display: flex;
    align-items: center;
    gap: 16px;
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }
}
</style>
