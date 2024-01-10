<template>
  <div class="actions">
    <div class="actions__left">
      <button class="actions__btn">
        <BackIcon />
      </button>
    </div>
    <div class="actions__right">
      <button class="actions__btn">
        <SearchIcon />
      </button>
      <button class="actions__btn">
        <AddIcon />
      </button>
      <button class="actions__btn">
        <MenuIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import AddIcon from '../icons/profile/AddIcon.vue'
import BackIcon from '../icons/profile/BackIcon.vue'
import MenuIcon from '../icons/profile/MenuIcon.vue'
import SearchIcon from '../icons/profile/SearchIcon.vue'
</script>

<style lang="scss" scoped>
.actions {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 15;
  &__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    backdrop-filter: blur(5px);
    background-color: var(--gray-rgba);
    outline: none;
    border: none;
    display: grid;
    place-items: center;
  }
}
</style>
