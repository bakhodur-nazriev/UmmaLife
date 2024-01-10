<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <TabMuviProfile />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviProfile from '@/components/muvi/tabs/TabMuviProfile.vue'
localStorage.setItem('filter', 'recomendation')
</script>
