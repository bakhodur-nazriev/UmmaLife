<template>
  <section class="umma__shorts--section">
    <umma-shorts v-for="(item, index) in 12" :key="index"></umma-shorts>
  </section>
</template>

<script>
import UmmaShorts from '@/components/ui/UmmaShorts.vue'

export default {
  components: {
    UmmaShorts
  }
}
</script>

<style scoped lang="scss">
.umma__shorts--section {
  display: grid;
  grid-template-columns: repeat(3, 237px);
  gap: 16px;
}

@media (max-width: 576px) {
  .umma__shorts--section {
    padding: 20px;
    grid-template-columns: repeat(1, 100%);
  }
}

@media (min-width: 1280px) {
  .umma__shorts--inside--block img {
    border-radius: 15px;
  }

  .umma__shorts--section {
    grid-template-columns: repeat(4, 237px);
  }
}

@media (min-width: 1920px) {
  .umma__shorts--section {
    grid-template-columns: repeat(6, 237px);

  }
}
</style>
