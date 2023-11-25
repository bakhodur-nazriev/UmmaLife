<template>
  <div class="bottom__nav muvi__nav">
    <ul class="bottom__nav--list">
      <li class="bottom__nav--item" v-for="link in links" :key="link.icon">
        <router-link :to="`/${$i18n.locale}/muvi/${link.link}`">
          <component :is="`${link.icon}-icon`" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import HomeIcon from '@/components/icons/shorts/nav/HomeIcon.vue'
import SearchIcon from '@/components/icons/shorts/nav/SearchIcon.vue'
import AddCircleIcon from '@/components/icons/shorts/nav/AddCircleIcon.vue'
import CommentIcon from '@/components/icons/shorts/nav/CommentIcon.vue'
import ProfileIcon from '@/components/icons/shorts/nav/ProfileIcon.vue'

const links = ref([
  { icon: 'home', link: '' },
  { icon: 'search', link: 'popular' },
  { icon: 'add-circle', link: 'add' },
  { icon: 'comment', link: 'activity' },
  { icon: 'profile', link: 'profile' }
])
</script>

<script>
export default {
  components: {
    HomeIcon,
    SearchIcon,
    AddCircleIcon,
    CommentIcon,
    ProfileIcon
  }
}
</script>

<style lang="scss">
.muvi__nav {
  .bottom__nav--item {
    a {
      color: var(--color-silver-chalice);
      &.router-link-active {
        color: var(--color-hippie-blue);
      }
    }
  }
}
</style>
