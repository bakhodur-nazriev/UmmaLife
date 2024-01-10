<template>
  <div class="albums__detail--outer">
    <div class="albums__detail" v-on-click-outside="closeDetailHandler">
      <div class="muvi__mobile--nav white" v-if="width < 767">
        <div class="library__actions--btn" @click="emit('closeDetailHandler')">
          <CloseFormIcon />
        </div>
        <div class="muvi__mobile--nav-title">{{ $t('audio.tabs.playlists') }}</div>
        <div class="left"></div>
      </div>
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
          <button class="albums__detail--btn"><PlusIcon />{{ $t('buttons.add') }}</button>
          <button class="albums__detail--btn"><ShareIcon />{{ $t('buttons.share') }}</button>
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
import { useWindowSize } from '@vueuse/core'
import CloseFormIcon from '@/components/icons/comment/CloseFormIcon.vue'

export default {
  components: {
    PlusIcon,
    BookmarkIcon,
    AudioList,
    ShareIcon,
    CloseFormIcon
  },
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
const { width } = useWindowSize()
</script>

<style lang="scss">
.albums__detail {
  &--outer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 120;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  max-width: 1077px;
  width: 100%;
  min-height: 599px;
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
  @media (max-width: 991px) {
    grid-template-columns: 100%;
    max-width: 95%;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    height: 100dvh;
    overflow-y: scroll;
    border-radius: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  &--inner {
    @media (max-width: 767px) {
      padding: 20px 16px 16px;
    }
  }
  &--left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &--right {
    @media (max-width: 767px) {
      padding: 0 8px;
    }
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
    @media (max-width: 767px) {
      margin-bottom: 0;
    }
  }
  &--action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 767px) {
      padding: 0 16px;
      margin-bottom: 12px;
    }
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
    color: var(--color-mine-shaft);
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
    width: 100%;
    @media (max-width: 767px) {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      margin: 0 auto 20px;
    }
  }
}
</style>
