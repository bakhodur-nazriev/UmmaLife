<template>
  <div class="shorts__card">short {{ index }}</div>
</template>

<script>
export default {
  props: ['index']
}
</script>

<style lang="scss">
.shorts__card {
  max-width: 415px;
  height: 815px;
  width: 100%;
  outline: 1px solid blue;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
}
</style>
