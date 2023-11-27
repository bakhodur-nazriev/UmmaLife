<template>
  <div class="muvi__feeds--info" v-if="muvi?.description">
    <div
      class="muvi__feeds--info-text"
      :class="{ 'not-active': isTextClicked }"
      @click="isTextClicked = !isTextClicked"
      v-on-click-outside="() => (isTextClicked = true)"
    >
      {{ extractHashtagsAndText(muvi?.description).textWithoutHashtags }}
    </div>
    <div class="muvi__feeds--info-tags">
      <div
        class="muvi__feeds--info-tags-list"
        v-for="hashtag in extractHashtagsAndText(muvi?.description).hashtags"
        :key="hashtag"
      >
        {{ hashtag }}
      </div>
      <!-- <div class="muvi__feeds--info-tags-list" @click="emit('audioHandler')">
        <MusicIcon />Halal beats - Ramadan
      </div> -->
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { extractHashtagsAndText } from '@/utils'
// import MusicIcon from '@/components/icons/shorts/MusicIcon.vue'
import { vOnClickOutside } from '@vueuse/components'
const isTextClicked = ref(true)
const emit = defineEmits(['categoryHandler', 'audioHandler'])

const props = defineProps({
  muvi: Object
})
</script>

<style lang="scss" scoped>
.muvi__feeds {
  &--info {
    position: absolute;

    bottom: 48px;
    left: 16px;
    width: calc(100% - 72px);
    &-text {
      font-family: 'HelveticaNeueCyr', sans-serif;
      text-transform: initial;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
      margin-bottom: 4px;
      word-break: normal;
      max-height: 200px;
      overflow-y: auto;
      transition: max-height 0.3s ease-in-out;
      position: relative;

      &::-webkit-scrollbar {
        display: none;
      }
      &.not-active {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        word-break: break-all;
        max-height: 16px;
      }
    }
    &-tags {
      display: flex;
      align-items: center;
      gap: 8px;
      &-list {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        gap: 4px;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        border-radius: 8px;
        text-transform: none;
        background: rgba(255, 255, 255, 0.2);
        font-family: 'HelveticaNeueCyr', sans-serif;
      }
    }
  }
}
</style>
