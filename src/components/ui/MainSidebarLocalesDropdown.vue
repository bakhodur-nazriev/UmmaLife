<template>
  <div ref="container" class="main__sidebar--locales">
    <button
      type="button"
      class="locales__button"
      :class="{ active: isSidebarCollapsed }"
      @click="handleButtonClick"
    >
      <global-icon class="locales__icon"/>
      <span v-if="!isSidebarCollapsed" class="dropdown__locale-title">{{
          currentLanguageName
        }}</span>
      <dropdown-icon class="locales__icon locales__icon--dropdown"/>
    </button>
    <ul class="locales__list" :class="{ active: isSidebarCollapsed }" ref="list">
      <li class="locales__item" v-for="language in supportedLanguages" :key="language.code">
        <a class="locales__link" :href="getLocalizedLink(language.code)">
          {{ language.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import GlobalIcon from '@/components/icons/GlobalIcon.vue'

export default {
  components: {
    GlobalIcon,
    DropdownIcon
  },
  props: {
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      supportedLanguages: [
        {
          code: 'en',
          title: this.$t('languages.name.english')
        },
        {
          code: 'ar',
          title: this.$t('languages.name.arabic')
        },
        {
          code: 'ru',
          title: this.$t('languages.name.russian')
        },
        {
          code: 'tr',
          title: this.$t('languages.name.turkish')
        },
        {
          code: 'uz',
          title: this.$t('languages.name.uzbek')
        },
        {
          code: 'id',
          title: this.$t('languages.name.indonesia')
        },
        {
          code: 'ms',
          title: this.$t('languages.name.malay')
        },
        {
          code: 'tj',
          title: this.$t('languages.name.tajik')
        },
        {
          code: 'tab',
          title: this.$t('languages.name.tabasaran')
        },
        {
          code: 'cv',
          title: this.$t('languages.name.chuvash')
        },
        {
          code: 'ur',
          title: this.$t('languages.name.urdu')
        },
        {
          code: 'inh',
          title: this.$t('languages.name.ingush')
        },
        {
          code: 'tt',
          title: this.$t('languages.name.tatar')
        },
        {
          code: 'lak',
          title: this.$t('languages.name.lak')
        },
        {
          code: 'kum',
          title: this.$t('languages.name.qumuq')
        },
        {
          code: 'krc',
          title: this.$t('languages.name.balkarian')
        },
        {
          code: 'am',
          title: this.$t('languages.name.amharic')
        },
        {
          code: 'lez',
          title: this.$t('languages.name.lezgin')
        }
      ]
    }
  },
  computed: {
    currentLanguageName() {
      return this.$i18n.t('languages.title')
    }
  },
  methods: {
    handleButtonClick() {
      const list = this.$refs.list
      const container = this.$refs.container

      if (!list || !container) {
        return
      }

      if (!container.classList.contains('locales--shown')) {
        this.openDropdown()
      } else {
        this.closeDropdown()
      }
    },
    openDropdown() {
      const list = this.$refs.list
      const container = this.$refs.container

      if (!list || !container) {
        return
      }

      this.$refs.container.classList.add('locales--shown')
      this.$refs.list.style.display = 'flex'
      document.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('keydown', this.handleEscapeKeydown)
    },
    closeDropdown() {
      const list = this.$refs.list
      const container = this.$refs.container

      if (!list || !container) {
        return
      }

      this.$refs.container.classList.remove('locales--shown')
      this.$refs.list.style.display = 'none'
      document.removeEventListener('click', this.handleDocumentClick)
      document.removeEventListener('keydown', this.handleEscapeKeydown)
    },
    handleDocumentClick(evt) {
      return !evt.target.closest('.main__sidebar--locales') && this.closeDropdown()
    },
    handleEscapeKeydown(evt) {
      return evt.keyCode === 27 && this.closeDropdown()
    },
    getLocalizedLink(lang) {
      const languagePaths = {
        en: '/en',
        ar: '/ar',
        ru: '/ru',
        tr: '/tr',
        uz: '/uz',
        id: '/id',
        ms: '/ms',
        tj: '/tj',
        tab: '/tab',
        cv: '/cv',
        ur: '/ur',
        inh: '/inh',
        tt: '/tt',
        lak: '/lak',
        kum: '/kum',
        krc: '/krc',
        am: '/am',
        lez: '/lez'
      };

      const currentPath = this.$route.path;
      const newPath = currentPath.replace(`/${this.$i18n.locale}`, '');

      if (languagePaths.hasOwnProperty(lang)) {
        return languagePaths[lang] + newPath;
      } else {
        return currentPath;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main__sidebar--locales {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.locales--shown {
  &::before {
    opacity: 1;
    z-index: 2;
  }
}

.locales__button {
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border: 2px solid var(--color-seashell);
  border-radius: 20px;
  min-height: 40px;
  padding: 8px 16px;
  gap: 8px;
  font-size: 14px;
  line-height: 1;
  color: var(--color-mine-shaft);
  width: 155px;
  cursor: pointer;
  z-index: 3;
}

.locales__button.active {
  width: 60px;
  height: 40px;
  padding: 8px;
}

.locales__button span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.locales__icon {
  display: inline-block;
  min-width: max-content;
  color: var(--color-silver-chalice);
  transform: rotate(180deg);
}

.locales__icon--dropdown {
  margin-left: auto;
  transition: 0.3s;
}

.locales--shown .locales__icon--dropdown {
  transform: rotate(180deg) scaleY(-1);
}

.locales__list {
  display: flex;
  opacity: 0;
  transition: 0.3s;
  flex-direction: column;
  width: max-content;
}

.locales--shown .locales__list {
  transform: translateY(-100%);
  visibility: visible;
  opacity: 1;
}

.locales__list {
  &::before {
    content: attr(data-locale);
    font-weight: 500;
    margin-bottom: 12px;
  }
}

.locales__item {
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: var(--color-white);
  padding: 8px 16px;
}

.locales__list.active .locales__item {
  display: flex;
  justify-content: center;
}

.locales__link {
  text-decoration: none;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-mine-shaft);
}

.dropdown__locale-title {
  line-height: 1.2;
}

@media (min-width: 768px) {
  .locales__button {
    position: relative;
    z-index: 5;
    font-size: 14px;
    line-height: 1;
  }

  .locales__list {
    display: none;
    position: absolute;
    left: 52px;
    bottom: 25px;
    width: 155px;
    border: 2px solid var(--color-seashell);
    background-color: var(--color-white);
    padding: 0 8px;
    border-radius: 20px;
    z-index: 3;
    max-height: 280px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(
          transparent 15%,
          var(--color-secondary) 15%,
          var(--color-secondary) 85%,
          transparent 85%
      );
    }
  }

  .locales__list.active {
    display: none;
    position: absolute;
    left: 0;
    bottom: 25px;
    width: 100%;
    border: 2px solid var(--color-seashell);
    background-color: var(--color-white);
    padding: 2px 8px;
    border-radius: 20px;
    z-index: 3;
  }

  .locales--shown .locales__list {
    transform: none;
  }

  .locales__list::before {
    display: none;
  }

  .locales__item {
    background-color: transparent;
    padding: 12px;
  }

  .locales__item:not(:last-child) {
    border-bottom: 1px solid var(--color-alto-second);
    border-radius: 0;
  }

  .locales__link {
    font-size: 14px;
    line-height: 1;
  }
}
</style>
