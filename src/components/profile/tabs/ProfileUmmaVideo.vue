<template>
  <div class="profile__videos">
    <VideoTab />
  </div>
</template>

<script>
import VideoTab from '@/components/ui/Publications/VideoTab.vue'

export default {
  components: { VideoTab }
}
</script>

<style lang="scss">
.profile__videos {
  padding: 8px 0;
}
</style>
