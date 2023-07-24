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
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('en')">{{ $t('languages.names.english') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ar')">{{ $t('languages.names.arabic') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ru')">{{ $t('languages.names.russian') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('tr')">{{ $t('languages.names.turkish') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('uz')">{{ $t('languages.names.uzbek') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('id')">{{ $t('languages.names.indonesia') }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ms')">{{ $t('languages.names.malay') }}</a>
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
    currentLanguageName () {
      return this.$i18n.t('languages.title')
    },
    isRTL () {
      return this.$i18n.locale === 'ar'
    }
  },
  methods: {
    handleButtonClick () {
      const container = this.$refs.container
      if (!container) {
        return
      }

      const handleDocumentClick = (evt) => !evt.target.closest('.locales') && closeDropdown()
      const handleEscapeKeydown = (evt) => (evt.keyCode === 27) && closeDropdown()
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
    getLocalizedLink (lang) {
      const currentPath = this.$route.path
      const languagePrefix = '/' + this.$i18n.locale
      const newPath = currentPath.replace(languagePrefix, '')
      switch (lang) {
        case 'en':
          return '/en' + newPath
        case 'ar':
          return '/ar' + newPath
        case 'ru':
          return '/ru' + newPath
        case 'tr':
          return '/tr' + newPath
        case 'uz':
          return '/uz' + newPath
        case 'id':
          return '/id' + newPath
        case 'ms':
          return '/ms' + newPath
      }
    }
  }
}
</script>

<style scoped lang="scss">
.locales {
  z-index: 1;

  &::before {
    content: "";
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
    min-height: 48px;
    padding: 8px 16px;
  }

  &__link {
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    color: inherit;
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
    min-height: 0;
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
