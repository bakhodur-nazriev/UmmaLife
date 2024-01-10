<template>
  <div class="locales" ref="container">
    <button
        type="button"
        class="locales__button"
        :class="isRTL ? 'rtl' : 'ltr'"
        @click="handleButtonClick"
    >
      <global-icon class="locales__icon"/>
      <span class="locales__title">{{ currentLanguageName }}</span>
      <dropdown-icon :class="isRTL ? 'rtl' : 'ltr'" class="locales__icon locales__icon--dropdown"/>
    </button>

    <ul :class="isRTL ? 'rtl' : 'ltr'" class="locales__list" :data-locale="$t('languages.title')">
      <li class="locales__item" v-for="language in supportedLanguages" :key="language.code">
        <router-link class="locales__link" :to="getLocalizedLink(language.code)">
          {{ language.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import GlobalIcon from '@/components/icons/GlobalIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'

export default {
  components: {
    GlobalIcon,
    DropdownIcon
  },
  computed: {
    currentLanguageName() {
      return this.$i18n.t('languages.title')
    },
    isRTL() {
      return this.$i18n.locale === 'ar'
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
  methods: {
    handleButtonClick() {
      const container = this.$refs.container
      if (!container) {
        return
      }

      const handleDocumentClick = (evt) => !evt.target.closest('.locales') && closeDropdown()
      const handleEscapeKeydown = (evt) => evt.keyCode === 27 && closeDropdown()
      const openDropdown = () => {
        this.$refs.container.classList.add('locales--shown')
        document.addEventListener('click', handleDocumentClick)
        document.addEventListener('keydown', handleEscapeKeydown)
      }
      const closeDropdown = () => {
        this.$refs.container.classList.remove('locales--shown')
        document.removeEventListener('click', handleDocumentClick)
        document.removeEventListener('keydown', handleEscapeKeydown)
      }
      !this.$refs.container.classList.contains('locales--shown') ? openDropdown() : closeDropdown()
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
.locales {
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(31, 31, 31, 0.3);
    backdrop-filter: blur(3px);
    transition: 0.3s;
    opacity: 0;
    pointer-events: none;
  }

  &--shown::before {
    opacity: 1;
    z-index: 2;
  }

  &__button {
    display: flex;
    align-items: center;
    background-color: var(--color-white);
    border: 4px solid var(--color-seashell);
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

    &__title {
      line-height: 1.2;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  &__icon {
    display: inline-block;
    min-width: max-content;
    color: var(--color-silver-chalice);

    &--dropdown {
      margin-left: auto;
      transition: 0.3s;
    }
  }

  &__list {
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 100%;
    background: var(--color-seashell);
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.15);
    border-radius: 20px 20px 0 0;
    width: 100%;
    margin: 0;
    list-style: none;
    padding: 16px;
    gap: 4px;
    z-index: 3;

    &::before {
      content: attr(data-locale);
      font-weight: 500;
      margin-bottom: 12px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: var(--color-white);
    padding: 8px 16px;
  }

  &__link {
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-mine-shaft);
  }
}

.locales--shown .locales__icon--dropdown {
  transform: scaleY(-1);
}

.locales--shown .locales__list {
  transform: translateY(-100%);
  visibility: visible;
  opacity: 1;
}

.rtl {
  direction: rtl;
  margin: 0 auto 0 0;
}

@media (min-width: 768px) {
  .locales {
    position: relative;
  }

  .locales::before {
    display: none;
  }

  .locales__button {
    position: relative;
    z-index: 5;
    font-size: 14px;
    line-height: 1;
  }

  .locales__list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    gap: 0;
    background-color: var(--color-white);
    padding: 40px 8px 0 8px;
    border-radius: 20px;
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
