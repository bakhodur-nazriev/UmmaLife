<template>
  <div class="detail__nav">
    <div class="detail__nav--title">{{ $t('library.popular_books') }}</div>
    <div class="detail__nav--wrapper">
      <router-link
        :to="`/${$i18n.locale}/library/${book.id}`"
        class="detail__nav--list"
        v-for="book in books"
        :key="book.id"
      >
        <img :src="book.img" :alt="book.name" />
        <div>
          <div class="detail__nav--name">{{ book.name }}</div>
          <ul class="detail__nav--menu">
            <li>
              <span>{{ $t('library.author') }}:</span>
              <span>{{ book.author }}</span>
            </li>
            <li>
              <span>{{ $t('library.views') }}:</span>
              <span>2507</span>
            </li>
          </ul>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { books } from '@/dummy'
</script>

<style lang="scss" scoped>
.detail {
  &__nav {
    background-color: var(--color-white);
    padding: 18px;
    height: fit-content;
    border-radius: 10px;
    &--title {
      font-size: 20px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 12px;
    }
    &--wrapper {
      display: flex;
      flex-direction: column;
    }
    &--list {
      padding: 16px 0;
      cursor: pointer;
      text-decoration: none;
      &:not(:last-child) {
        border-bottom: 1px solid var(--color-gallery-first);
      }
      &:first-child {
        padding-top: 0;
      }
      display: grid;
      grid-template-columns: 60px 1fr;
      gap: 12px;
      img {
        width: 100%;
        height: 86px;
        display: block;
        object-fit: cover;
        object-position: center;
        border-radius: 4px;
        overflow: hidden;
      }
    }
    &--name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: 120%;
      color: var(--color-mine-shaft);
      margin-bottom: 8px;
    }
    &--menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      li {
        display: flex;
        gap: 4px;
        span {
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: var(--color-secondary);
        }
      }
    }
  }
}
</style>
