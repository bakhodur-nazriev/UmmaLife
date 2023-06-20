<template>
  <textarea class="sample__textarea"></textarea>
</template>

<script>
export default {

}
</script>

<style scoped>
.sample__textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  background-color: var(--color-divider);
  border-radius: 15px;
  padding: 12px;
}

.sample__textarea::placeholder {
  color: var(--color-text);
}
</style>
