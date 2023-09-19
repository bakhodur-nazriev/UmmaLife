<template>
  <div class="aside__video">
    <router-link :to="`/video/${index}`" class="aside__video--img">
      <img src="/images/message/message-img.jpg" alt="message-img" />
    </router-link>
    <div class="aside__video--info">
      <router-link :to="`/video/${index}`" class="aside__video--title">
        Вообще любое название для видео, которое влазит на 2 ст название для видео название для
        видео
      </router-link>
      <div class="aside__video--name">Максуд Максудов</div>
      <div class="aside__video--time">349 просмотров - 1 час назад</div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  index: {
    type: Number
  }
})
</script>
<style lang="scss" scoped>
.aside__video {
  display: flex;
  gap: 8px;
  &--img {
    max-width: 168px;
    width: 100%;
    height: 94px;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &--title {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: 120%;
    color: var(--color-mine-shaft);
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    margin-bottom: 8px;
  }
  &--name {
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-gray);
    margin-bottom: 8px;
  }
  &--time {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-gray);
  }
}
</style>
