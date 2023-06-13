<template>
  <header class="header">
    <nav class="navbar">
      <div class="right__nav--side">
        <button type="button" class="menu__button" @click="toggleSidebar">
          <menu-icon></menu-icon>
        </button>
        <main-page-logo class="main__logo"></main-page-logo>
      </div>
      <div>
        <sample-button class="create__button">{{ $t('buttons.create') }}</sample-button>
      </div>
      <div>
        <search-input :placeholder="$t('placeholders.search_input')"></search-input>
      </div>
      <div class="right__nav--side">
        <ul class="navbar__right--buttons">
          <li class="music__button">
            <music-icon></music-icon>
          </li>
          <li class="email__button">
            <email-icon></email-icon>
          </li>
          <li class="notification__button">
            <notification-icon></notification-icon>
          </li>
          <router-link :to="`/${$i18n.locale}/settings`">
            <li class="settings__button">
              <setting-icon></setting-icon>
            </li>
          </router-link>
        </ul>
        <div class="user__menu--block">
          <div class="profile__image">
            <img
              src="@/assets/images/woman.svg"
              alt="avatar-logo"
              width="48"
              height="48"
            >
          </div>
          <arrow-icon class="dropdown__icon"></arrow-icon>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import MainPageLogo from '@/components/ui/MainPageLogo.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MusicIcon from '@/components/icons/MusicIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'

export default {
  components: {
    ArrowIcon,
    SettingIcon,
    NotificationIcon,
    EmailIcon,
    MusicIcon,
    MenuIcon,
    SearchInput,
    SampleButton,
    MainPageLogo
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggle-sidebar')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  height: 80px;
  top: 0;
  width: 100%;
  transform: translateY(0);
  transition: transform 0.3s ease;
  background-color: #fff;
}

.right__nav--side {
  display: flex;
}

.right__nav--side {
  display: flex;
  align-items: center;
}

.navbar__right--buttons {
  display: flex;
  align-items: center;
}

.music__button,
.email__button,
.notification__button,
.settings__button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F1F1F1;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin: 0 6px;
}

.menu__button,
.music__button,
.email__button,
.notification__button,
.settings__button {
  display: flex;
  border: none;
  outline: none;
  cursor: pointer;
}

.menu__button {
  background-color: #fff;
  margin: 24px;
}

.main__logo {
  min-width: 151px;
}

.create__button {
  padding: 11px;
  width: 159px;
  max-height: 40px;
}

.user__menu--block {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.profile__image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.dropdown__icon {
  position: absolute;
  bottom: 0;
  right: 0;
}

@media (min-width: 768px) {
  .user__menu--block {
    margin-right: 24px;
  }
}

@media (min-width: 1200px) {
  .user__menu--block {
    margin-right: 45px;
  }
}
</style>
