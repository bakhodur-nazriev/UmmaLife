<template>
  <div class="main__search--block">
    <loupe-icon class="search__icon"></loupe-icon>
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

<style scoped>
.base__search--input {
  border-radius: 10px;
  background-color: var(--color-seashell);
  color: #1f1f1f;
  border: none;
  outline: none;
}

.base__search--input::placeholder {
  color: var(--color-mine-shaft);
}

@media (min-width: 768px) {
  .main__search--block {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    display: flex;
  }

  .base__search--input {
    width: 280px;
    font-size: 16px;
    padding: 12px 12px 12px 48px;
  }
}

@media (min-width: 1280px) {
  .main__search--block {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    display: flex;
  }

  .base__search--input {
    width: 604px;
    font-size: 16px;
    padding: 12px 12px 12px 48px;
  }

  .navigation__search .base__search--input {
    width: 344px;
    background: transparent;
    border: 1px solid var(--color-gallery-first);
  }
}
</style>
