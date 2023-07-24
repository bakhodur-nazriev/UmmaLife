<script setup>
/* eslint-disable */
import SampleMenuDetailsButton from '@/components/ui/MenuDetails/SampleMenuDetailsButton.vue'

const props = defineProps({
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  }
)
</script>

<template>
  <article class="article__block">
    <section class="article__header--section">
      <div class="author__avatar--name--time">
        <img
          src="../../../assets/images/Article_Author.png"
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

    <section class="article__content--section">
      <div class="content__left--side">
        <img
          src="../../../assets/images/article_image.png"
          alt=""
          width="420"
          height="225"
        >
      </div>
      <div class="content__right--side">
        <h3>Название статьи</h3>
        <p>The 29-year-old took more than a tenth of a second off a record that had stood for 16 years, clocking 52.20
          seconds to beat Russian Yuliya Pechonkina's previous mark of 52.34.
          "I'm just shocked," said Muhammad.
          "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'."
          "I've been kind of hitting that time in practice and my coach was like 'there's no way you can't do it'.""I've
          been kind of hitting that time inat time in... <a href="#">{{$t('links.read_more')}}...</a></p>
      </div>
    </section>

    <section></section>
  </article>
</template>

<style scoped lang="scss">
.article__content--section {
  display: flex;
  gap: 16px;

  .content__right--side {
    h3 {
      margin: 0;
    }
    a {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: 150%; /* 24px */
      color: var(--color-deep-cerulean);
      text-decoration: none;
    }
  }
}

.article__block {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 24px;
}

.article__header--section {
  display: flex;
  justify-content: space-between;
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

@media (max-width: 767px) {}

@media (min-width: 1200px) {
  .content__left--side {
    min-width: 420px;
  }
}
</style>
