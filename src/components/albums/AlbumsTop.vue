<template>
  <div class="albums__top" v-if="backTo" @click="$emit('closeAdd')">
    <ArrowLeft />
    <p>Вернуться к списку альбомов</p>
  </div>
  <div class="albums__top" v-else>
    <PlusIcon :green="true" />
    <p>Создать новый альбом</p>
  </div>
</template>

<script>
import PlusIcon from '@/components/icons/PlusIcon.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

export default {
  props: ['backTo'],
  emits: ['closeAdd'],
  components: { PlusIcon, ArrowLeft }
}
</script>
<style lang="scss" scoped>
.albums__top {
  border-radius: 10px;
  background-color: var(--color-white);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    padding: 0;
    margin: 0;
    color: var(--color-green);
  }
  svg {
    width: 24px;
    height: 24px;
    fill: var(--color-green);
  }
}
</style>
