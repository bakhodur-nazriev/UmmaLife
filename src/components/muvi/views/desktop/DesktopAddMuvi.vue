<template>
  <div class="muvi__page">
    <GroupsNav :links="muvieLinks" className="muvi__nav" :routes="true" />
    <div class="muvi__container">
      <TabMuviAdd />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { muvieLinks } from '@/constants.js'
import GroupsNav from '@/components/groups/GroupsNav.vue'
import TabMuviAdd from '@/components/muvi/tabs/TabMuviAdd.vue'
</script>
