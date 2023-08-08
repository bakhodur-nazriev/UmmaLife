<template>
  <div class="profile__shorts">
    <ShortsContainer />
  </div>
</template>

<script>
import ShortsContainer from '@/components/ui/Shorts/ShortsContainer.vue'

export default {
  components: { ShortsContainer }
}
</script>

<style lang="scss">
.profile__shorts {
  margin: 10px 0;
}
</style>
