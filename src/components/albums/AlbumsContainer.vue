<template>
  <div class="albums__container">
    <AlbumsAdd v-if="isAddOpen" @closeAdd="isAddOpen = false" />
    <AlbumsCard v-else @openAdd="isAddOpen = true" />
  </div>
</template>

<script>
import AlbumsCard from '@/components/albums/AlbumsCard.vue'
import AlbumsAdd from '@/components/albums/AlbumsAdd.vue'
export default {
  components: { AlbumsCard, AlbumsAdd },
  data() {
    return {
      isAddOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.albums__container {
  padding: 8px 0;
}
</style>
