<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': isSidebarCollapsed, 'dark-theme': isDarkTheme }">
    <div class="sidebar__main--links">
      <div>
        <toggle-theme :is-sidebar-collapsed="isSidebarCollapsed"></toggle-theme>
      </div>
      <ul class="sidebar__links--list">
        <hr>

        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/news`) }">
          <router-link :to="`/${$i18n.locale}/news`">
            <news-icon class="sidebar__item--icon"></news-icon>
            {{ isSidebarCollapsed ? '' : $t('links.news') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-page`) }">
          <router-link :to="`/${$i18n.locale}/my-page`">
            <my-page-icon class="sidebar__item--icon"></my-page-icon>
            {{ isSidebarCollapsed ? '' : $t('links.my_page') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/messenger`) }">
          <router-link :to="`/${$i18n.locale}/messenger`">
            <messenger-icon class="sidebar__item--icon"></messenger-icon>
            {{ isSidebarCollapsed ? '' : $t('links.messenger') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-groups`) }">
          <router-link :to="`/${$i18n.locale}/my-groups`">
            <my-group-icon class="sidebar__item--icon"></my-group-icon>
            {{ isSidebarCollapsed ? '' : $t('links.my_groups') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-albums`) }">
          <router-link :to="`/${$i18n.locale}/my-albums`">
            <my-albums-icon class="sidebar__item--icon"></my-albums-icon>
            {{ isSidebarCollapsed ? '' : $t('links.my_albums') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/my-audio`) }">
          <router-link :to="`/${$i18n.locale}/my-audio`">
            <my-audio-icon class="sidebar__item--icon"></my-audio-icon>
            {{ isSidebarCollapsed ? '' : $t('links.my_audio') }}
          </router-link>
        </li>

        <hr>

        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/saved`) }">
          <router-link :to="`/${$i18n.locale}/saved`">
            <saved-icon class="sidebar__item--icon"></saved-icon>
            {{ isSidebarCollapsed ? '' : $t('links.saved') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/articles`) }">
          <router-link :to="`/${$i18n.locale}/articles`">
            <articles-icon class="sidebar__item--icon"></articles-icon>
            {{ isSidebarCollapsed ? '' : $t('links.articles') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/video`) }">
          <router-link :to="`/${$i18n.locale}/video`">
            <video-icon class="sidebar__item--icon"></video-icon>
            {{ isSidebarCollapsed ? '' : $t('links.video') }}
          </router-link>
        </li>

        <hr>

        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/library`) }">
          <router-link :to="`/${$i18n.locale}/library`">
            <library-icon class="sidebar__item--icon"></library-icon>
            {{ isSidebarCollapsed ? '' : $t('links.library') }}
          </router-link>
        </li>
        <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/marriage-agency`) }">
          <router-link :to="`/${$i18n.locale}/marriage-agency`">
            <marriage-agency-icon class="sidebar__item--icon"></marriage-agency-icon>
            {{ isSidebarCollapsed ? '' : $t('links.marriage_agency') }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar__locales">
      <main-sidebar-locales-dropdown :is-sidebar-collapsed="isSidebarCollapsed"></main-sidebar-locales-dropdown>
    </div>
  </aside>
</template>

<script>
import NewsIcon from '@/components/icons/NewsIcon.vue'
import MyPageIcon from '@/components/icons/MyPageIcon.vue'
import MessengerIcon from '@/components/icons/MessengerIcon.vue'
import MyGroupIcon from '@/components/icons/MyGroupIcon.vue'
import MyAlbumsIcon from '@/components/icons/MyAlbumsIcon.vue'
import MyAudioIcon from '@/components/icons/MyAudioIcon.vue'
import SavedIcon from '@/components/icons/SavedIcon.vue'
import ArticlesIcon from '@/components/icons/ArticlesIcon.vue'
import VideoIcon from '@/components/icons/VideoIcon.vue'
import LibraryIcon from '@/components/icons/LibraryIcon.vue'
import MarriageAgencyIcon from '@/components/icons/MarriageAgencyIcon.vue'
import ToggleTheme from '@/components/ui/ToggleTheme.vue'
import MainSidebarLocalesDropdown from '@/components/ui/MainSidebarLocalesDropdown.vue'

export default {
  components: {
    MainSidebarLocalesDropdown,
    ToggleTheme,
    MarriageAgencyIcon,
    LibraryIcon,
    VideoIcon,
    ArticlesIcon,
    SavedIcon,
    MyAudioIcon,
    MyAlbumsIcon,
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

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  padding: 4px;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s ease;
}

.sidebar.dark-theme {
  background-color: var(--color-background-dark);
}

.sidebar.sidebar--collapsed {
  width: 68px;
  transition: width 0.3s ease;
}

hr {
  border: 1px solid var(--color-divider);
}

hr.dark-theme {
  border: 1px solid var(--color-divider-dark);
}

.sidebar__main--links {
  display: flex;
  flex-direction: column;
}

.sidebar__links--list {
  list-style: none;
  padding: 0;
}

.sidebar__item.active {
  background-color: var(--color-divider);
  border-radius: 20px;
  cursor: pointer;
}

.sidebar__item.active.dark-theme {
  background-color: var(--color-divider-dark);
}

.sidebar__item:hover {
  background-color: var(--color-divider);
  border-radius: 20px;
  cursor: pointer;
  transition: all .2s ease;
}

.sidebar__item:hover.dark-theme {
  background-color: var(--color-divider-dark);
}

.sidebar__item .sidebar__item--icon {
  color: var(--color-text);
}

.sidebar__item .sidebar__item--icon {
  color: var(--color-text-dark);
}

.sidebar__item.active .sidebar__item--icon {
  color: var(--color-link);
}

.sidebar__item.active .sidebar__item--icon {
  color: var(--color-link-dark);
}

.sidebar__item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  padding: 15px 0 15px 22px;
  line-height: 1;
}

.sidebar__item--icon {
  margin-right: 16px;
}

.sidebar__locales {
  margin-top: auto;
  margin-bottom: 95px;
}

@media (min-width: 768px) {
  .sidebar {
    min-width: 240px;
  }

  .sidebar.sidebar--collapsed {
    min-width: 68px;
  }
}

@media (min-width: 1280px) {

}
</style>
