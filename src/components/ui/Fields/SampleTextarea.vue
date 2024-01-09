<template>
  <textarea class="sample__textarea"></textarea>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sample__textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  background-color: var(--color-seashell);
  border-radius: 15px;
  padding: 12px;
  color: var(--color-mine-shaft);

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}
</style>
