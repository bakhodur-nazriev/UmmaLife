<template>
  <div class="albums__detail--outer">
    <div class="albums__detail" v-on-click-outside="closeDetailHandler">
      <div class="albums__detail--left">
        <div class="albums__detail--inner">
          <div class="playlist__cover">
            <img src="/images/message/message-img.jpg" alt="message-img" />
          </div>
          <div class="albums__detail--name">Название:</div>
          <div class="albums__detail--text">Какое-то название для альбома с аудио</div>
          <div class="albums__detail--name">Описание:</div>
          <div class="albums__detail--text">
            Какое-то интересное описание к плейлисту с аудио, которое дал пользователь и которое
            ярко описывает все те эмоции, которые можно получить от аудио.
          </div>
        </div>
        <div class="albums__detail--action">
          <button class="albums__detail--btn"><PlusIcon :black="true" />Добавить</button>
          <button class="albums__detail--btn"><ShareIcon color="#000" />Поделиться</button>
        </div>
      </div>
      <div class="albums__detail--right">
        <AudioList
          v-for="(audio, i) in audios"
          :key="audio.id"
          :audio="audio"
          :index="i"
          :playList="true"
          :className="audioIndex === i ? 'track__list active__list' : 'track__list'"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PlusIcon from '@/components/icons/PlusIcon.vue'
import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import AudioList from '@/components/audio/AudioList.vue'
import ShareIcon from '@/components/icons/shorts/ShareIcon.vue'
import { mapState } from 'vuex'

export default {
  components: { PlusIcon, BookmarkIcon, AudioList, ShareIcon },
  computed: {
    ...mapState('audio', ['audios', 'audioIndex'])
  }
}
</script>

<script setup>
/* eslint-disable */
import { vOnClickOutside } from '@vueuse/components'

const emit = defineEmits(['closeDetailHandler'])
const closeDetailHandler = () => {
  emit('closeDetailHandler')
}
</script>

<style lang="scss">
.albums__detail {
  &--outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  max-width: 1077px;
  width: 100%;
  height: 599px;
  background: var(--color-white);
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;

  &--left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &--name {
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 8px;
  }
  &--text {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
    color: var(--color-secondary);
    margin-bottom: 20px;
  }
  &--action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    gap: 8px;
    width: 175px;
    padding: 15px 12px 13px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #000;
    border-radius: 12px;
    background: var(--color-seashell);
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .playlist__cover {
    margin-bottom: 16px;
  }
}
</style>
