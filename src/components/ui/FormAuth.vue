<template>
  <form class="form">
    <slot/>
  </form>
</template>

<script>
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 40px 32px;
  width: 100%;
}

@media (min-width: 768px) {
  .form {
    border-radius: 20px;
    max-width: 544px;
  }
}
</style>
