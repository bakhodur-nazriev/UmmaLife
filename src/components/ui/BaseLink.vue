<template>
  <router-link :class="{ 'dark-link': 'isDark' }" :to="link">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['link'],
  data() {
    return {
      isDark: {
        type: Boolean,
        default: false
      }
    }
  }
}
</script>

<style scoped>
.dark-link {
  color: var(--color-mine-shaft);
}
</style>
