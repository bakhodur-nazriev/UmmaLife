<template>
  <div class="selected__country">
    <button class="category__button">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.selected__country {
  display: flex;
  justify-content: center;
  align-items: center;
}

.category__button {
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 13px 26px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .selected__country {
    margin: 8px;
  }
}

@media (min-width: 1280px) {
  .selected__country {
    margin: 4px;
  }
}
</style>
