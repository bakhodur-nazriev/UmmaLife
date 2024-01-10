<template>
  <div class="albums__container">
    <AlbumsMain v-if="isMainOpen" @openAdd="openAdd()" @openCard="openCard" />
    <AlbumsAdd v-else-if="isAddOpen" @closeAdd="closeAdd" />
    <template v-else-if="isCardOpen">
      <AlbumsTop @closeAdd="closeAdd" backTo="true" />
      <AlbumsCard @openAdd="openAdd('card')" />
    </template>
  </div>
</template>

<script>
import AlbumsCard from '@/components/albums/AlbumsCard.vue'
import AlbumsAdd from '@/components/albums/AlbumsAdd.vue'
import AlbumsMain from '@/components/albums/AlbumsMain.vue'
import AlbumsTop from '@/components/albums/AlbumsTop.vue'
export default {
  components: { AlbumsCard, AlbumsAdd, AlbumsMain, AlbumsTop },
  data() {
    return {
      isAddOpen: false,
      isCardOpen: false,
      isMainOpen: true
    }
  },
  methods: {
    openAdd() {
      this.isAddOpen = true
      this.isCardOpen = false
      this.isMainOpen = false
    },
    closeAdd() {
      this.isAddOpen = false
      this.isCardOpen = false
      this.isMainOpen = true
    },
    openCard() {
      this.isCardOpen = true
      this.isAddOpen = false
      this.isMainOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.albums__container {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
