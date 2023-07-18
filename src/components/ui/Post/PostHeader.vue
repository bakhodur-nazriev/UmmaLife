<template>
  <header class="post__header">
    <router-link class="post__author" to="#">
      <img
        width="56"
        height="56"
        src="@/assets/images/Article_Author.png"
        alt=""
      >
      <div class="author__info">
        <span class="name">Абрахам Арахамович</span>
        <span class="time">15 минут назад</span>
      </div>
    </router-link>
    <div class="menu__button">
      <SampleMenuDetailsButton
        :is-menu-open="isMenuOpen"
        @toggle-menu="$emit('toggle-menu')"
      />
    </div>
  </header>
</template>
<script>
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'

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
  color: var(--color-silver-chalice);
}

.post__author {
  display: flex;
  text-decoration: none;
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

.time {
  color: var(--color-silver-chalice);
  font-size: 14px;
}

.name {
  color: var(--color-mine-shaft);
  font-size: 18px;
}

.author__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
