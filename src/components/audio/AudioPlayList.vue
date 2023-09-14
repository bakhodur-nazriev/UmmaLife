<!-- eslint-disable -->
<template>
  <div class="play__list" :style="`bottom: ${playerHeight}px`">
    <div class="play__list--title">Автовоспроизведение / на очереди</div>
    <div class="play__list--wrapper">
      <draggable :list="audios" item-key="id" @change="changeHandler" @start="start" @end="end">
        <template #item="{ element, index }">
          <AudioList
            :audio="element"
            :index="index"
            :className="`track__list ${index === audioIndex ? 'active__list' : ''}`"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import AudioList from '@/components/audio/AudioList.vue'
import { mapMutations, mapState } from 'vuex'
import draggable from 'vuedraggable'
export default {
  props: {
    playerHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState('audio', ['audios', 'audioIndex'])
  },
  methods: {
    ...mapMutations('audio', ['addAudio', 'setAudios', 'setIndex', 'setIsPlaying']),

    changeHandler({ moved }) {
      this.setIndex(moved.newIndex)
    },
    start() {
      this.setIsPlaying(false)
    },
    end() {
      this.setIsPlaying(null)
    }
  },
  components: { AudioList, draggable }
}
</script>

<style lang="scss" scoped>
.play__list {
  max-width: 677px;
  width: 100%;
  max-height: 628px;
  position: absolute;
  right: 45px;
  z-index: 20;
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
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
</style>
