<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': isSidebarCollapsed, 'dark-theme': isDarkTheme }"
  >
    <div class="sidebar__main--links">
      <div class="sidebar-theme__toggle-button">
        <ToggleTheme :is-sidebar-collapsed="isSidebarCollapsed" />
      </div>

      <SampleDivider />

      <ul class="sidebar__links--list">
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/news`) }">
          <router-link :to="`/${$i18n.locale}/news`">
            <NewsIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.news') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-page`) }">
          <router-link :to="`/${$i18n.locale}/my-page`">
            <MyPageIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.my_page') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/messenger`) }">
          <router-link :to="`/${$i18n.locale}/messenger`">
            <MessengerIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.messenger') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-groups`) }">
          <router-link :to="`/${$i18n.locale}/my-groups`">
            <MyGroupIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.my_groups') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-audio`) }">
          <router-link :to="`/${$i18n.locale}/my-audio`">
            <MyAudioIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.my_audio') }}</span>
          </router-link>
        </li>

        <SampleDivider />

        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/saved`) }">
          <router-link :to="`/${$i18n.locale}/saved`">
            <SavedIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.saved') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/articles`) }">
          <router-link :to="`/${$i18n.locale}/articles`">
            <ArticlesIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.articles') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/video`) }">
          <router-link :to="`/${$i18n.locale}/video`">
            <VideoIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.video') }}</span>
          </router-link>
        </li>

        <SampleDivider />

        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/library`) }">
          <router-link :to="`/${$i18n.locale}/library`">
            <LibraryIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.library') }}</span>
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/marriage-agency`) }">
          <router-link :to="`/${$i18n.locale}/marriage-agency`">
            <MarriageAgencyIcon class="sidebar__item--icon" />
            <span :class="{ 'collapse-active': isSidebarCollapsed }">{{ $t('links.marriage_agency') }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar__locales">
      <MainSidebarLocalesDropdown :is-sidebar-collapsed="isSidebarCollapsed" />
    </div>
  </aside>
</template>

<script>
import NewsIcon from '@/components/icons/NewsIcon.vue'
import MyPageIcon from '@/components/icons/MyPageIcon.vue'
import MessengerIcon from '@/components/icons/MessengerIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import MyAudioIcon from '@/components/icons/MyAudioIcon.vue'
import SavedIcon from '@/components/icons/SavedIcon.vue'
import ArticlesIcon from '@/components/icons/ArticlesIcon.vue'
import VideoIcon from '@/components/icons/VideoIcon.vue'
import LibraryIcon from '@/components/icons/LibraryIcon.vue'
import MarriageAgencyIcon from '@/components/icons/MarriageAgencyIcon.vue'
import ToggleTheme from '@/components/ui/ToggleTheme.vue'
import MainSidebarLocalesDropdown from '@/components/ui/MainSidebarLocalesDropdown.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'

export default {
  components: {
    SampleDivider,
    MainSidebarLocalesDropdown,
    ToggleTheme,
    MarriageAgencyIcon,
    LibraryIcon,
    VideoIcon,
    ArticlesIcon,
    SavedIcon,
    MyAudioIcon,
    MyGroupIcon,
    MessengerIcon,
    MyPageIcon,
    NewsIcon
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
    isActive () {
      return (route) => this.$route.path === route
    },
    isDarkTheme  () {
      return this.$store.state.theme === 'dark'
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-theme__toggle-button {
  margin-bottom: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 80px;
  background-color: var(--color-white);
  padding: 4px;
  height: 100vh;
  width: 260px;
  overflow: hidden;

  &:hover {
    overflow: auto;
    transition: all .15s ease-in-out;
  }

  &__locales {
    margin-top: auto;
    margin-bottom: 95px;
  }

  &--collapsed {
    width: 68px;
  }

  .dark-theme {
    background-color: var(--color-mine-shaft-dark);
  }

  &__main--links {
    display: flex;
    flex-direction: column;
  }

  &__links--list {
    margin-top: 0;
    list-style: none;
    padding: 0;
  }

  &__item {
    border-radius: 20px;
    &:hover {
      background-color: var(--color-seashell);
      cursor: pointer;
      transition: all .15s ease-in-out;

      &.dark-theme {
        background-color: var(--color-woodsmoke);
      }
    }

    &.active {
      background-color: var(--color-seashell);
      border-radius: 20px;
      cursor: pointer;

      &.dark-theme {
        background-color: var(--color-woodsmoke);
      }

      .sidebar__item--icon {
        color: var(--color-deep-cerulean);
      }
    }

    &--icon {
      margin-right: 16px;
      color: var(--color-silver-chalice);
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      font-size: 16px;
      cursor: pointer;
      padding: 15px 0 15px 22px;
      line-height: 1;
    }

    .collapse-active {
      display: none;
    }
  }
}

@media (min-width: 768px) {  }

@media (min-width: 1280px) {  }

::-webkit-scrollbar {
  width: 4px;
}
</style>
