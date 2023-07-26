<template>
  <header class="header">
    <nav class="navbar">
      <div class="right__nav--side">
        <button type="button" class="menu__button" @click="toggleSidebar">
          <MenuIcon />
        </button>
        <MainPageLogo class="main__logo" />
      </div>
      <div class="main__nav--side">
        <SampleButton
          class="create__button"
          :title="`${ $t('buttons.create') }`"
        />
        <SearchInput :placeholder="$t('placeholders.search_input')" />
      </div>
      <div class="left__nav--side">
        <ul class="navbar__right--buttons">
          <li class="music__button">
            <MusicIcon />
          </li>
          <li class="email__button">
            <EmailIcon />
          </li>
          <li class="notification__button">
            <NotificationIcon />
          </li>
          <router-link :to="`/${$i18n.locale}/settings`">
            <li class="settings__button">
              <SettingIcon />
            </li>
          </router-link>
        </ul>
        <div class="user__menu--block">
          <div class="profile__image">
            <img
              src="@/assets/images/Article_Author.png"
              alt="avatar-logo"
              width="48"
              height="48"
            >
          </div>
          <ArrowIcon class="dropdown__icon" />
        </div>
      </div>
    </nav>
    <nav class="small-nav">
      <div class="top__nav">
        <ul class="top__nav--list">
          <li class="top__nav--item"><LoupeIcon/></li>
          <li class="top__nav--item"><SunnyIcon/></li>
          <li class="top__nav--item"><SunnyIcon/></li>
          <li class="top__nav--item"><SmallMenuIcon/></li>
        </ul>
      </div>
      <div class="bottom__nav">
        <ul class="bottom__nav--list">
          <li class="bottom__nav--item"><NewsIcon/></li>
          <li class="bottom__nav--item"><MessagesIcon/></li>
          <li class="bottom__nav--item"><MessagesIcon/></li>
          <li class="bottom__nav--item"><MyPageIcon/></li>
        </ul>
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
import LoupeIcon from '@/components/icons/navbar/small-display/LoupeIcon.vue'
import SunnyIcon from '@/components/icons/navbar/small-display/SunnyIcon.vue'
import NewsIcon from '@/components/icons/navbar/small-display/NewsIcon.vue'
import MessagesIcon from '@/components/icons/navbar/small-display/MessagesIcon.vue'
import SmallMenuIcon from '@/components/icons/navbar/small-display/MenuIcon.vue'
import MyPageIcon from '@/components/icons/navbar/small-display/MyPageIcon.vue'

export default {
  components: {
    MenuIcon,
    MyPageIcon,
    MessagesIcon,
    NewsIcon,
    SunnyIcon,
    LoupeIcon,
    ArrowIcon,
    SettingIcon,
    NotificationIcon,
    EmailIcon,
    MusicIcon,
    SmallMenuIcon,
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

<style scoped lang="scss">
.small-nav {
  display: none;
}

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
  background-color: var(--color-white);
}

.right__nav--side,
.left__nav--side {
  display: flex;
  align-items: center;
}

.main__nav--side {
  display: flex;
  gap: 100px;
}

.navbar__right--buttons {
  display: flex;
  align-items: center;
  padding: 0;
}

.music__button,
.email__button,
.notification__button,
.settings__button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-seashell);
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
  background-color: var(--color-white);
  margin: 24px;
}

.main__logo {
  min-width: 151px;
}

.create__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  width: 159px;
  max-height: 40px;
}

.user__menu--block {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 65px;
  margin-right: 45px;
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

@media (max-width: 767px) {
  .bottom__nav,
  .top__nav {}

  .top__nav--list {
    box-shadow: 0 2px 3px rgba(141, 152, 180, 0.30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    height: 64px;
    width: 100%;
    list-style: none;
    padding: 0 32px;
    background-color: var(--color-white);
    margin: 0;
  }

  .bottom__nav--list {
    box-shadow: 0 -2px 3px rgba(141, 152, 180, 0.30);
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    height: 64px;
    width: 100%;
    list-style: none;
    padding: 0 32px;
    background-color: var(--color-white);
    margin: 0;
  }

  .top__nav--item,
  .bottom__nav--item {
    display: flex;
  }

  .small-nav {
    display: flex;
  }

  .navbar {
    display: none;
  }

  .user__menu--block {
    margin-right: 24px;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .small-nav {
    display: none;
  }

  .navbar {
    display: flex;
  }

  .user__menu--block {
    margin-right: 45px;
    margin-left: 64px;
  }
}
</style>
