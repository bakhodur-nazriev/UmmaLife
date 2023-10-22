<template>
  <router-link :to="`/${$i18n.locale}/library/${book.id}`" class="library__card">
    <div class="library__card--img">
      <img :src="book.img" :alt="book.name" />
      <div class="library__card--seen">
        <VisibleIcon />
        <span>548</span>
      </div>
    </div>
    <div class="library__card--info">
      <div class="library__card--top">
        <div class="library__card--name">{{ book.name }}</div>
        <div class="library__card--details">
          <div class="library__card--rating">
            <StarIcon />
            <span>{{ book.rating }}</span>
          </div>
          <div class="library__card--like" @click.stop.prevent="emit('likeHandler', !book.isLiked)">
            <HeartFilledIcon v-if="book.isLiked" />
            <HeartIcon v-else />
          </div>
        </div>
      </div>
      <div class="library__card--category">
        <p>Категория:</p>
        <span>{{ book.category }}</span>
      </div>
      <div class="library__card--author">
        <p>Автор:</p>
        <span>{{ book.author }}</span>
      </div>
      <div class="library__card--description">{{ book.desc }}</div>
    </div>
  </router-link>
</template>

<script setup>
/* eslint-disable */
import StarIcon from '@/components/icons/StarIcon.vue'
import HeartFilledIcon from '@/components/icons/HeartFilledIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import VisibleIcon from '@/components/icons/shorts/mobile/VisibleIcon.vue'

const props = defineProps({
  book: Object
})

const emit = defineEmits(['likeHandler'])
</script>

<style lang="scss" scoped>
.library__card {
  background-color: var(--color-white);
  border-radius: 20px;
  padding: 16px;
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 13px;
  user-select: none;
  text-decoration: none;
  &--img {
    position: relative;
    width: 100%;
    height: 186px;
    border-radius: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }
  &--seen {
    position: absolute;
    bottom: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;
    border-radius: 8px;
    background: rgba(45, 45, 45, 0.5);
    backdrop-filter: blur(10px);
    color: var(--color-white);
    span {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  &--top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  &--name {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &--details {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &--rating {
    border-radius: 8px;
    padding: 7px 8px;
    background-color: var(--color-seashell);
    display: flex;
    align-items: center;
    gap: 4px;
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }
  &--like {
    border-radius: 8px;
    padding: 7px 8px;
    background-color: var(--color-seashell);
    svg {
      display: block;
      width: 18px;
      height: 18px;
      color: var(--color-mine-shaft);
    }
  }
  &--category {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 9px;
    p {
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    span {
      padding: 10px 12px;
      border-radius: 8px;
      background-color: var(--color-seashell);
      color: var(--color-hippie-blue);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: block;
    }
  }
  &--author {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    p {
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }

  &--description {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: var(--color-mine-shaft);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
  }
}
</style>
