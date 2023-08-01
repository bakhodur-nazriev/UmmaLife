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
  background: #fff;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.15);
  padding: 5px;
  max-width: 168px;
  width: 100%;
  &__list {
    display: flex;
    flex-direction: column;
  }
}
</style>
