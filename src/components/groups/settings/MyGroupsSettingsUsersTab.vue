<template>
  <div class="users">
    <div class="users__title">
      <span>Участники</span>
      1032
    </div>
    <div class="users__wrapper">
      <UserCard v-for="user in groupsUsers" :controls="true" :user="user" :key="user.id" />
      <UserCard v-for="user in groupsUsers" :controls="true" :user="user" :key="user.id" />
      <UserCard v-for="user in groupsUsers" :controls="true" :user="user" :key="user.id" />
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/groups/details/UserCard.vue'

import { groupsUsers } from '@/dummy.js'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      groupsUsers
    }
  }
}
</script>
