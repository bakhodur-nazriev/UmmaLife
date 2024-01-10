<template>
  <div class="page__container">
    <div class="page__wrapper">
      <SavedPublications />
      <MyProfile />
    </div>
  </div>
</template>

<script>
import MyProfile from '@/components/profile/MyProfile.vue'
import SavedPublications from '@/components/saved/SavedPublications.vue'
import StickySidebar from 'sticky-sidebar-v2'
export default {
  components: { MyProfile, SavedPublications },
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
