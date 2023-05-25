<template>
  <input class="base-input"/>
</template>

<script>
export default {
  props: ['inputType']
}
</script>

<style scoped>
.base-input {
  background-color: #f1f1f1;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 16px;
  color: #1F1F1F;
}

.base-input::placeholder {
  color: #B0B0B0;
}
</style>
