<template>
  <div class="main__search--block">
    <loupe-icon class="search__icon"></loupe-icon>
    <input
      class="base__search--input"
      :placeholder="placeholder"
    />
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
.base__search--input{
  background-color: #F1F1F1;
  color: #1F1F1F;
  border: none;
  outline: none;
}

.base__search--input::placeholder {
  color: #B0B0B0;
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
    border-radius: 50px;
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
    border-radius: 50px;
    width: 604px;
    font-size: 16px;
    padding: 12px 12px 12px 48px;
  }
}

</style>
