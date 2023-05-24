<script setup>

</script>

<template>
  <button class="button">
    <slot/>
  </button>
</template>

<style scoped>
.button {
  background-color: #49A399;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
}
</style>
