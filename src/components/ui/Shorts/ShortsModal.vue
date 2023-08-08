<template>
  <div class="shorts__modal--overlay">
    <div class="shorts__modal" v-on-click-outside="closeDropdown">
      <div class="shorts__video">
        <ShortsCard class="isModal" />
      </div>
      <div class="shorts__content">
        <div class="shorts__info">
          <div class="shorts__info--top">
            <div class="shorts__user--wrapper">
              <div class="shorts__user">
                <img src="/images/users/jeff.png" alt="jeff" class="shorts__user--img" />
                <div class="shorts__user--name">arabman</div>
                <div class="shorts__user--bage">
                  <BageIcon />
                </div>
              </div>
              <button class="shorts__info--details">
                <MenuBlackDetailsIcon />
              </button>
            </div>

            <div class="shorts__info--text">
              Небольшой влог о самом высокоразвитом городе мира - Дубае. Почему мы выбрали этот
              город для...
            </div>
            <div class="shorts__bottom">
              <div class="shorts__bottom--views">1 тыс. просмотров</div>
              <span>|</span>
              <div class="shorts__bottom--date">20.08.2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'
import ShortsCard from '@/components/ui/Shorts/ShortsCard.vue'
import BageIcon from '@/components/icons/BageIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'

const emit = defineEmits(['handleClickOutside'])

const closeDropdown = () => {
  emit('handleClickOutside')
}
</script>

<style lang="scss" scoped>
.shorts {
  &__modal {
    max-width: 1015px;
    width: 100%;
    background: var(--color-white);
    height: 916px;
    display: grid;
    grid-template-columns: 515px 500px;
    &--overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }
  }
  &__content {
    padding: 28px 20px 0;
    position: relative;
  }
  &__user {
    display: flex;
    align-items: center;

    &--wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    &--img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
      margin-right: 12px;
    }
    &--name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-right: 4px;
    }
    &--bage {
      margin-top: 1px;
      svg {
        display: block;
        width: 14px;
        height: 14px;
      }
    }
  }
  &__info {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-gallery-first);
    &--details {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      svg {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
    &--text {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      color: var(--color-mine-shaft);
      margin-bottom: 12px;
    }
  }
  &__bottom {
    display: flex;
    gap: 4px;
    span,
    &--date,
    &--views {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-secondary);
    }
  }
}
</style>
