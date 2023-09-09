<template>
  <aside class="all-comment__aside-block">
    <ul class="sidebar__links--list">
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-all-recommendations`) }">
        <router-link :to="`/${$i18n.locale}/search-all-recommendations`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.all') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-people`) }">
        <router-link :to="`/${$i18n.locale}/search-people`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.people') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-groups`) }">
        <router-link :to="`/${$i18n.locale}/search-groups`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.groups') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-muvi`) }">
        <router-link :to="`/${$i18n.locale}/search-muvi`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.muvi') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-article`) }">
        <router-link :to="`/${$i18n.locale}/search-article`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.article') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-video`) }">
        <router-link :to="`/${$i18n.locale}/search-video`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.video') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-audio`) }">
        <router-link :to="`/${$i18n.locale}/search-audio`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.audio') }}</span>
        </router-link>
      </li>
      <li class="sidebar__item" :class="{ active: isActive(`/${$i18n.locale}/search-hashtags`) }">
        <router-link :to="`/${$i18n.locale}/search-hashtags`">
          <span :class="{ 'collapse-active': isSidebarActive }">{{ $t('links.search.hashtags') }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isActive() {
      return (route) => this.$route.path === route
    }
  }
}
</script>

<style scoped lang="scss">
.all-comment__aside-block {
  width: 430px;
  height: 100%;
  background-color: var(--color-white);
  padding: 10px;
  border-radius: 20px;
}

.sidebar__links--list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__item {
  &.active {
    background-color: var(--color-seashell);
    border-radius: 10px;
  }

  a {
    display: flex;
    color: var(--color-mine-shaft);
    text-decoration: none;
    padding: 16px;
    border-radius: 10px;

    &:hover {
      background-color: var(--color-seashell);
      transition: all .15s ease-in-out;
    }
  }
}
</style>
