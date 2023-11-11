<template>
  <div class="muvi__add">
    <div class="muvi__add--title">Add MUVI</div>
    <!-- If file does'n exists -->
    <div
      class="muvi__add--video"
      @dragover.prevent
      @dragleave.prevent
      @drop.prevent="drop"
      v-if="!file"
    >
      <MuviUploadIcon />
      <p>Select a video to download or drag and drop a file</p>
      <p>Allowable extensions: mp4</p>
      <p>Resolution 1280*720</p>
      <p>No more than 5 minutes</p>
      <p>Less than 50 mB</p>

      <div class="muvi__add--label">
        <SampleButton
          title="Select a file"
          padding="13px"
          width="100%"
          @click="$refs.filesInput.click()"
        />
        <input
          type="file"
          accept="video/mp4"
          ref="filesInput"
          style="display: none"
          @change="handleChange"
        />
      </div>
    </div>
    <!-- If file exist -->

    <form class="muvi__add--form" @submit.prevent v-else>
      <div class="muvi__add--player">
        <VideoPlayer controls :volume="1" :sources="videoSrc" :poster="posterSrc" preload="auto">
          <template v-slot="{ player, state }">
            <div class="custom-player-controls">
              <div
                v-if="!state.playing"
                @click="state.playing ? player.pause() : player.play()"
                class="play-button"
              >
                <VideoPlayIcon class="play-icon__button-icon-big" />
                <SmallVideoPlayIcon class="play-icon__button-icon-small" />
              </div>
            </div>
            <button type="button" class="muvi__add--player-btn" v-if="!state.playing">
              <img src="@/assets/images/AiIcon.png" alt="AiIcon" />
              <p>Delete music <span>using AI</span></p>
            </button>
          </template>
        </VideoPlayer>
      </div>

      <div class="muvi__add--right">
        <div class="muvi__add--description">
          <div class="muvi__add--description-top">
            <h2>Description</h2>
            <span>{{ description.length }}/5000</span>
          </div>
          <textarea v-model="description" :maxlength="5000" />
        </div>
        <div class="muvi__add--right-title">Cover</div>
        <div class="muvi__add--right-wrapper">
          <div class="muvi__add--cover" :class="{ blackCover: !posterSrc }">
            <img :src="posterSrc" alt="poster" v-if="posterSrc" />
            <label class="muvi__add--cover-change">
              {{ posterSrc ? 'Change cover' : 'Add cover' }}
              <input
                @change="posterHandler"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          </div>
          <ul class="muvi__add--menu">
            <MuviTagPeopleList />
            <MuviAddLocationList />
            <MuviViewList />
            <li class="muvi__add--list">
              <p><AllowCommentIcon /> Allow comments</p>
              <BaseToggle :checked="true" />
            </li>
            <MuviChooseCategory />
            <li class="muvi__add--actions">
              <SampleButton
                type="button"
                title="Delete"
                color="default"
                padding="13px"
                width="200px"
              />
              <SampleButton type="submit" title="Publish" padding="13px" width="200px" />
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'

// Components
import MuviUploadIcon from '@/components/icons/shorts/MuviUploadIcon.vue'
import MuviTagPeopleList from '@/components/muvi/lists/MuviTagPeopleList.vue'
import MuviAddLocationList from '@/components/muvi/lists/MuviAddLocationList.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import VideoPlayIcon from '@/components/icons/VideoPlayIcon.vue'
import SmallVideoPlayIcon from '@/components/icons/SmallVideoPlayIcon.vue'
import AllowCommentIcon from '@/components/icons/shorts/AllowCommentIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import MuviViewList from '@/components/muvi/lists/MuviViewList.vue'
import MuviChooseCategory from '@/components/muvi/lists/MuviChooseCategory.vue'

const filesInput = ref()
const file = ref(null)
const description = ref('')
const videoSrc = ref([])

const posterSrc = ref(null)

const drop = (event) => {
  file.value = event.dataTransfer.files[0]
  handleFile(file.value)
}

const handleChange = (event) => {
  file.value = event.target.files[0]
  handleFile(file.value)
}

const handleFile = (file) => {
  videoSrc.value = [
    {
      src: URL.createObjectURL(file),
      type: 'application/x-mpegURL'
    }
  ]
}

const posterHandler = (e) => {
  const file = e.target.files[0]
  posterSrc.value = URL.createObjectURL(file)
}
</script>

<style lang="scss">
.muvi__add {
  max-width: 1200px;
  width: 100%;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 24px;
  margin: 0 auto;
  &--title {
    font-size: 24px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    color: var(--color-mine-shaft);
    margin-bottom: 20px;
  }
  &--video {
    border: 2px dashed var(--color-silver-chalice);
    border-radius: 15px;
    padding: 144px 20px 143px;
    text-align: center;
    @media (max-width: 900px) {
      padding: 60px 20px 60px;
    }
    p {
      margin: 8px 0;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-silver-chalice);
    }
  }
  &--label {
    margin-top: 70px;
    display: flex;
    justify-content: center;
  }
  &--form {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 106px;
    @media (max-width: 1400px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
  &--player {
    width: 100%;
    height: 622px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    @media (max-width: 1400px) {
      width: 350px;
      margin: 0 auto;
      order: 1;
    }
    &-btn {
      border-radius: 8px;
      border: 1px solid var(--color-mine-shaft) !important;
      background: var(--gray-rgba) !important;
      backdrop-filter: blur(5px) !important;
      padding: 10px 12px;
      outline: none;
      position: absolute;
      bottom: 12px;
      left: 12px;
      z-index: 10;
      display: flex !important;
      align-items: center;
      gap: 6px;
      text-align: left;
      cursor: pointer;
      img {
        width: 36px;
        height: 36px;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
        color: var(--color-white);
        span {
          font-weight: 550;
          letter-spacing: 0.64px;
          display: block;
        }
      }
    }
    .video-js {
      width: 100%;
      height: 100%;
    }
    .vjs-poster img {
      object-fit: cover;
      object-position: center;
    }
    .vjs-tech {
      object-fit: cover !important;
      object-position: center !important;
      overflow: hidden;
    }
    .vjs-big-play-button {
      display: none !important;
    }
  }
  &--description {
    margin-bottom: 20px;
    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      h2 {
        padding: 0;
        margin: 0;
        font-size: 18px;
        font-style: normal;
        font-weight: 550;
        line-height: normal;
        color: var(--color-mine-shaft);
      }
      span {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: var(--color-secondary);
      }
    }
    textarea {
      width: 100%;
      outline: none;
      padding: 16px;
      resize: none;
      min-height: 176px;
      border-radius: 10px;
      border: 1px solid var(--color-seashell);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;
      color: var(--color-mine-shaft);
    }
  }
  &--right {
    &-title {
      font-size: 18px;
      font-style: normal;
      font-weight: 550;
      line-height: normal;
      color: var(--color-mine-shaft);
      margin-bottom: 12px;
    }
    &-wrapper {
      display: grid;
      grid-template-columns: 172px 1fr;
      gap: 28px;
    }
  }
  &--cover {
    height: 306px;
    border-radius: 10px;
    border: 1px solid var(--color-seashell);
    overflow: hidden;
    position: relative;
    background-color: var(--color-seashell);
    &.blackCover {
      .muvi__add--cover-change {
        color: var(--color-mine-shaft);
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    &-change {
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: calc(100% - 20px);
      border-radius: 4px;
      border: 1px solid var(--color-mine-shaft);
      background: var(--gray-rgba);
      backdrop-filter: blur(10px);
      padding: 8px;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-white);
      input {
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        &::-webkit-file-upload-button {
          cursor: pointer;
        }
      }
    }
  }
  &--menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &--list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px 15px;
    border-radius: 12px;
    background-color: var(--color-seashell);
    cursor: pointer;
    position: relative;
    gap: 16px;
    &-parent {
      max-width: calc(100% - 32px);
      width: 100%;
    }

    p {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: var(--color-mine-shaft);
      padding: 0;
      margin: 0;

      svg {
        width: 16px;
        height: 16px;
      }
    }
    .arrow {
      max-width: 20px;
      width: 100%;
      height: 20px;
      display: block;
      &.open {
        rotate: 180deg;
      }
    }
  }
  &--actions {
    margin-top: 10px;
    display: flex;
    gap: 20px;
  }
}
</style>
