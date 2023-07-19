<template>
  <section class="article__header--section">
    <div class="author__avatar--name--time">
      <img
        src="@/assets/images/Article_Author.png"
        alt="author"
        width="56"
        height="56"
      >
      <div class="author__name--time">
        <span>Абрахам Арахамович</span>
        <small>15 минут назад</small>
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
    return {

    }
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

.author__name--time {
  display: flex;
  flex-direction: column;

  span {
    color: var(--color-mine-shaft);
    font-size: 18px;
  }

  small {
    color: var(--color-silver-chalice);
    font-size: 14px;
  }
}
</style>
