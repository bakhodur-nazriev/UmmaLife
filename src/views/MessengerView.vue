<template>
  <main-layout>
    <div class="messanger">
      <div class="messanger__wrapper">
        <MessangerNavigation :users="users" />
        <router-view />
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import MessangerNavigation from '@/components/messanger/MessangerNavigation.vue'
import { users } from '@/dummy.js'

export default {
  components: { MainLayout, MessangerNavigation },
  data() {
    return {
      users
    }
  }
}
</script>

<style scoped lang="scss">
.messanger {
  max-width: 1651px;
  width: 100%;
  padding: 16px;
  height: 100%;
  &__wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 440px 1fr;
    height: 100%;
  }
}
</style>
