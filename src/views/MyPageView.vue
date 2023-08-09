<template>
  <main-layout>
    <div class="page__container">
      <div class="page__wrapper">
        <MyPosts />
        <MyProfile />
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import MyPosts from '@/components/profile/MyPosts.vue'
export default {
  components: { MainLayout, MyProfile, MyPosts }
}
</script>

<style scoped>
.page__container {
  padding: 16px 45px 16px 16px;
  width: 100%;
}

.page__wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;
}
</style>
