<template>
  <div class="albums__main">
    <AlbumsTop @click="$emit('openAdd')" />
    <AlbumsCard
      :mainCard="true"
      @openCard="$emit('openCard')"
      @openAdd="$emit('openAdd')"
      v-for="i in 3"
      :key="i"
    />
  </div>
</template>

<script>
import { Fancybox } from '@fancyapps/ui'
import AlbumsCard from '@/components/albums/AlbumsCard.vue'
import AlbumsTop from '@/components/albums/AlbumsTop.vue'
export default {
  components: { AlbumsCard, AlbumsTop },
  emits: ['openAdd', 'openCard'],
  mounted() {
    Fancybox.bind('[data-fancybox]', {
      wheel: 'zoom'
    })
  }
}
</script>

<style lang="scss" scoped>
.albums__main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
