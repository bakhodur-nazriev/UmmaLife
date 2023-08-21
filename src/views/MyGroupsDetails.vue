<template>
  <div class="groups__wrapper">
    <router-view />
    <MyGroupsDetailsInfo />
  </div>
</template>

<script>
import MyGroupsDetailsInfo from '@/components/groups/details/MyGroupsDetailsInfo.vue'
import StickySidebar from 'sticky-sidebar-v2'

export default {
  components: { MyGroupsDetailsInfo },
  mounted() {
    /* eslint-disable */
    new StickySidebar('.profile', {
      topSpacing: 100,
      bottomSpacing: 20,
      containerSelector: '.groups__wrapper',
      innerWrapperSelector: '.profile__inner',
      scrollContainer: '.main__content'
    })
  }
}
</script>

<style lang="scss" scoped>
.groups__wrapper {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;
  padding: 24px 45px;
}
</style>
