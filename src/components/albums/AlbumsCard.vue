<template>
  <div class="albums__card">
    <div class="albums__card--top">
      <div class="albums__card--left">
        <img class="albums__card--preview" src="/images/users/jeff.png" alt="jeff" />
        <div class="albums__card--info">
          <div
            class="albums__card--title"
            style="cursor: pointer"
            v-if="mainCard"
            @click="$emit('openCard')"
          >
            My favourite summer
          </div>
          <div class="albums__card--title" v-else>My favourite summer</div>
          <div class="albums__card--date">Создано: 20.08.2022</div>
        </div>
      </div>
      <div class="albums__card--right">
        <div class="albums__card--qty">25 фото</div>
        <button class="albums__card--add" @click="$emit('openAdd')">Добавить</button>
      </div>
    </div>
    <div class="albums__card--text">
      Погрузитесь в уникальные моменты, запечатленные профессиональным глазом фотографа. Откройте
      для себя этот альбом и проникнитесь его неповторимым очарованием.
    </div>
    <div class="albums__card--images" :class="{ 'main-card': mainCard }">
      <a
        data-fancybox
        :href="`/images/albums/album-${i}.jpg`"
        class="image"
        :class="!mainCard ? `image-${i}` : ''"
        v-for="i in isMainCard"
        :key="i"
      >
        <img :src="`/images/albums/album-${i}.jpg`" :alt="`album-${i}`" />
      </a>
    </div>
  </div>
</template>

<script>
import { Fancybox } from '@fancyapps/ui'

export default {
  props: ['mainCard'],
  emits: ['openAdd', 'openCard'],
  computed: {
    isMainCard() {
      return this.mainCard ? 12 : 10
    }
  },
  mounted() {
    Fancybox.bind('[data-fancybox]', {
      wheel: 'zoom'
    })
  }
}
</script>

<style lang="scss" scoped>
.albums__card {
  background: var(--color-white);
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 8px;
  &--top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 16px;
  }
  &--left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &--preview {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: 130%;
    color: var(--color-mine-shaft);
    margin-bottom: 4px;
  }
  &--date {
    font-size: 12px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
  }
  &--right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &--qty {
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-silver-chalice);
  }
  &--add {
    padding: 14px 20px 12px;
    width: 145px;
    text-align: center;
    border: 1px solid var(--color-green);
    outline: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-green);
    background: none;
    font-family: inherit;
    border-radius: 10px;
    cursor: pointer;
  }
  &--text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    color: var(--color-secondary);
    margin-bottom: 20px;
  }
  &--images {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 151px 111px 161px 161px;
    gap: 8px;
    &.main-card {
      grid-template-columns: repeat(6, 108px);
      grid-template-rows: 108px 108px;
      gap: 4px;
      @media (max-width: 575px) {
        grid-template-columns: repeat(3, 33.333%);
        grid-template-rows: unset;
      }
    }
    .image {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;

      img {
        object-fit: cover;
        object-position: center;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .image-1 {
      grid-column: 1 / 5;
      grid-row: 1 / 3;
    }
    .image-2 {
      grid-column: 5 / 8;
      grid-row: 1 / 2;
    }
    .image-3 {
      grid-column: 5 / 8;
      grid-row: 2 / 3;
    }
    .image-4 {
      grid-column: 8 / -1;
      grid-row: 1 / 3;
    }
    .image-5 {
      grid-column: 1 / 4;
    }
    .image-6 {
      grid-column: 4 / 7;
    }
    .image-7 {
      grid-column: 7 / 10;
    }
    .image-8 {
      grid-column: 10 / -1;
    }
    .image-9 {
      grid-column: 1 / 7;
    }
    .image-10 {
      grid-column: 7 / -1;
    }
  }
}
</style>
