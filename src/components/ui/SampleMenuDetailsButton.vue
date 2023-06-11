<template>
  <div class="menu__details--button">
    <menu-details-icon></menu-details-icon>
  </div>
</template>
<script>
import MenuDetailsIcon from '@/components/icons/MenuDetailsIcon.vue'
export default {
  components: {
    MenuDetailsIcon
  }
}
</script>

<style scoped>
.menu__details--button {
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
}

.menu__details--button svg {
  color: var(--color-text);
}
</style>
