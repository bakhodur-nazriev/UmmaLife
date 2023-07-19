<script setup>
import { ref } from 'vue'

const photos = ref([
  { id: 1, image: require('@/assets/images/photo_1.png'), desc: 'photo 1' },
  { id: 2, image: require('@/assets/images/photo_2.png'), desc: 'photo 2' },
  { id: 3, image: require('@/assets/images/photo_3.png'), desc: 'photo 3' },
  { id: 4, image: require('@/assets/images/photo_4.png'), desc: 'photo 4' },
  { id: 5, image: require('@/assets/images/photo_1.png'), desc: 'photo 1' },
  { id: 6, image: require('@/assets/images/photo_2.png'), desc: 'photo 2' },
  { id: 7, image: require('@/assets/images/photo_3.png'), desc: 'photo 3' },
  { id: 8, image: require('@/assets/images/photo_4.png'), desc: 'photo 4' }
])
</script>

<template>
  <article class="photo__block">
    <div class="image__block" v-for="photo in photos" :key="photo.id">
      <img class="image__item" :src="photo.image" :alt="photo.desc" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.photo__block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  grid-auto-flow: dense;

  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
}

.image {
  &__block {
    display: flex;
    cursor: pointer;
  }

  &__item {
    border-radius: 12px;
  }
}
</style>
