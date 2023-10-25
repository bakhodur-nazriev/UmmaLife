<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav">
      <button @click="emit('backToMain')" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">Сategory page</div>
      <div class="left"></div>
    </div>
    <div class="muvi__mobile--top">
      <img
        class="muvi__mobile--top-img"
        src="@/assets/images/articles/articles_2.png"
        alt="articles_2"
      />
      <div class="muvi__mobile--top-info">
        <div class="muvi__mobile--top-title">Cars</div>
        <div class="muvi__mobile--top-views">45 612 MUVI - 17mln views</div>
        <div class="muvi__mobile--top-btn"><CheckMarkIcon /> You are subscribed</div>
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard v-for="card in muvies" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import { muvies } from '@/dummy'

const emit = defineEmits(['backToMain'])
</script>

<style lang="scss">
.muvi__mobile {
  background-color: var(--color-white);
  &--nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px 16px;
    position: sticky;
    top: -1px;
    left: 0;
    background-color: var(--color-light-yellow);
    &.white {
      background-color: var(--color-white);
      box-shadow: 0px 2px 3px 0px rgba(157, 157, 157, 0.3);
    }
    z-index: 10;
    .left,
    &-btn {
      width: 28px;
      height: 28px;
      outline: none;
      border: none;
      background: transparent;
      padding: 0;
      display: block;
    }
    &-title {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }
  &--top {
    padding: 10px 16px 16px;
    background-color: var(--color-light-yellow);
    display: flex;
    align-items: center;
    gap: 12px;
    &.white {
      background-color: var(--color-white);

      .muvi__mobile--top-title,
      .muvi__mobile--top-views {
        color: var(--color-mine-shaft);
      }
    }
    &-img {
      width: 80px;
      height: 80px;
      display: block;
      border-radius: 6px;
      object-fit: cover;
      object-position: center;
    }
    &-title {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-yellow);
      margin-bottom: 4px;
    }
    &-views {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-yellow);
      margin-bottom: 8px;
    }
    &-btn {
      color: var(--color-white);
      background-color: var(--color-yellow);
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 8px;
      svg {
        width: 12px;
        height: 12px;
        display: block;
      }
    }
  }
  &--wrapper {
    padding: 20px 16px 84px 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }
}
</style>
