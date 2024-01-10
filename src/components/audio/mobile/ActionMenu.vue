<template>
  <div class="action__menu--outer">
    <div class="action__menu" v-on-click-outside="() => emit('closeHandler')">
      <div class="action__menu--inner">
        <div class="action__menu--top">
          <ul class="action__menu--list">
            <li @click="(isLiked = !isLiked), emit('likeHandler', isLiked)">
              <AudioLikeIcon v-if="!isLiked" /><AudioFilledLikeIcon v-else /> <span>Like</span>
            </li>
            <li><AudioDownloadIcon /> <span>Download</span></li>
            <li @click="emit('shareHandler')"><AudioShareIcon /> <span>Share</span></li>
          </ul>
        </div>
        <div class="action__menu--btn" @click="emit('closeHandler')">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioFilledLikeIcon from '@/components/icons/audio/AudioFilledLikeIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
const isLiked = ref(false)
const emit = defineEmits(['closeHandler', 'likeHandler', 'shareHandler'])
</script>

<style lang="scss" scoped>
.action__menu {
  &--outer {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    width: 100vw;
    height: 100%;
    z-index: 151;
  }
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  z-index: 200;
  &--inner {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 16px;
  }
  &--top {
    width: 100%;
    background-color: var(--color-white);
    padding: 24px;
    border-radius: 10px;
  }
  &--list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 37px;
    li {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--color-mine-shaft);
      svg {
        color: var(--color-hippie-blue);
      }
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  &--btn {
    background-color: var(--color-white);
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    color: var(--color-mine-shaft);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
