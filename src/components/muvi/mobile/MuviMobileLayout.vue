<template>
  <FeedsTab v-if="links[0].isSelected" />
  <SearchTab v-else-if="links[1].isSelected" />
  <AddMuvi v-else-if="links[2].isSelected" />
  <ActivityMuvi v-else-if="links[3].isSelected" />
  <ProfileTab v-else-if="links[4].isSelected" />
  <MuviMobileNav :links="links" @linkHandler="linkHandler" />
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import MuviMobileNav from '@/components/muvi/mobile/MuviMobileNav.vue'
import FeedsTab from '@/components/muvi/mobile/tabs/FeedsTab.vue'
import SearchTab from '@/components/muvi/mobile/tabs/SearchTab.vue'
import AddMuvi from '@/components/muvi/mobile/tabs/AddMuvi.vue'
import ActivityMuvi from '@/components/muvi/mobile/tabs/ActivityMuvi.vue'
import ProfileTab from '@/components/muvi/mobile/tabs/ProfileTab.vue'

const links = ref([
  { icon: 'home', isSelected: true },
  { icon: 'search', isSelected: false },
  { icon: 'add-circle', isSelected: false },
  { icon: 'comment', isSelected: false },
  { icon: 'profile', isSelected: false }
])

const linkHandler = (index) => {
  links.value.forEach((l) => (l.isSelected = false))
  links.value[index].isSelected = true
}
</script>
