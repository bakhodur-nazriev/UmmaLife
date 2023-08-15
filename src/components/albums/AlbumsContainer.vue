<template>
  <div class="albums__container">
    <AlbumsMain v-if="isMainOpen" @openAdd="openAdd('main')" @openCard="openCard" />
    <AlbumsAdd v-else-if="isAddOpen" @closeAdd="closeAdd" />
    <AlbumsCard v-else-if="isCardOpen" @openAdd="openAdd('card')" />
  </div>
</template>

<script>
import AlbumsCard from '@/components/albums/AlbumsCard.vue'
import AlbumsAdd from '@/components/albums/AlbumsAdd.vue'
import AlbumsMain from '@/components/albums/AlbumsMain.vue'
export default {
  components: { AlbumsCard, AlbumsAdd, AlbumsMain },
  data() {
    return {
      isAddOpen: false,
      isCardOpen: false,
      isMainOpen: true,
      state: 'main'
    }
  },
  methods: {
    openAdd(state) {
      this.isAddOpen = true
      this.isCardOpen = false
      this.isMainOpen = false
      this.state = state
    },
    closeAdd() {
      this.isAddOpen = false
      if (this.state === 'main') {
        this.isCardOpen = false
        this.isMainOpen = true
      } else {
        this.isCardOpen = true
        this.isMainOpen = false
      }
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
}
</style>
