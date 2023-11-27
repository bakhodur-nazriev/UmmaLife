<template>
  <router-link :to="id" class="user__info" :class="size">
    <div class="user__info--cover" :class="{ investor: status.is_investor }">
      <div class="user__info--avatar">
        <img :src="avatar" :alt="username" class="user__info--img" loading="lazy" />
        <PremiumIcon
          class="user__info--premium"
          :is_investor="status.is_investor"
          v-if="status.is_investor || status.is_premium === '1'"
        />
      </div>
      <div class="user__info--info" v-if="!noName">
        <div class="user__info--name">{{ username }}</div>
        <slot name="time" />
      </div>
    </div>
    <div class="user__info--bage" v-if="status.verified === '1' && !noName">
      <BageIcon />
    </div>
  </router-link>
</template>

<script setup>
/* eslint-disable */
import BageIcon from '@/components/icons/BageIcon.vue'
import PremiumIcon from '@/components/icons/PremiumIcon.vue'

const props = defineProps({
  username: {
    type: String,
    default: 'jeff'
  },
  avatar: {
    type: String,
    default: '/images/users/jeff.png'
  },
  status: {
    type: Object,
    default: () => ({
      verified: '0',
      is_premium: '0',
      is_investor: false
    })
  },
  id: {
    type: [String, Number],
    default: '#'
  },
  size: {
    type: String,
    default: 'normal' //small | normal | large | extra_large
  },
  noName: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.user {
  &__info {
    display: flex;
    align-items: center;
    text-decoration: none;
    &.small {
      .user__info--avatar {
        width: 24px;
        height: 24px;
      }
      .user__info--cover {
        gap: 8px;
      }
      .user__info--premium {
        bottom: -4px;
        right: -4px;
        scale: 0.8;
      }
      .user__info--cover.investor .user__info--img {
        border-radius: 4px;
      }
      .user__info--cover.investor .user__info--premium {
        bottom: -3px;
        right: -3px;
        scale: 0.75;
      }
    }
    &--info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    &--cover {
      display: flex;
      align-items: center;
      gap: 12px;
      &.investor {
        .user__info--img {
          border-radius: 8px;
        }
        .user__info--name {
          background: var(--silver-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .user__info--premium {
          bottom: -1px;
        }
      }
    }
    &--avatar {
      width: 40px;
      height: 40px;
      position: relative;
    }
    &--premium {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &--img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      object-position: center;
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
}
</style>
