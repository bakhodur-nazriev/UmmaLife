<template>
  <div class="stickers-block">
    <div class="stickers-filter">
      <TimeSmallIcon/>
      <FavouriteSmallIcon/>
    </div>

    <div class="stickers-pack__list-block">
      <ul class="stickers-pack__list">
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
        <li class="stickers-pack__list-item"><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
      </ul>
    </div>
  </div>

  <SampleDivider/>

  <div class="main__search--block">
    <LoupeIcon class="search__icon"/>
    <input class="base__search--input" :placeholder="$t('placeholders.search_input')"/>
  </div>

  <div class="popular-stickers__section">
    <p>{{ $t('labels.stickers.popular_stickers') }}</p>
  </div>

  <div class="popular-sticker__pack-block">
    <ul class="popular-stickers__pack-list">
      <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_2.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_3.png" alt=""></li>
      <li><img src="@/assets/images/stickers/sticker_4.png" alt=""></li>
    </ul>
  </div>

  <div class="featured-stickers__section">
    <p>{{ $t('labels.stickers.featured_stickers') }}</p>
  </div>

  <div class="featured-stickers__pack-block">
    <ul class="featured-stickers__pack-list">
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_1.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_2.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_3.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_4.png" alt=""></li>
      <li class="featured-stickers__pack-list-item"><img src="@/assets/images/stickers/popular_5.png" alt=""></li>
    </ul>
  </div>
</template>

<script>
import TimeSmallIcon from '@/components/icons/comment/TimeSmallIcon.vue'
import SampleDivider from '@/components/ui/SampleDivider.vue'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'
import FavouriteSmallIcon from '@/components/icons/comment/FavouriteSmallIcon.vue'

export default {
  components: {
    TimeSmallIcon,
    SampleDivider,
    LoupeIcon,
    FavouriteSmallIcon
  }
}
</script>

<style scoped lang="scss">
.stickers-block {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;

  .stickers-filter {
    display: flex;
    gap: 12px;
  }

  .stickers-pack__list-block {
    width: 82%;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .stickers-pack__list {
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-x: scroll;

      &-item {
        display: flex;
        cursor: pointer;

        img {
          min-width: 28px;
          min-height: 28px;
          border-radius: 2px;
        }
      }
    }
  }

  .main__search--block {
    width: 100%;
  }
}

.main__search--block {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  .search__icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    display: flex;
  }
}

.base__search--input {
  border-radius: 10px;
  background-color: var(--color-seashell);
  color: var(--color-mine-shaft);
  border: none;
  outline: none;
  font-size: 14px;
  padding: 12px 12px 12px 48px;
  width: 100%;

  &::placeholder {
    color: var(--color-silver-chalice);
  }
}

.popular-stickers__section,
.featured-stickers__section {
  width: 100%;
  display: flex;
  justify-content: center;

  p {
    font-size: 14px;
    color: var(--color-secondary);
    margin-bottom: 12px;
    margin-top: 20px;
  }
}

.popular-sticker__pack-block {
  width: 100%;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.popular-stickers__pack-list {
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;
  overflow-x: scroll;

  li {
    min-width: 28px;
    min-height: 28px;
    cursor: pointer;

    img {
      border-radius: 2px;
    }
  }
}

.featured-stickers__pack-block {
  overflow: auto;
  scrollbar-width: thin;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.featured-stickers__pack-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  &-item {
    display: flex;
    flex-basis: calc(19% - 4px);

    img {
      width: 100%;
    }
  }
}
</style>
