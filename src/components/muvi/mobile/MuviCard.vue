<template>
  <div class="muvi__card">
    <img :src="muvi?.preview" :alt="muvi?.username" />
    <div class="muvi__card--profile" v-if="!muvi?.owner">
      <UserInfo
        :avatar="muvi?.publisher?.avatar"
        :username="muvi?.publisher?.username"
        :status="{
          is_investor: muvi?.publisher?.isInvestor || false,
          verified: muvi?.publisher?.verified || '0',
          is_premium: muvi?.publisher?.is_premium || '0'
        }"
        size="small"
      />
    </div>
    <div class="muvi__card--seen" v-else>
      <MuviPlayIcon />
      <span>{{ shortNum(muvi?.videoViews || 0) }}</span>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import shortNum from 'number-shortener'
import MuviPlayIcon from '@/components/icons/shorts/mobile/MuviPlayIcon.vue'
import UserInfo from '@/components/ui/UserInfo.vue'

const props = defineProps({
  muvi: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.muvi__card {
  position: relative;
  border-radius: 8px;
  height: 293px;
  overflow: hidden;
  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &--profile {
    position: absolute;
    bottom: 8px;
    left: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 20px;
      height: 20px;
      display: block;
      overflow: hidden;
      border-radius: 50%;
    }
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-white);
    }
  }
  &--seen {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    color: var(--color-stable-white);
    display: flex;
    align-items: center;
    gap: 4px;
    svg {
      width: 10px;
      height: 10px;
      display: block;
    }
    span {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
