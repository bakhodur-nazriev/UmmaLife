<template>
  <div class="muvi__card">
    <img :src="card.img" :alt="card.title" />
    <div class="muvi__card--profile" v-if="!profile">
      <img :src="card.user.img" :alt="card.user.name" />
      <span>{{ card.user.name }}</span>
    </div>
    <div class="muvi__card--seen" v-else>
      <MuviPlayIcon />
      <span>{{ shortNum(card.seen) }}</span>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import shortNum from 'number-shortener'
import MuviPlayIcon from '@/components/icons/shorts/mobile/MuviPlayIcon.vue'

const props = defineProps({
  card: {
    type: Object
  },
  profile: {
    type: Boolean,
    default: false
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
    color: var(--color-white);
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
