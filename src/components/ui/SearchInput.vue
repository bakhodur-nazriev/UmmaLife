<template>
  <div class="main__search--block">
    <LoupeIcon class="search__icon" />
    <input class="base__search--input" :placeholder="placeholder" />
  </div>
</template>

<script>
import LoupeIcon from '@/components/icons/LoupeIcon.vue'

export default {
  components: { LoupeIcon },
  props: {
    placeholder: String
  }
}
</script>

<style scoped lang="scss">
.base__search--input {
  border-radius: 10px;
  background-color: var(--color-seashell);
  color: var(--color-mine-shaft);
  border: none;
  outline: none;
  font-size: 16px;
  padding: 12px 12px 12px 48px;

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}

.main__search--block {
  position: relative;
  display: flex;
  align-items: center;

  .search__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    display: flex;
  }
}

@media (min-width: 768px) {
  .base__search--input {
    width: 280px;
  }
}

@media (min-width: 992px) {
  .base__search--input {
    width: 400px;
  }
}

@media (min-width: 1200px) {
  .base__search--input {
    width: 500px;
  }
}
</style>
