<template>
  <header class="post__header">
    <router-link class="post__author" to="#">
      <img width="56" height="56" src="../../../assets/images/Ellipse.png" alt="">
      <div class="author__info">
        <span class="name">Абрахам Арахамович</span>
        <span class="time">15 минут назад</span>
      </div>
    </router-link>
    <div class="menu__button">
      <sample-menu-details-button
        :is-menu-open="isMenuOpen"
        @toggle-menu="$emit('toggle-menu')"
      ></sample-menu-details-button>
    </div>
  </header>
</template>
<script>
import SampleMenuDetailsButton from '@/components/ui/SampleMenuDetailsButton.vue'

export default {
  components: {
    SampleMenuDetailsButton
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  }

}
</script>

<style scoped>
.menu__button svg {
  color: var(--color-text);
}

.post__author img {
  margin-right: 8px;
}

.post__header {
  display: flex;
  justify-content: space-between;
  margin: 0 0 8px 0;
}

.menu__button {
  cursor: pointer;
  height: 27px;
}

.post__author {
  display: flex;
  text-decoration: none;
}

.time {
  color: var(--color-text);
  font-size: 14px;
}

.name {
  color: var(--color-primary);
  font-size: 18px;
}

.author__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
