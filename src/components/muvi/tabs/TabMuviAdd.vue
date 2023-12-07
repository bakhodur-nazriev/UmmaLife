<template>
  <div class="muvi__add">
    <div class="muvi__add--title">{{ $t('add_muvi.title') }}</div>
    <!-- If file does'n exists -->
    <div
      class="muvi__add--video"
      @dragover.prevent
      @dragleave.prevent
      @drop.prevent="drop"
      v-if="!file || !videoStatus || videoStatus === 404"
    >
      <MuviUploadIcon />
      <p>{{ $t('add_muvi.file_text1') }}</p>
      <p>{{ $t('add_muvi.file_text2') }}</p>
      <p>{{ $t('add_muvi.file_text3') }}</p>
      <p>{{ $t('add_muvi.file_text4') }}</p>
      <p>{{ $t('add_muvi.file_text5') }}</p>

      <div class="muvi__add--label">
        <SampleButton
          :title="$t('add_muvi.select_file')"
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
      <div class="error" v-if="error">{{ $t(error) }}</div>
    </div>
    <!-- If file exist -->
    <form class="muvi__add--form" @submit.prevent="submitHandler" v-else-if="videoStatus === 200">
      <div class="muvi__add--player">
        <video class="video" autoplay="true" controls preload="none">
          <source :src="videoSrc[0]?.src" type="video/mp4" />
        </video>
      </div>

      <div class="muvi__add--right">
        <div class="muvi__add--description">
          <div class="muvi__add--description-top">
            <h2>{{ $t('add_muvi.description') }}</h2>
            <span>{{ description.length }}/{{ $t('add_muvi.max_length') }}</span>
          </div>
          <textarea v-model="description" :maxlength="5000" />
        </div>
        <div class="muvi__add--right-title">{{ $t('add_muvi.cover') }}</div>
        <div class="muvi__add--right-wrapper">
          <div class="muvi__add--cover" :class="{ blackCover: !posterSrc }">
            <img :src="posterSrc" alt="poster" v-if="posterSrc" />
            <label class="muvi__add--cover-change">
              {{ posterSrc ? $t('add_muvi.change_cover') : $t('add_muvi.add_cover') }}
              <input
                @change="posterHandler"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          </div>
          <ul class="muvi__add--menu">
            <MuviTagPeopleList @passTaggedUsers="passTaggedUsers" />
            <MuviAddLocationList @passLocationDetails="passLocationDetails" />
            <MuviViewList @passSelectedOption="(option) => (payload.privacy_type = option)" />
            <li class="muvi__add--list">
              <p><AllowCommentIcon />{{ $t('add_muvi.allow_comment') }}</p>
              <BaseToggle :checked="commentStatus" @update:isChecked="changeStatusCommentHandler" />
            </li>
            <MuviChooseCategory
              @passSelectedCategories="(category_id) => (payload.category_id = category_id)"
            />
            <li class="muvi__add--actions">
              <SampleButton
                type="button"
                :title="$t('add_muvi.delete')"
                color="default"
                padding="13px"
                width="200px"
                @click="(file = null), (posterSrc = null)"
              />
              <SampleButton
                type="submit"
                :title="$t('add_muvi.publish')"
                padding="13px"
                width="200px"
                :disabled="isLoading"
                :icon="isLoading"
              >
                <SpinnerGif v-if="isLoading" class="spinner" />
              </SampleButton>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { getFormData, validateVideoFile } from '@/utils'

// Components
import MuviUploadIcon from '@/components/icons/shorts/MuviUploadIcon.vue'
import MuviTagPeopleList from '@/components/muvi/lists/MuviTagPeopleList.vue'
import MuviAddLocationList from '@/components/muvi/lists/MuviAddLocationList.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import AllowCommentIcon from '@/components/icons/shorts/AllowCommentIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import MuviViewList from '@/components/muvi/lists/MuviViewList.vue'
import MuviChooseCategory from '@/components/muvi/lists/MuviChooseCategory.vue'
import SpinnerGif from '@/components/icons/SpinnerGif.vue'

const filesInput = ref()
const file = ref(null)
const description = ref('')
const videoSrc = ref([])
const error = ref('')
const videoStatus = ref(null)
const isLoading = ref(false)
const commentStatus = ref(true)
const router = useRouter()

const posterSrc = ref(null)

const payload = reactive({
  server_key: process.env.VUE_APP_SERVER_KEY,
  video: null, // video file
  description: '',
  privacy_type: 0, //0 - Available to everyone * 1 - Who is following me * 2 - Who am I following
  tagged_users: [],
  preview: null, //preview file
  category_id: null,
  latitude: null, //number
  longitude: null, //number
  location_name: null,
  comments_status: '1'
})

const changeStatusCommentHandler = ({ isDisabled }) => {
  if (isDisabled) {
    payload.comments_status = '0'
  } else {
    payload.comments_status = '1'
  }
}

const drop = (event) => {
  file.value = event.dataTransfer.files[0]
  validateVideo(file.value)
  payload.video = file.value
}

const validateVideo = async (file) => {
  try {
    const { status, message } = await validateVideoFile(file)
    if (status === 404) {
      error.value = message
      videoStatus.value = status
      return
    }
    error.value = ''
    videoStatus.value = status
    handleFile(file)
  } catch (err) {
    error.value = err?.message
    videoStatus.value = err?.status
    return
  }
}

const handleChange = (event) => {
  file.value = event.target.files[0]
  validateVideo(file.value)
  payload.video = file.value
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
  if (!file) return
  posterSrc.value = URL.createObjectURL(file)
  payload.preview = file
}

const passTaggedUsers = (users) => {
  payload.tagged_users = users.map((user) => user.user_id)
}

const passLocationDetails = ({ location_name, latitude, longitude }) => {
  payload.latitude = latitude
  payload.longitude = longitude
  payload.location_name = location_name
}

const submitHandler = async () => {
  try {
    isLoading.value = true
    const submitPayload = getFormData({ ...payload, description: description.value })

    await axios.post('/add-short-video', submitPayload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: localStorage.getItem('access_token')
      }
    })

    router.push({ name: 'muvi' })
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
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
  min-height: calc(100dvh - 192px);
  max-height: calc(100dvh - 192px);
  display: flex;
  flex-direction: column;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    padding: 20px;
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
  &--poster {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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
      background-color: transparent;
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
        color: var(--color-stable-white);
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
      color: var(--color-stable-white);
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
.video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.spinner {
  width: 20px !important;
  height: 20px !important;
  scale: 2.2;
}
</style>
