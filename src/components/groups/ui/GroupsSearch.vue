<template>
  <div class="search__container">
    <div class="search__container--wrapper">
      <LoupeIcon />
      <input type="text" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script>
import LoupeIcon from '@/components/icons/LoupeIcon.vue'
export default {
  components: { LoupeIcon },
  props: {
    placeholder: {
      type: String,
      default: 'Поиск...'
    }
  }
}
</script>
<style lang="scss" scoped>
.search__container {
  width: 100%;
  background: var(--color-white);
  padding: 10px 32px;
  border-radius: 15px;
  &--wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    svg {
      display: block;
      width: 20px;
      height: 20px;
      margin-top: 3px;
    }
    input {
      width: 100%;
      padding: 10px 0;
      border: none;
      outline: none;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }
}
</style>
