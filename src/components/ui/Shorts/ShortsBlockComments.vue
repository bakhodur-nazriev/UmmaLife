<template>
  <div class="comments">
    <div class="comments__top">
      <div class="comments__top--user">
        <img src="/images/users/jeff.png" alt="jeff" />
        <div class="comments__top--info">
          <div class="comments__top--name">Рабадан Гаджиев</div>
          <div class="comments__top--time">20 мин</div>
        </div>
      </div>
      <div class="comments__top--menu">
        <VerticalMenuIcon />
      </div>
    </div>
    <div class="comments__text">
      Текст самого комментария, в котором пользователь дает свою оценку публикации. Она ему может
      понравиться, а может и не понравиться. Он сам решает что ему делать.
    </div>
    <div class="comments__reactions">
      <div class="reaction active">
        <like-icon />
        <span>1,7k</span>
      </div>
      <div class="reaction">
        <love-icon />
        <span>123</span>
      </div>
      <div class="reaction">
        <dislike-icon />
        <span>98</span>
      </div>
    </div>
    <div class="comments__bottom">
      <div class="comments__bottom--reply">
        <ReplyIcon />
        <span>Ответить</span>
      </div>
      <div class="comments__bottom--more">Посмотреть еще 15 ответов</div>
    </div>
  </div>
</template>

<script setup>
import VerticalMenuIcon from '@/components/icons/shorts/VerticalMenuIcon.vue'
import ReplyIcon from '@/components/icons/shorts/ReplyIcon.vue'
import LoveIcon from '@/components/icons/reactions/men/small/LoveIcon.vue'
import LikeIcon from '@/components/icons/reactions/men/small/LikeIcon.vue'
import DislikeIcon from '@/components/icons/reactions/men/small/DislikeIcon.vue'
</script>

<style lang="scss" scoped>
.comments {
  padding: 10px 0;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    &--user {
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &--name {
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 4px;
    }
    &--time {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
    &--menu {
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    color: var(--color-mine-shaft);
    margin-bottom: 4px;
  }
  &__reactions {
    margin-bottom: 20px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    .reaction {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--color-seashell);
      cursor: pointer;
      &.active {
        background: var(--color-green);
        span {
          color: var(--color-white);
        }
      }
      svg {
        width: 16px;
        height: 16px;
        display: block;
      }
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    gap: 20px;
    &--reply {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      svg {
        width: 16px;
        height: 16px;
        display: block;
      }
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-secondary);
      }
    }
    &--more {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      color: var(--color-green);
      line-height: normal;
      cursor: pointer;
    }
  }
}
</style>
