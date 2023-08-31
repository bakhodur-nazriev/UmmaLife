<template>
  <div class="audio__player" ref="player">
    <div class="audio__player--left">
      <audio-player
        ref="audioPlayer"
        :audio-list="audios.map((elm) => elm.source)"
        :before-play="handleBeforePlay"
        theme-color="#49A399"
        :show-playback-rate="false"
        :show-volume-button="false"
      >
        <template #play-prev>
          <button class="play-control"><AudioPlayPrev /></button>
        </template>
        <template #play-next>
          <button class="play-control"><AudioPlayNext /></button>
        </template>
        <template #play-start>
          <button class="play-btn"><VideoPlayIcon /></button>
        </template>
      </audio-player>
      <div class="audio__player--info">
        <div class="audio__player--title">{{ currentAudioName || audios[0].title }}</div>
        <div class="audio__player--author">{{ currentAuthor || audios[0].artist }}</div>
      </div>
    </div>
    <div class="audio__player--right">
      <div class="volume">
        <input type="range" min="0" max="100" value="100" class="volume-range" />

        <div class="bar-hoverbox">
          <div class="bar">
            <div class="bar-fill"></div>
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-volume" />
        </svg>
      </div>
      <div class="list__icons">
        <AudioAddIcon />
        <AudioBookmarkIcon />
        <AudioLikeIcon />
        <AudioShuffleIcon />
        <AudioDownloadIcon />
        <AudioShareIcon />
      </div>
      <button class="audio__player--arrow"><ArrowUpIcon /></button>
    </div>
  </div>
</template>

<script>
import AudioPlayPrev from '@/components/icons/audio/AudioPlayPrev.vue'
import AudioPlayNext from '@/components/icons/audio/AudioPlayNext.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioBookmarkIcon from '@/components/icons/audio/AudioBookmarkIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioShuffleIcon from '@/components/icons/audio/AudioShuffleIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import ArrowUpIcon from '@/components/icons/audio/ArrowUpIcon.vue'

export default {
  components: {
    AudioPlayPrev,
    AudioPlayNext,
    VideoPlayIcon,
    AudioAddIcon,
    AudioBookmarkIcon,
    AudioLikeIcon,
    AudioShuffleIcon,
    AudioDownloadIcon,
    AudioShareIcon,
    ArrowUpIcon
  },
  emits: ['playerHeight'],
  props: {
    audios: Array
  },
  data() {
    return {
      currentAudioName: '',
      currentAuthor: '',
      currentAudio: null,
      value: 100
    }
  },

  methods: {
    handleBeforePlay(next) {
      this.currentAudioName = this.audios[this.$refs.audioPlayer.currentPlayIndex].title
      this.currentAuthor = this.audios[this.$refs.audioPlayer.currentPlayIndex].artist

      next()
    },
    autoPlay() {
      this.$nextTick(() => {
        this.$refs.audioPlayer.play()
      })
    },
    playerHeight() {
      this.$emit('playerHeight', this.$refs.player.clientHeight)
    },
    rangeHandler() {
      const range = document.querySelector('.volume input[type=range]')

      const barHoverBox = document.querySelector('.volume .bar-hoverbox')
      const fill = document.querySelector('.volume .bar .bar-fill')

      const setValue = (value) => {
        fill.style.width = value + '%'
        range.setAttribute('value', value)
        range.dispatchEvent(new Event('change'))
        if (this.currentAudio) {
          this.currentAudio.volume = value / 100
          this.value = value
        }
      }

      // Дефолт
      setValue(range.value)

      const calculateFill = (e) => {
        // Отнимаем ширину двух 15-пиксельных паддингов из css
        let offsetX = e.offsetX

        if (e.type === 'touchmove') {
          offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
        }

        const width = e.target.offsetWidth - 30

        setValue(
          Math.max(
            Math.min(
              // Отнимаем левый паддинг
              ((offsetX - 15) / width) * 100.0,
              100.0
            ),
            0
          )
        )
      }

      let barStillDown = false

      barHoverBox.addEventListener(
        'touchstart',
        (e) => {
          barStillDown = true

          calculateFill(e)
        },
        true
      )

      barHoverBox.addEventListener(
        'touchmove',
        (e) => {
          if (barStillDown) {
            calculateFill(e)
          }
        },
        true
      )

      barHoverBox.addEventListener(
        'mousedown',
        (e) => {
          barStillDown = true

          calculateFill(e)
        },
        true
      )

      barHoverBox.addEventListener('mousemove', (e) => {
        if (barStillDown) {
          calculateFill(e)
        }
      })

      barHoverBox.addEventListener('wheel', (e) => {
        const newValue = +range.value + e.deltaY * 0.5

        setValue(Math.max(Math.min(newValue, 100.0), 0))
      })

      document.addEventListener(
        'mouseup',
        (e) => {
          barStillDown = false
        },
        true
      )

      document.addEventListener(
        'touchend',
        (e) => {
          barStillDown = false
        },
        true
      )
    }
  },
  mounted() {
    this.autoPlay()
    this.playerHeight()
    this.currentAudio = document.querySelector('.audio-player__audio')
    this.rangeHandler()
  },
  updated() {
    this.autoPlay()
    this.playerHeight()
    this.currentAudio = document.querySelector('.audio-player__audio')
    this.rangeHandler()
  }
}
</script>

<style lang="scss">
.audio__player {
  background: var(--color-white);
  width: 100%;
  position: fixed;
  transition: all 3s ease-in-out;
  bottom: 0;
  right: 0;
  width: calc(100% - 268px);
  left: 260px;
  padding: 15px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &--arrow {
    background: transparent;
    border: none;
    padding: 0;
    outline: none;
    cursor: pointer;
  }
  &--left,
  &--right {
    display: flex;
    align-items: center;
  }
  &--title,
  &--author {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
  }
  &--author {
    font-weight: 550;
  }
  .list__icons {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-right: 56px;
    svg {
      cursor: pointer;
    }
  }
  .play-btn {
    background-color: var(--color-hippie-blue);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 14px !important;
      height: 16px !important;
    }
  }
  .play-control {
    background: transparent;
    border: none;
    outline: none;
    width: 24px;
    height: 22px;
    cursor: pointer;
    padding: 0;
    svg {
      width: 24px !important;
      height: 22px !important;
      display: block;
    }
  }
  .audio__progress-wrap {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 0 !important;
  }
  .audio__btn-wrap {
    position: static !important;
    gap: 16px;
    margin-right: 204px;
  }

  .audio__time-wrap {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    left: 170px;
    margin-top: 0 !important;
    .audio__current-time,
    .audio__duration {
      font-size: 12px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-silver-chalice);
      display: flex;
      align-items: center;
    }
    .audio__current-time {
      &:after {
        content: '/';
        font-size: 12px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-silver-chalice);
        display: block;
        margin: 0 6px;
      }
    }
  }
  .audio__play-next,
  .audio__play-prev {
    width: 24px;
    height: 22px;
  }
  .audio__play-start,
  .audio__play-pause {
    margin: 0 !important;
  }
  .volume {
    input[type='range'] {
      display: none;
    }
    margin-right: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    .icon-size {
      font-size: 20px;
    }

    .bar-hoverbox {
      transition: opacity 0.2s;

      &:hover {
        cursor: pointer;
      }
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-left: 20px;
      fill: var(--color-hippie-blue);
    }

    .bar {
      background: var(--color-alto-second);
      height: 6px;
      width: 132px;
      border-radius: 15px;
      overflow: hidden;
      pointer-events: none;

      .bar-fill {
        background: var(--color-hippie-blue);
        width: 0%;
        height: 100%;
        background-clip: border-box;
        pointer-events: none;
        border-radius: 15px;
      }
    }
  }
}
</style>
