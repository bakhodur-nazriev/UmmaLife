<template>
  <div class="messenger">
    <div class="messenger__wrapper">
      <MessangerNavigation :users="users"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import MessangerNavigation from '@/components/messanger/MessangerNavigation.vue'
import { users } from '@/dummy.js'

export default {
  components: { MessangerNavigation },
  data() {
    return {
      users
    }
  }
}
</script>

<style scoped lang="scss">
.messenger {
  max-width: 1651px;
  width: 100%;
  padding: 16px;
  height: 100%;

  &__wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 480px 1fr;
    height: 100%;
  }
}
</style>
