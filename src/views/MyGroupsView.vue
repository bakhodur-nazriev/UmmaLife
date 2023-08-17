<template>
  <main-layout>
    <GroupsContainer />
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import GroupsContainer from '@/components/groups/GroupsContainer.vue'
export default {
  components: { MainLayout, GroupsContainer }
}
</script>

<style scoped></style>
