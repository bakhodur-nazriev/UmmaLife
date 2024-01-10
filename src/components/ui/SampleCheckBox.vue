<template>
  <div class="check-section">
    <input class="check-input" type="checkbox" id="flexCheck">
    <label class="check-label" for="flexCheck">{{ checkLabel }}</label>
  </div>
</template>

<script>
export default {
  props: ['check-label']
}
</script>

<style scoped>
.check-section {
  display: flex;
  align-items: center;
}

.check-input {
  appearance: none;
  background-color: #f1f1f1;
  width: 34px;
  height: 34px;
}

.check-input:checked {
  background-color: #49A399;
}
</style>
