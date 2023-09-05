<template>
  <div class="audio__player" ref="player">
    <div class="audio__player--left">
      <audio-player
        ref="audioPlayer"
        @pause="pauseHandler"
        :audio-list="audios && audios.map((elm) => elm.source)"
        :before-play="handleBeforePlay"
        :before-prev="handleBeforePrev"
        :before-next="handleBeforeNext"
        :isLoop="true"
        :show-playback-rate="false"
        :show-volume-button="false"
        theme-color="#49A399"
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
        <AudioAddIcon />
        <AudioBookmarkIcon />
        <div @click="likeHandler(index)" class="like__icon">
          <AudioLikeIcon v-if="!audios[index].isLiked" />
          <AudioFilledLikeIcon v-else />
        </div>
        <AudioShuffleIcon />
        <a class="download__icon" :href="audios[index].source" download>
          <AudioDownloadIcon />
        </a>
        <AudioShareIcon />
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
import AudioBookmarkIcon from '@/components/icons/audio/AudioBookmarkIcon.vue'
import AudioLikeIcon from '@/components/icons/audio/AudioLikeIcon.vue'
import AudioShuffleIcon from '@/components/icons/audio/AudioShuffleIcon.vue'
import AudioDownloadIcon from '@/components/icons/audio/AudioDownloadIcon.vue'
import AudioShareIcon from '@/components/icons/audio/AudioShareIcon.vue'
import ArrowUpIcon from '@/components/icons/audio/ArrowUpIcon.vue'
import AudioFilledLikeIcon from '../icons/audio/AudioFilledLikeIcon.vue'

import { mapMutations, mapState } from 'vuex'
import { audios } from '@/dummy'

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
    ArrowUpIcon,
    AudioFilledLikeIcon
  },
  data() {
    return {
      currentAudioName: '',
      currentAuthor: '',
      isVolumeClicked: true,
      dummyAudios: audios
    }
  },
  computed: {
    ...mapState('audio', ['audios', 'index', 'isListOpen'])
  },
  methods: {
    ...mapMutations('audio', [
      'setAudioPlaying',
      'setAudioPause',
      'setIndex',
      'setIsLiked',
      'setListOpen'
    ]),
    rangeHandler() {
      const range = document.querySelector('.volume input[type=range]')

      const barHoverBox = document.querySelector('.volume .bar-hoverbox')
      const fill = document.querySelector('.volume .bar .bar-fill')

      const setValue = (value) => {
        if (!this.isVolumeClicked) {
          fill.style.width = '0%'
        } else {
          fill.style.width = value + '%'
          this.value = value
          range.setAttribute('value', value)
          range.dispatchEvent(new Event('change'))
          if (this.currentAudio) {
            this.currentAudio.volume = value / 100
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
          this.currentAudio.muted = !this.isVolumeClicked
          calculateFill(e)
        },
        true
      )

      barHoverBox.addEventListener(
        'touchmove',
        (e) => {
          if (barStillDown) {
            this.isVolumeClicked = true
            this.currentAudio.muted = !this.isVolumeClicked
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
          this.currentAudio.muted = !this.isVolumeClicked
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
      this.currentAudio.muted = !this.isVolumeClicked
    },
    handleBeforePlay(next) {
      this.$refs.audioPlayer.currentPlayIndex = this.index
      const currentIndex = this.$refs.audioPlayer.currentPlayIndex
      this.currentAudioName = this.audios[currentIndex].title
      this.currentAuthor = this.audios[currentIndex].artist
      this.setAudioPlaying(currentIndex)
      next()
    },
    handleBeforePrev(next) {
      if (this.index > 0) {
        this.setIndex(this.index - 1)
      } else {
        this.setIndex(this.audios.length - 1)
      }
      this.autoPlay()
      next()
    },
    handleBeforeNext(next) {
      if (this.index < this.audios.length - 1) {
        this.setIndex(this.index + 1)
      } else {
        this.setIndex(0)
      }
      this.autoPlay()
      next()
    },
    pauseHandler() {
      const currentIndex = this.$refs.audioPlayer.currentPlayIndex
      this.setAudioPause(currentIndex)
    },
    autoPlay() {
      this.$refs.audioPlayer.currentPlayIndex = this.index
      this.$refs.audioPlayer.play()
    },
    likeHandler(index) {
      this.dummyAudios.forEach((a) => {
        if (this.audios[index].id === a.id) {
          a.isLiked = !a.isLiked
        }
      })
      this.setIsLiked(index)
    }
  },
  mounted() {
    this.autoPlay()
    this.playerHeight()
    this.rangeHandler()
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
