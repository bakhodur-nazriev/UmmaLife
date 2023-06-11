<template>
  <div ref="container" class="main__sidebar--locales">
    <button
      type="button"
      class="locales__button"
      :class="{ active: isSidebarCollapsed }"
      @click="handleButtonClick"
    >
      <global-icon class="locales__icon"/>
      <span v-if="!isSidebarCollapsed" class="dropdown__locale-title">{{ currentLanguageName }}</span>
      <dropdown-icon class="locales__icon locales__icon--dropdown"/>
    </button>
    <ul class="locales__list" :class="{ active: isSidebarCollapsed }" ref="list">
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('en')">{{ `${isSidebarCollapsed ? 'En' : $t('languages.names.english')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ar')">{{ `${isSidebarCollapsed ? 'Ar' : $t('languages.names.arabic')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ru')">{{ `${isSidebarCollapsed ? 'Ru' : $t('languages.names.russian')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('tr')">{{ `${isSidebarCollapsed ? 'Tr' : $t('languages.names.turkish')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('uz')">{{ `${isSidebarCollapsed ? 'Uz' : $t('languages.names.uzbek')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('id')">{{ `${isSidebarCollapsed ? 'Id' : $t('languages.names.indonesia')}` }}</a>
      </li>
      <li class="locales__item">
        <a class="locales__link" :href="getLocalizedLink('ms')">{{ `${isSidebarCollapsed ? 'Ms' : $t('languages.names.malay')}` }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import GlobalIcon from '@/components/icons/GlobalIcon.vue'

export default {
  components: {
    GlobalIcon, DropdownIcon
  },
  props: {
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentLanguageName () {
      return this.$i18n.t('languages.title')
    }
  },
  methods: {
    handleButtonClick () {
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
    openDropdown () {
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
    closeDropdown () {
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
    handleDocumentClick (evt) {
      return !evt.target.closest('.main__sidebar--locales') && this.closeDropdown()
    },
    handleEscapeKeydown (evt) {
      return (evt.keyCode === 27) && this.closeDropdown()
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

<style scoped>
.main__sidebar--locales {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.locales--shown::before {
  opacity: 1;
  z-index: 2;
}

.locales__button {
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid #F1F1F1;
  border-radius: 20px;
  min-height: 40px;
  padding: 8px 16px;
  gap: 8px;
  font-size: 14px;
  line-height: 1;
  color: #1f1f1f;
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
  color: #b0b0b0;
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
 }

.locales--shown .locales__list {
  transform: translateY(-100%);
  visibility: visible;
  opacity: 1;
}

.locales__list::before {
  content: attr(data-locale);
  font-weight: 500;
  margin-bottom: 12px;
}

.locales__item {
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  min-height: 48px;
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
  color: inherit;
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
    left: 42px;
    bottom: 125px;
    width: 155px;
    border: 2px solid #F1F1F1;
    background-color: white;
    padding: 0 8px;
    border-radius: 20px;
    z-index: 3;
  }

  .locales__list.active {
    display: none;
    position: absolute;
    left: 0;
    bottom: 125px;
    width: 100%;
    border: 2px solid #F1F1F1;
    background-color: white;
    padding: 2px 8px;
    border-radius: 20px;
    z-index: 3;
  }

  .locales--shown .locales__list {
    transform: none;
  }

  .locales__list::before  {
    display: none;
  }

  .locales__item {
    background-color: transparent;
    padding: 12px;
    min-height: 0;
  }

  .locales__item:not(:last-child) {
    border-bottom: 1px solid #D9D9D9;
    border-radius: 0;
  }

  .locales__link {
    font-size: 14px;
    line-height: 1;
  }
}
</style>
