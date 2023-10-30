<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--nav white">
      <button @click="emit('backToMain')" class="muvi__mobile--nav-btn"><ArrowLeftIcon /></button>
      <div class="muvi__mobile--nav-title">Profile</div>
      <div class="left share__icon">
        <ShareLinkIcon />
      </div>
    </div>
    <div class="muvi__mobile--profile">
      <div class="muvi__mobile--profile-block">
        <div class="muvi__mobile--profile-top">
          <img src="/images/users/jeff.png" alt="jeff" />
          <div class="muvi__mobile--profile-info">
            <div class="muvi__mobile--profile-name">Ibragim Ibragimov</div>
            <a href="#" class="muvi__mobile--profile-link">Go to UMMA LIFE profile</a>
          </div>
        </div>
        <div class="muvi__mobile--profile-middle">
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(13) }}</p>
            <span>MUVI</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(252000) }}</p>
            <span>views</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(45200) }}</p>
            <span>reactions</span>
          </div>
          <div class="muvi__mobile--profile-list">
            <p>{{ shortNum(210) }}</p>
            <span>followers</span>
          </div>
        </div>
        <SampleButton title="Follow" padding="8px 12px" width="100%" :size="14" />
      </div>
    </div>
    <div class="muvi__mobile--wrapper">
      <MuviCard v-for="card in muvies" :key="card.id" :card="card" :profile="true" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import shortNum from 'number-shortener'
import ArrowLeftIcon from '@/components/icons/shorts/ArrowLeftIcon.vue'
import MuviCard from '@/components/muvi/mobile/MuviCard.vue'
import { muvies } from '@/dummy'
import ShareLinkIcon from '@/components/icons/ShareLinkIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

const emit = defineEmits(['backToMain'])
</script>

<style lang="scss" scoped>
.muvi__mobile {
  .share__icon {
    color: var(--color-hippie-blue);
    width: 24px;
    height: 24px;
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &--profile {
    padding: 20px 16px 0;
    &-block {
      background-color: var(--color-white);
      padding: 16px;
      box-shadow: 10px 0px 40px rgba(108, 108, 108, 0.15);
      border-radius: 8px;
    }
    &-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &-name {
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
    }
    &-link {
      display: inline-block;
      font-size: 14px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      text-decoration-line: underline;
      color: var(--color-hippie-blue);
    }
    &-middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-grow: 1;
      &:not(:last-child) {
        border-right: 1px solid var(--color-seashell);
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
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
}
</style>
