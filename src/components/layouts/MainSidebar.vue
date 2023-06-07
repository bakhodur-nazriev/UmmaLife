<template>
  <aside class="sidebar">
    <div>
      <toggle-theme></toggle-theme>
    </div>
    <ul class="sidebar__links--list">
      <hr>
      <li class="sidebar__item">
        <news-icon class="sidebar__item--icon"></news-icon>
        <router-link :to="`/${$i18n.locale}/news`">{{ $t('links.news') }}</router-link>
      </li>
      <li class="sidebar__item">
        <my-page-icon class="sidebar__item--icon"></my-page-icon>
        <router-link :to="`/${$i18n.locale}/my-page`">{{ $t('links.my_page') }}</router-link>
      </li>
      <li class="sidebar__item">
        <messenger-icon class="sidebar__item--icon"></messenger-icon>
        <router-link :to="`/${$i18n.locale}/messenger`">{{ $t('links.messenger') }}</router-link>
      </li>
      <li class="sidebar__item">
        <my-group-icon class="sidebar__item--icon"></my-group-icon>
        <router-link :to="`/${$i18n.locale}/my-groups`">{{ $t('links.my_groups') }}</router-link>
      </li>
      <li class="sidebar__item">
        <my-albums-icon class="sidebar__item--icon"></my-albums-icon>
        <router-link :to="`/${$i18n.locale}/my-albums`">{{ $t('links.my_albums') }}</router-link>
      </li>
      <li class="sidebar__item">
        <my-audio-icon class="sidebar__item--icon"></my-audio-icon>
        <router-link :to="`/${$i18n.locale}/my-audio`">{{ $t('links.my_audio') }}</router-link>
      </li>

      <hr>

      <li class="sidebar__item">
        <saved-icon class="sidebar__item--icon"></saved-icon>
        <router-link :to="`/${$i18n.locale}/saved`">{{ $t('links.saved') }}</router-link>
      </li>
      <li class="sidebar__item">
        <articles-icon class="sidebar__item--icon"></articles-icon>
        <router-link :to="`/${$i18n.locale}/articles`">{{ $t('links.articles') }}</router-link>
      </li>
      <li class="sidebar__item">
        <video-icon class="sidebar__item--icon"></video-icon>
        <router-link :to="`/${$i18n.locale}/video`">{{ $t('links.video') }}</router-link>
      </li>

      <hr>

      <li class="sidebar__item">
        <library-icon class="sidebar__item--icon"></library-icon>
        <router-link :to="`/${$i18n.locale}/library`">{{ $t('links.library') }}</router-link>
      </li>
      <li class="sidebar__item">
        <marriage-agency-icon class="sidebar__item--icon"></marriage-agency-icon>
        <router-link :to="`/${$i18n.locale}/marriage-agency`">{{ $t('links.marriage_agency') }}</router-link>
      </li>
    </ul>
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

export default {
  components: {
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
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #fff;
  width: 240px;
  padding: 4px;
}

hr {
  border: 1px solid #F1F1F1;
}

.sidebar__links--list {
  list-style: none;
}

.sidebar__item {
  display: flex;
  align-items: center;
}

.sidebar__item a {
  text-decoration: none;
  font-size: 16px;
}

.sidebar__item--icon {
  margin-right: 16px;
}
</style>
