<template>
  <div class="groups__sidebar">
    <div class="groups__sidebar--inner">
      <PublicationTabSide id="sidebar" />
    </div>
  </div>
</template>

<script>
import PublicationTabSide from '@/components/blocks/PublicationTabSide.vue'
import StickySidebar from 'sticky-sidebar-v2'
export default {
  components: { PublicationTabSide },
  mounted() {
    /* eslint-disable */
    new StickySidebar('#sidebar', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.groups__wrapper',
      innerWrapperSelector: '.groups__sidebar--inner',
      scrollContainer: '.main__content'
    })
  }
}
</script>

<style lang="scss" scoped>
.groups__sidebar {
  width: 100%;
  padding-bottom: 50px;
  &--inner {
    position: relative;
  }
}
</style>
