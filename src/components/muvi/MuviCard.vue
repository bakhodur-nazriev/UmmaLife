<template>
  <div class="muvi__card" @click="emit('cardClickHandler')">
    <div class="muvi__card--top">
      <img :src="muvi.preview" :alt="muvi.description" class="muvi__card--img" loading="lazy" />
      <div class="muvi__card--seen">
        <SeenIcon /><span>{{ shortNum(Number(muvi.videoViews || 0)) }}</span>
      </div>
    </div>
    <div class="muvi__card--title">{{ muvi.description }}</div>
    <a href="#" class="muvi__card--profile">
      <img :src="muvi.user_avatar" :alt="muvi.username" loading="lazy" />
      <span>{{ muvi.username }}</span>
    </a>
  </div>
</template>

<script setup>
/* eslint-disable */
import shortNum from 'number-shortener'
import SeenIcon from '@/components/icons/SeenIcon.vue'
const props = defineProps({
  muvi: Object
})
const emit = defineEmits(['cardClickHandler'])
</script>

<style lang="scss" scoped>
.muvi__card {
  width: 100%;
  height: 474px;
  &--top {
    height: 415px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    user-select: none;
    margin-bottom: 12px;
    display: block;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 30.26%, rgba(0, 0, 0, 0.4) 99.95%);
    }
  }
  &--img {
    display: block;
    width: 100%;
    min-height: 415px;
    object-fit: cover;
    object-position: center;
  }
  &--seen {
    position: absolute;
    bottom: 17px;
    left: 16px;
    color: var(--color-stable-white);
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 10;
    svg {
      width: 15px;
      height: 16px;
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  &--title {
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    cursor: pointer;
    word-break: break-all;
  }
  &--profile {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    width: fit-content;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
  }
}
</style>
