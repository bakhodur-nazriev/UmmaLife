<template>
  <div class="toggle__block">
    <button
      type="button"
      class="toggle__button"
      :class="{ active: selectedTheme === 'light' }"
      @click="toggleTheme('light')"
    >
      <sunny-icon class="toggle__button--icon"></sunny-icon>
      {{ $t('toggle_theme.light') }}
    </button>
    <button
      type="button"
      class="toggle__button"
      :class="{ active: selectedTheme === 'dark' }"
      @click="toggleTheme('dark')"
    >
      <moon-icon class="toggle__button--icon"></moon-icon>
      {{ $t('toggle_theme.dark') }}
    </button>
  </div>
</template>

<script>
import SunnyIcon from '@/components/icons/SunnyIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'

export default {
  components: {
    MoonIcon,
    SunnyIcon
  },
  data () {
    return {
      selectedTheme: 'light' // Изначально выбрана светлая тема
    }
  },
  methods: {
    toggleTheme (theme) {
      this.selectedTheme = theme
      // Здесь вы можете вызвать соответствующую функцию для изменения темы
      // Например, можете использовать Vuex для хранения выбранной темы и применения ее в приложении
    }
  }
}
</script>

<style scoped>
.toggle__block {
  display: flex;
  background-color: var(--color-background);
  padding: 2px;
  height: 44px;
  border-radius: 8px;
}

.toggle__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.4s;
}

.toggle__button.active {
  background-color: #ffffff;
}

.toggle__button--icon {
  margin-right: 8px;
}
</style>
