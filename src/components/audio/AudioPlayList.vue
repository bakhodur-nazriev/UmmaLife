<!-- eslint-disable -->
<template>
  <div class="play__list" :style="`bottom: ${playerHeight}px`">
    <div class="play__list--title">Автовоспроизведение / на очереди</div>
    <div class="play__list--wrapper">
      <AudioList
        v-for="(audio, i) in audios"
        :audio="audio"
        :index="i"
        :key="audio.id"
        :className="`track__list ${i === index ? 'active__list' : ''}`"
      ></AudioList>
    </div>
  </div>
</template>

<script>
import AudioList from '@/components/audio/AudioList.vue'
import { mapState } from 'vuex'
export default {
  props: {
    playerHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState('audio', ['audios', 'index'])
  },
  components: { AudioList }
}
</script>

<style lang="scss" scoped>
.play__list {
  max-width: 677px;
  width: 100%;
  max-height: 628px;
  position: absolute;
  right: 45px;
  z-index: 9999999;
  background: var(--color-white);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
  border-radius: 8px;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  &--title {
    color: var(--color-silver-chalice);
    font-size: 16px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    margin-bottom: 12px;
  }
}
</style>
