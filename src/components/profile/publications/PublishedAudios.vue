<template>
  <div class="published__audios">
    <AudioTab />
  </div>
</template>

<script>
import AudioTab from '@/components/ui/Publications/AudioTab.vue'

export default {
  components: { AudioTab }
}
</script>

<style lang="scss" scoped>
.published__audios {
  padding: 8px 0;
}
</style>
