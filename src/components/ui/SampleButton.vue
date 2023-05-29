<template>
    <button class="btn">
      <slot/>
    </button>
</template>

<script>

</script>

<style scoped>
.btn {
  background-color: #49A399;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #00819D;
  color: #fff;
  transition: 0.2s;
}

.btn::placeholder {
  color: #B0B0B0;
  font-weight: 400;
}

@media (min-width: 768px) {
  .btn {
    max-width: 320px;
  }
}
</style>
