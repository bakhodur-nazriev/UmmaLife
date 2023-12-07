<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <TabMuviPopular />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'

import TabMuviPopular from '@/components/muvi/tabs/TabMuviPopular.vue'
localStorage.setItem('filter', 'recomendation')
</script>
