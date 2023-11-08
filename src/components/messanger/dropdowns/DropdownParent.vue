<template>
  <div class="dropdown">
    <div class="dropdown__list">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  border-radius: 10px;
  background-color: var(--color-white);
  background: var(--color-white);
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.15);
  padding: 5px;
  max-width: 168px;
  width: 100%;
  &__list {
    display: flex;
    flex-direction: column;
  }
}
</style>
