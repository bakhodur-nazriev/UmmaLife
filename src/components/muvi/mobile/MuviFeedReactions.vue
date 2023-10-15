<template>
  <div class="muvi__feeds--reactions">
    <div class="profile">
      <img src="/images/users/jeff.png" alt="jeff" />
    </div>
    <div class="reaction like" @click="isLiked = !isLiked">
      <HeartFilledIcon v-if="isLiked" />
      <HeartIcon v-else />
      <p>280</p>
    </div>
    <div class="reaction" @click="emit('commentClicked')">
      <MessageBlackIcon />
      <p>280</p>
    </div>
    <div class="reaction" @click="emit('shareClicked')">
      <ForwardIcon />
      <p>280</p>
    </div>
    <div class="reaction" @click="emit('menuClicked')">
      <MenuBlackDetailsIcon />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import HeartFilledIcon from '@/components/icons/HeartFilledIcon.vue'
import MessageBlackIcon from '@/components/icons/MessageBlackIcon.vue'
import ForwardIcon from '@/components/icons/ForwardIcon.vue'
import MenuBlackDetailsIcon from '@/components/icons/MenuBlackDetailsIcon.vue'

const isLiked = ref(false)

const emit = defineEmits(['modalClicked', 'shareClicked', 'menuClicked'])
</script>

<style lang="scss" scoped>
.muvi__feeds {
  &--reactions {
    position: absolute;
    bottom: 114px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    .profile {
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-hippie-blue);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
    }
    .reaction {
      color: var(--color-white);
      display: flex;
      flex-direction: column;
      gap: 3px;
      &.like {
        svg {
          height: 28px;
        }
      }
      svg {
        width: 24px;
      }
      p {
        margin: 0;
        padding: 0;
        text-align: center;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>
