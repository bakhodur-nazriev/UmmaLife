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
  background-color: var(--color-white);
  color: var(--color-silver-chalice);
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 13px 26px;
  cursor: pointer;
  width: 146px;
}

.category__button:hover {
  background-color: var(--color-deep-cerulean);
  color: var(--color-white);
}

@media (min-width: 768px) {  }

@media (min-width: 1280px) {  }
</style>
