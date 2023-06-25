<template>
  <div class="toggle__block">
    <button
      v-if="!isSidebarCollapsed || selectedTheme === 'light'"
      type="button"
      class="toggle__button"
      :class="{ active: selectedTheme === 'light', 'collapsed': isSidebarCollapsed }"
      @click="toggleTheme(!isSidebarCollapsed ? 'light' : 'dark')"
    >
      <sunny-icon class="toggle__button--icon"></sunny-icon>
      {{ isSidebarCollapsed ? '' : $t('buttons.toggle_theme.light') }}
    </button>
    <button
      v-if="!isSidebarCollapsed || selectedTheme === 'dark'"
      type="button"
      class="toggle__button"
      :class="{ active: selectedTheme === 'dark', 'collapsed': isSidebarCollapsed }"
      @click="toggleTheme(!isSidebarCollapsed ? 'dark' : 'light')"
    >
      <moon-icon class="toggle__button--icon"></moon-icon>
      {{ isSidebarCollapsed ? '' : $t('buttons.toggle_theme.dark') }}
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
  props: {
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    selectedTheme: {
      get () {
        return this.$store.state.selectedTheme
      },
      set (theme) {
        this.$store.commit('setSelectedTheme', theme)
      }
    }
  },
  methods: {
    toggleTheme (theme) {
      if (this.selectedTheme === theme && !this.isSidebarCollapsed) {
        this.$store.commit('setSelectedTheme', null)
      } else {
        this.$store.commit('setSelectedTheme', theme)
      }
    }
  }
}
</script>

<style scoped>
.toggle__block {
  display: flex;
  background-color: var(--color-seashell);
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

.toggle__button.collapsed {
  width: 100%;
}

.toggle__button.collapsed .toggle__button--icon {
  margin-right: 0;
}

.toggle__button.active {
  background-color: #ffffff;
  color: #000;
}

.toggle__button {
  color: #B0B0B0;
}

.toggle__button .toggle__button--icon {
  color: #B0B0B0;
}

.toggle__button.active .toggle__button--icon {
  color: #00819D;
}

.toggle__button--icon {
  margin-right: 8px;
}
</style>
