<template>
  <GroupsNav :links="links" className="muvi__nav" @clickNavHandler="clickNavHandler" />
  <div class="muvi__container">
    <TabMuviFeeds v-if="links[0].isActive" />
    <TabMuviPopular v-else-if="links[1].isActive" />
    <TabMuviActivity v-else-if="links[2].isActive" />
    <TabMuviProfile v-else-if="links[3].isActive" />
    <TabMuviAdd v-else-if="links[4].isActive" />
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'

import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviFeeds from '@/components/muvi/tabs/TabMuviFeeds.vue'
import TabMuviPopular from '@/components/muvi/tabs/TabMuviPopular.vue'
import TabMuviActivity from '@/components/muvi/tabs/TabMuviActivity.vue'
import TabMuviProfile from '@/components/muvi/tabs/TabMuviProfile.vue'
import TabMuviAdd from '@/components/muvi/tabs/TabMuviAdd.vue'

const links = ref([
  {
    name: 'Feed',
    isActive: true
  },
  {
    name: 'Popular',
    isActive: false
  },
  {
    name: 'Activity',
    isActive: false
  },
  {
    name: 'Profile',
    isActive: false
  },
  {
    name: '+ Add MUVI',
    isActive: false
  }
])

const clickNavHandler = (index) => {
  links.value.forEach((link) => (link.isActive = false))
  links.value[index].isActive = true
}
</script>

<style lang="scss">
.muvi {
  &__container {
    max-width: 1510px;
    width: 100%;
    margin: 0 auto;
    padding: 24px 16px;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(233px, 1fr));
    gap: 28px 16px;
  }
}
</style>
