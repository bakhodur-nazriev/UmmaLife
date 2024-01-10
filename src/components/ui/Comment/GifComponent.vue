<template>
  <div class="main__search--block">
    <LoupeIcon class="search__icon"/>
    <input class="base__search--input" :placeholder="$t('placeholders.search_input')"/>
  </div>

  <SampleDivider/>

  <div class="gifs-block">
    <ul class="gifs-list">
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_1.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_2.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_3.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_4.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_5.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_6.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_1.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_2.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_3.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_4.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_5.png" alt=""></li>
      <li class="gifs-list__item"><img src="@/assets/images/stickers/gif_6.png" alt=""></li>
    </ul>
  </div>
</template>

<script>
import SampleDivider from '@/components/ui/SampleDivider.vue'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'

export default {
  components: {
    LoupeIcon,
    SampleDivider
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0;
}

.gifs-block {
  overflow: auto;
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

.gifs-list {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    flex-basis: calc(33.33% - 4px);
    cursor: pointer;

    img {
      width: 100%;
    }
  }
}
</style>
