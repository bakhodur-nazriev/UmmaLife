<template>
  <header class="post__header">
    <router-link class="post__author" to="#">
      <img
        width="56"
        height="56"
        src="../../../../assets/images/Article_Author.png"
        alt=""
      >
      <div class="author-info">
        <span class="author-info__name">Абрахам Арахамович</span>
        <span class="author-info__time">15 минут назад</span>
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

<style scoped lang="scss">
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

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__time {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }

  &__name {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .post__author {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .author-info {
    row-gap: 4px;
    &__name {
      font-size: 16px;
      line-height: 1;
      font-weight: 500;
    }

    &__time {
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
