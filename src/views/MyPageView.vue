<template>
  <main-layout>
    <div class="page__container">
      <div class="page__wrapper">
        <MyProfile />
        <MyPosts />
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

<style scoped></style>
