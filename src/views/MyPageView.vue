<template>
  <div class="page__container">
    <div class="page__wrapper">
      <MyPosts/>
      <MyProfile/>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import {onMounted} from 'vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import MyPosts from '@/components/profile/MyPosts.vue'
import StickySidebar from 'sticky-sidebar-v2'

onMounted(() => {
  new StickySidebar('.profile', {
    topSpacing: 70,
    bottomSpacing: 20,
    containerSelector: '.page__container',
    innerWrapperSelector: '.profile__inner',
    scrollContainer: '.main__content',
    minWidth: 1377
  })
})
</script>

<style scoped>
.page__container {
  padding: 16px 45px 16px 16px;
  width: 100%;
  @media (max-width: 1377px) {
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding: 0;
    padding-bottom: 64px;
  }
}

.page__wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;

  @media (max-width: 1480px) {
    grid-template-columns: 60% 40%;
  }

  @media (max-width: 1377px) {
    display: flex;
    flex-direction: column-reverse;
    grid-template-columns: 100%;
  }

  @media (max-width: 575px) {
    gap: 0;
  }
}
</style>
