<template>
  <a
    :href="image?.src"
    data-fancybox
    class="image-component"
    v-if="!!Object.keys(image || {}).length"
  >
    <img :src="image?.src" :alt="image?.title" loading="lazy" />
  </a>
</template>

<script setup>
/* eslint-disable */
import { Fancybox } from '@fancyapps/ui'
import { onMounted, ref } from 'vue'
const props = defineProps({
  image: Object
})

const storage_url = ref(process.env.VUE_APP_STORAGE_URL)

onMounted(() => {
  Fancybox.bind('[data-fancybox]', {
    wheel: 'zoom'
  })
})
</script>

<style lang="scss">
.video-message {
  .image-component {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}
.image-component {
  height: 300px;
  display: block;
  width: calc(100% + 28px);
  position: relative;
  top: -14px;
  left: -14px;
  right: -14px;
  object-fit: cover;
  object-position: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
