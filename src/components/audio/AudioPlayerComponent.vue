<template>
  <div class="audio__player" ref="player">
    <div class="audio__player--left">
      <audio-player
        ref="audioPlayer"
        @play="playHandler"
        @pause="pauseHandler"
        :audio-list="audios && audios.map((elm) => elm.source)"
        :before-play="handleBeforePlay"
        :before-prev="handleBeforePrev"
        :before-next="handleBeforeNext"
        :isLoop="true"
        :show-playback-rate="false"
        :show-volume-button="false"
        theme-color="#49A399"
        :loop="isLoop"
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
        <svg class="icon" aria-hidden="true" @click.prevent="handleVolumeClick">
          <use :xlink:href="isVolumeClicked ? '#icon-volume' : '#icon-volume-no'" />
        </svg>
      </div>
      <div class="list__icons">
        <div class="list__icons--btn">
          <AudioAddIcon />
        </div>
        <AlbumLike :audio="audios[audioIndex]" :index="audioIndex" />
        <AudioLoop />
        <a class="download__icon" :href="audios[audioIndex]?.source || ''" download>
          <AudioDownloadIcon />
        </a>
        <AudioShareIcon @click="setShareOpen(true)" />
      </div>
      <button class="audio__player--arrow" @click="setListOpen(!this.isListOpen)">
        <ArrowUpIcon />
      </button>
    </div>
  </div>
</template>

<script>
import AudioPlayPrev from '@/components/icons/audio/AudioPlayPrev.vue'
import AudioPlayNext from '@/components/icons/audio/AudioPlayNext.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import AudioAddIcon from '@/components/icons/audio/AudioAddIcon.vue'
import AudioLoop from '@/components/audio/AudioLoop.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import ArrowUpIcon from '@/components/icons/audio/ArrowUpIcon.vue'
import AlbumLike from '@/components/audio/AlbumLike.vue'

import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    AudioPlayPrev,
    AudioPlayNext,
    VideoPlayIcon,
    AudioAddIcon,
    AudioLoop,
    AudioDownloadIcon,
    AudioShareIcon,
    ArrowUpIcon,
    AlbumLike
  },
  data() {
    return {
      currentAudioName: '',
      currentAuthor: '',
      isVolumeClicked: true,
      currentPlayer: null
    }
  },
  computed: {
    ...mapState('audio', [
      'audios',
      'audioIndex',
      'isListOpen',
      'isLoop',
      'isAlbumOpen',
      'isPlayerOpen',
      'isPlaying'
    ])
  },
  methods: {
    ...mapMutations('audio', [
      'setAudioPlaying',
      'setAudioPause',
      'setIndex',
      'setListOpen',
      'addAudio',
      'setIsPlaying'
    ]),
    ...mapMutations(['setShareOpen']),
    rangeHandler() {
      const range = document.querySelector('.volume input[type=range]')

      const barHoverBox = document.querySelector('.volume .bar-hoverbox')
      const fill = document.querySelector('.volume .bar .bar-fill')

      const setValue = (value) => {
        if (!this.isVolumeClicked) {
          fill.style.width = '0%'
        } else {
          fill.style.width = value + '%'
          range.setAttribute('value', value)
          range.dispatchEvent(new Event('change'))
          if (this.currentPlayer) {
            this.currentPlayer.volume = value / 100
          }
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
          this.isVolumeClicked = true
          this.currentPlayer.muted = !this.isVolumeClicked
          calculateFill(e)
        },
        true
      )

      barHoverBox.addEventListener(
        'touchmove',
        (e) => {
          if (barStillDown) {
            this.isVolumeClicked = true
            this.currentPlayer.muted = !this.isVolumeClicked
            calculateFill(e)
          }
        },
        true
      )

      barHoverBox.addEventListener(
        'mousedown',
        (e) => {
          barStillDown = true
          this.isVolumeClicked = true
          this.currentPlayer.muted = !this.isVolumeClicked
          calculateFill(e)
        },
        true
      )

      barHoverBox.addEventListener('mousemove', (e) => {
        if (barStillDown) {
          this.isVolumeClicked = true
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
    },
    playerHeight() {
      this.$emit('playerHeight', this.$refs.player.clientHeight)
    },
    handleVolumeClick() {
      this.isVolumeClicked = !this.isVolumeClicked
      this.currentPlayer.muted = !this.isVolumeClicked
    },
    handleBeforePlay(next) {
      this.$refs.audioPlayer.currentPlayIndex = this.audioIndex
      const currentIndex = this.$refs.audioPlayer.currentPlayIndex
      this.currentAudioName = this.audios[currentIndex].title
      this.currentAuthor = this.audios[currentIndex].artist
      this.setAudioPlaying(currentIndex)

      next()
    },
    handleBeforePrev(next) {
      if (this.audioIndex > 0) {
        this.setIndex(this.audioIndex - 1)
      } else {
        this.setIndex(this.audios.length - 1)
      }
      this.autoPlay()
      next()
    },
    handleBeforeNext(next) {
      if (this.audioIndex < this.audios.length - 1) {
        this.setIndex(this.audioIndex + 1)
      } else {
        this.setIndex(0)
      }
      this.autoPlay()
      next()
    },
    playHandler() {
      this.setIsPlaying(true)
    },
    pauseHandler() {
      const currentIndex = this.$refs.audioPlayer.currentPlayIndex
      this.setAudioPause(currentIndex)
      this.setIsPlaying(false)
    },
    autoPlay() {
      this.$refs.audioPlayer.currentPlayIndex = this.audioIndex
      this.$refs.audioPlayer.play()
    }
  },
  watch: {
    isPlaying(value) {
      if (!value) {
        this.$refs.audioPlayer.isPlaying = false
        this.$refs.audioPlayer.pause()
      } else {
        this.$refs.audioPlayer.isPlaying = true
        this.$refs.audioPlayer.play()
      }
    }
  },
  mounted() {
    this.autoPlay()
    this.playerHeight()
    this.currentPlayer = document.querySelector('.audio-player__audio')
    this.rangeHandler()
  },
  updated() {
    this.autoPlay()
    this.playerHeight()
    this.currentPlayer = document.querySelector('.audio-player__audio')
    this.rangeHandler()
    this.$refs.audioPlayer.isLoading = false
  }
}
</script>

<style lang="scss">
.audio__player {
  background: var(--color-white);
  width: 100%;
  position: absolute;
  transition: all 3s ease-in-out;
  bottom: 0;
  right: 0;
  width: calc(100% - 268px);
  left: 260px;
  padding: 15px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .download__icon,
  .like__icon {
    width: 20px;
    height: 20px;
  }
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
  .audio__progress-point {
    z-index: 20;
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
  .audio__notice {
    display: none !important;
  }
  .audio__play-start,
  .audio__play-pause {
    margin: 0 !important;
    position: absolute;
    transform: translateX(-19px);
    width: 42px;
    height: 42px;
  }
  .audio__play-loading {
    position: absolute;
    transform: translateX(-19px);
    width: 42px;
    height: 42px;
    opacity: 0;
    & span {
      display: none !important;
    }
  }
  .audio__play-loading:after {
    content: '';
    width: 42px;
    height: 42px;
    opacity: 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .audio__play-prev {
    display: flex;
    align-items: center;
    width: 126px;
  }
  .audio__play-next {
    transform: translateX(-42px);
  }
  .audio__play-prev::after {
    content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjM3NzYgMC4yMjE0NDhDNy4xMDM1OSAxLjA3NDE1IDQuNDg5NDkgMy43OTk0MSAzLjYzMTI2IDcuMjU0OTdDMi43OTA4MyAxMC42MzgzIDIuNzg5MjEgMjUuNDA5IDMuNjI4NjMgMjguNzg5MkM1LjAwNDIyIDM0LjMyNzQgMTAuMjQwMSAzNy4yOTE2IDE1LjQwNzUgMzUuNDU3NkMxNy45NDU5IDM0LjU1NjYgMjguMjM0MyAyOC4xNjU1IDMwLjc5OTkgMjUuODk1N0MzNS43MzYyIDIxLjUyODcgMzUuNzMzIDE0LjUyMjcgMzAuNzkyNiAxMC4xNTJDMjkuMzA1OSA4LjgzNjkyIDIyLjY2MDYgNC40NzAzOCAxOC41MzI3IDIuMDk2MzFDMTUuMjgxNSAwLjIyNjY1MyAxMi42NjYyIC0wLjM3NDU2NyAxMC4zNzc2IDAuMjIxNDQ4Wk0xNC43Mjc3IDYuNjkwNkMxNy43MzQzIDguMjA1MzEgMjYuMDMwNSAxMy42MzU5IDI3LjUyMDcgMTUuMDY0OEMyOS4wNzQgMTYuNTU0MyAyOS4xODc2IDE5LjIzOTIgMjcuNzYxOSAyMC43NjMxQzI2LjM4MjggMjIuMjM2OCAxNi45MjMxIDI4LjQwNDMgMTQuMDgyOCAyOS42ODEyQzExLjYyNTggMzAuNzg1OCA5LjY3MDE4IDI5LjcyOTMgOS4wNTQ1NiAyNi45NjQ1QzguNjUwNjIgMjUuMTUwNiA4LjY1MDYyIDEwLjkwMzcgOS4wNTQ1NiA5LjA4OTg2QzkuNzMyMDQgNi4wNDY5MSAxMS43NTMyIDUuMTkyMTMgMTQuNzI3NyA2LjY5MDZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjwvc3ZnPg==);
    width: 42px;
    height: 42px;
    display: block;
    margin: 0 20px;
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
      cursor: pointer;
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
