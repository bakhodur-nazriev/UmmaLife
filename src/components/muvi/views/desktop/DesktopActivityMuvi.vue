<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <TabMuviActivity />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviActivity from '@/components/muvi/tabs/TabMuviActivity.vue'
</script>
