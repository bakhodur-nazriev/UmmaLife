<template>
  <div class="card">
    <div class="card__left">
      <div class="card__img">
        <img :src="user.img" :alt="user.name" />
        <PremiumIcon v-if="user.isVerified" class="card__img--premium" />
      </div>
      <div class="card__info">
        <div class="card__info--name" :class="{ premium: user.isPremiuim }">
          {{ user.name }} <BageIcon v-if="user.hasBadge" />
        </div>
        <div class="card__info--desc" v-if="user.desc">{{ user.desc }}</div>
      </div>
    </div>
    <button class="card__btn" v-if="!controls">Подписаться</button>
    <div class="card__actions" v-else>
      <button class="card__btn"><PlusIcon />Админ</button>
      <button class="card__btn delete">Удалить</button>
    </div>
  </div>
</template>

<script>
import BageIcon from '@/components/icons/BageIcon.vue'
import PremiumIcon from '@/components/icons/PremiumIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  props: {
    user: Object,
    controls: Boolean
  },
  components: { BageIcon, PremiumIcon, PlusIcon }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  &__actions {
    display: flex;
    gap: 8px;
    .card__btn {
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      svg {
        width: 20px;
        height: 20px;
        margin-left: -10px;
      }
      &.delete {
        background: var(--color-seashell);
        color: var(--color-valencia);
      }
    }
  }
  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__img {
    max-width: 40px;
    width: 100%;
    height: 40px;
    border-radius: 50%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      border-radius: 50%;
      overflow: hidden;
    }
    &--premium {
      position: absolute;
      bottom: -2px;
      right: -2px;
    }
  }
  &__info {
    &--name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      &.premium {
        background: var(--silver-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      display: flex;
      align-items: center;
      gap: 4px;
    }
    &--desc {
      margin-top: 4px;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      color: var(--color-secondary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }
  }
  &__btn {
    max-width: 178px;
    width: 100%;
    padding: 10px;
    background: var(--color-green);
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--color-white);
  }
}
</style>
