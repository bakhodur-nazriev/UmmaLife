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
import StickySidebar from 'sticky-sidebar-v2'
export default {
  components: { MainLayout, MyProfile, MyPosts },
  mounted() {
    /* eslint-disable */
    new StickySidebar('.profile', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.page__container',
      innerWrapperSelector: '.profile__inner',
      scrollContainer: '.main__content'
    })
  }
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
