<template>
  <div class="published__photos">
    <PhotoTab />
  </div>
</template>

<script>
import PhotoTab from '@/components/ui/Publications/PhotoTab.vue'
export default {
  components: { PhotoTab }
}
</script>

<style lang="scss" scoped>
.published__photos {
  padding: 8px 0;
}
</style>
