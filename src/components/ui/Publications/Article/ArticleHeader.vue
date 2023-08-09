<template>
  <section class="article__header--section">
    <div class="author__avatar--name--time">
      <img
        src="../../../../assets/images/Article_Author.png"
        alt="author"
        width="56"
        height="56"
      >
      <div class="author-info">
        <span class="author-info__name">Абрахам Арахамович</span>
        <small class="author-info__time">15 минут назад</small>
      </div>
    </div>
    <div>
      <SampleMenuDetailsButton
        :is-menu-open="isMenuOpen"
        @toggleMenu="$emit('toggle-menu')"
      />
    </div>
  </section>
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
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.article__header--section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.author__avatar--name--time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-info {
  display: flex;
  flex-direction: column;

  &__name {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }

  &__time {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .author__avatar--name--time {
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
