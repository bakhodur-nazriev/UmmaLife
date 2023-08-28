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
        <SampleButton class="create__button" :title="`${$t('buttons.create')}`" />
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
            <img src="@/assets/images/Article_Author.png" alt="avatar-logo" />
          </div>
          <ArrowIcon class="dropdown__icon" />
        </div>
      </div>
    </nav>

    <nav class="small-nav">
      <div class="top__nav">
        <ul class="top__nav--list">
          <li class="top__nav--left-item">
            <router-link v-if="!isSearchForm" to="/news"><SmallLogo /></router-link>
            <button
              v-if="isSearchForm"
              type="button"
              @click="isSearchFormClose"
              class="close-search__form"
            >
              <ArrowLeftIcon />
            </button>
          </li>

          <li class="top__nav--search-item" v-if="isSearchForm">
            <SearchInput :placeholder="$t('placeholders.search_input')"/>
          </li>

          <li class="top__nav--right-item" v-if="!isSearchForm">
            <div v-if="!isSearchForm" @click="isSearchFormOpen"><LoupeIcon /></div>
            <div><SmallMenuIcon /></div>
          </li>
        </ul>
      </div>

      <SearchTab :tabs="tabData" v-if="isSearchForm">
        <template v-for="(tab, i) in tabData" v-slot:[tab.label]="" :key="i">
          <TabAll v-if="i === 0" />
          <TabPeople v-if="i === 1" />
          <TabCommunities v-if="i === 2" />
          <TabMUVI v-if="i === 3" />
          <TabArticle v-if="i === 4" />
          <TabVideo v-if="i === 5" />
          <TabAudio v-if="i === 6" />
          <TabHashtags v-if="i === 7" />
        </template>
      </SearchTab>

      <div class="bottom__nav">
        <ul class="bottom__nav--list">
          <li class="bottom__nav--item">
            <router-link to="to"><NewsIcon /></router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link to=""><MessagesIcon /></router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link to=""><BellIcon /></router-link>
          </li>
          <li class="bottom__nav--item">
            <router-link to=""><MyPageIcon /></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchInput from '@/components/ui/SearchInput.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import MainPageLogo from '@/components/ui/Logo/MainPageLogo.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MusicIcon from '@/components/icons/MusicIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import NotificationIcon from '@/components/icons/NotificationIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import LoupeIcon from '@/components/icons/navbar/small-display/LoupeIcon.vue'
import NewsIcon from '@/components/icons/navbar/small-display/NewsIcon.vue'
import MessagesIcon from '@/components/icons/navbar/small-display/MessagesIcon.vue'
import SmallMenuIcon from '@/components/icons/navbar/small-display/MenuIcon.vue'
import MyPageIcon from '@/components/icons/navbar/small-display/MyPageIcon.vue'
import SmallLogo from '@/components/ui/Logo/SmallPageLogo.vue'
import BellIcon from '@/components/icons/navbar/small-display/BellIcon.vue'
import ArrowLeftIcon from '@/components/icons/navbar/small-display/ArrowIcon.vue'
import SearchTab from '@/components/ui/SearchTab.vue'
import TabAll from '@/components/layouts/SearchComponents/TabAll.vue'
import TabPeople from '@/components/layouts/SearchComponents/TabPeople.vue'
import TabCommunities from '@/components/layouts/SearchComponents/TabCommunities.vue'
import TabMUVI from '@/components/layouts/SearchComponents/TabMUVI.vue'
import TabArticle from '@/components/layouts/SearchComponents/TabArticle.vue'
import TabVideo from '@/components/layouts/SearchComponents/TabVideo.vue'
import TabAudio from '@/components/layouts/SearchComponents/TabAudio.vue'
import TabHashtags from '@/components/layouts/SearchComponents/TabHashtags.vue'

export default {
  components: {
    TabVideo,
    TabAudio,
    TabHashtags,
    TabArticle,
    TabMUVI,
    TabCommunities,
    TabPeople,
    TabAll,
    SearchTab,
    ArrowLeftIcon,
    BellIcon,
    SmallLogo,
    MenuIcon,
    MyPageIcon,
    MessagesIcon,
    NewsIcon,
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
  data() {
    return {
      isMenuOpen: false,
      isSearchForm: true,
      tabData: [
        {
          label: this.$t('tabs.search.all'),
          content: 'Content for Tab 1'
        },
        {
          label: this.$t('tabs.search.people'),
          content: 'Content for Tab 2'
        },
        {
          label: this.$t('tabs.search.communities'),
          content: 'Content for Tab 3'
        },
        {
          label: this.$t('tabs.search.muvi'),
          content: 'Content for Tab 4'
        },
        {
          label: this.$t('tabs.search.article'),
          content: 'Content for Tab 5'
        },
        {
          label: this.$t('tabs.search.video'),
          content: 'Content for Tab 6'
        },
        {
          label: this.$t('tabs.search.audio'),
          content: 'Content for Tab 7'
        },
        {
          label: this.$t('tabs.search.hashtags'),
          content: 'Content for Tab 8'
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar')
    },
    isSearchFormOpen() {
      this.isSearchForm = true
    },
    isSearchFormClose() {
      this.isSearchForm = false
    }
  }
}
</script>

<style scoped lang="scss">
.bottom__nav--item {
  a {
    display: flex;
    align-items: center;
  }
}

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
  z-index: 10;
}

.right__nav--side,
.left__nav--side {
  display: flex;
  align-items: center;
}

.main__nav--side {
  display: flex;
  gap: 50px;
}

.navbar__right--buttons {
  display: flex;
  align-items: center;
  padding: 0;

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

    &:hover {
      background-color: var(--color-hippie-blue);
      transition: all 0.15s ease-in-out;

      svg {
        color: var(--color-white);
      }
    }

    svg {
      color: var(--color-hippie-blue);
      transition: all 0.15s ease-in-out;
    }
  }
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
  margin: 14px;
  border-radius: 50%;
  padding: 14px;
  width: 100%;
  height: 100%;

  &:hover {
    transition: all 0.15s ease-in-out;
    background-color: var(--color-seashell);
  }
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
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  width: 48px;
  height: 48px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  &:hover {
    img {
      transition: all 0.15s ease-in-out;
      opacity: 0.5;
    }

    opacity: 1;
    background-color: #fff;
  }
}

.dropdown__icon {
  position: absolute;
  bottom: 0;
  right: 0;
}

.top__nav--right-item {
  display: flex;
  gap: 20px;

  div {
    display: flex;
  }
}

.top__nav--left-item {
  .close-search__form {
    all: unset;
    color: transparent;
    display: flex;
  }
}

@media (max-width: 576px) {
  .top__nav--search-item {
    width: 100%;
  }

  .base__search--input {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .top__nav--list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    position: fixed;
    top: 0;
    height: 64px;
    width: 100%;
    list-style: none;
    padding: 0 16px;
    background-color: var(--color-white);
    box-shadow: 0 2px 3px rgba(141, 152, 180, 0.3);
    margin: 0;
    z-index: 50;
  }

  .bottom__nav--list {
    box-shadow: 0 -2px 3px rgba(141, 152, 180, 0.3);
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
    z-index: 5;
  }

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
