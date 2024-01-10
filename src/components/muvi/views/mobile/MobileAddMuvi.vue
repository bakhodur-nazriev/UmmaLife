<template>
  <div class="muvi__mobile">
    <div v-if="!file || !videoStatus || videoStatus === 404">
      <input
        type="file"
        accept="video/mp4"
        style="display: none"
        ref="filesInput"
        @change="handleChange"
      />
      <div class="error" v-if="error">{{ $t(error) }}</div>
    </div>

    <div class="muvi__mobile--add" v-if="steps[0] && videoStatus === 200">
      <video autoplay :src="videoSrc"></video>
      <div class="muvi__mobile--action">
        <!-- <button type="button" class="muvi__add--player-btn">
          <img src="@/assets/images/AiIcon.png" alt="AiIcon" />
          <p>Delete music <span>using AI</span></p>
        </button> -->
        <SampleButton
          class="next__muvi"
          :title="$t('buttons.next')"
          :size="14"
          padding="15px"
          width="100%"
          @click="steps = [false, true]"
        />
      </div>
      <CloseAddMuvi class="close__muvi" @click="$router.go(-1)" />
    </div>
    <form
      v-else-if="steps[1] && videoStatus === 200"
      class="muvi__mobile--form"
      @submit.prevent="submitHandler"
    >
      <div>
        <div class="muvi__mobile--nav white">
          <button type="button" @click="$router.go(-1)" class="muvi__mobile--nav-btn">
            <SettingsClose />
          </button>
          <div class="muvi__mobile--nav-title">{{ $t('buttons.publish') }}</div>
          <div class="left"></div>
        </div>
        <div class="muvi__mobile--form-top">
          <div class="muvi__mobile--cover">
            <img v-if="posterSrc" :src="posterSrc" alt="poster" />
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              style="display: none"
              @change="posterHandler"
              ref="posterRef"
            />
            <button type="button" class="muvi__mobile--cover-btn" @click="() => posterRef.click()">
              {{ $t('add_muvi.cover') }}
            </button>
          </div>
          <textarea
            :placeholder="$t('add_muvi.description') + '...'"
            class="muvi__mobile--textarea"
            v-model="description"
          ></textarea>
        </div>
        <ul class="muvi__add--menu">
          <MuviTagPeopleList @passTaggedUsers="passTaggedUsers" />
          <MuviAddLocationList @passLocationDetails="passLocationDetails" />
          <MuviViewList @passSelectedOption="(option) => (payload.privacy_type = option)" />
          <li class="muvi__add--list">
            <p><AllowCommentIcon /> {{ $t('add_muvi.allow_comment') }}</p>
            <BaseToggle :checked="commentStatus" @update:isChecked="changeStatusCommentHandler" />
          </li>
          <MuviChooseCategory
            @passSelectedCategories="(category_id) => (payload.category_id = category_id)"
          />
        </ul>
      </div>
      <div class="muvi__mobile--submit">
        <SampleButton
          :title="$t('add_muvi.publish')"
          width="100%"
          :size="14"
          type="submit"
          :disabled="isLoading"
          :icon="isLoading"
        >
          <SpinnerGif v-if="isLoading" class="spinner" />
        </SampleButton>
      </div>
    </form>
    <button class="not-visible" @click="fileClickedHandler"></button>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { validateVideoFile, getFormData } from '@/utils'

import SampleButton from '@/components/ui/SampleButton.vue'
import CloseAddMuvi from '@/components/icons/shorts/mobile/CloseAddMuvi.vue'
import SettingsClose from '@/components/icons/settings/SettingsClose.vue'
import MuviTagPeopleList from '@/components/muvi/lists/MuviTagPeopleList.vue'
import MuviAddLocationList from '@/components/muvi/lists/MuviAddLocationList.vue'
import MuviViewList from '@/components/muvi/lists/MuviViewList.vue'
import AllowCommentIcon from '@/components/icons/shorts/AllowCommentIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import MuviChooseCategory from '@/components/muvi/lists/MuviChooseCategory.vue'
import SpinnerGif from '@/components/icons/SpinnerGif.vue'

const router = useRouter()

const filesInput = ref()
const file = ref(null)

const videoSrc = ref(null)
const posterSrc = ref(null)
const posterRef = ref()
const steps = ref([true, false])
const error = ref('')
const videoStatus = ref(null)
const isLoading = ref(false)
const description = ref('')
const commentStatus = ref(true)

const posterHandler = (event) => {
  const file = event.target.files[0]
  if (!file) return
  posterSrc.value = URL.createObjectURL(file)
  payload.preview = file
}

const payload = reactive({
  server_key: import.meta.env.VITE_SERVER_KEY,
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

const handleChange = (event) => {
  file.value = event.target.files[0]
  if (!file.value) return
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
    videoSrc.value = URL.createObjectURL(file)
  } catch (err) {
    error.value = err?.message
    videoStatus.value = err?.status
    return
  }
}
const changeStatusCommentHandler = ({ isDisabled }) => {
  if (isDisabled) {
    payload.comments_status = '0'
  } else {
    payload.comments_status = '1'
  }
}

const passTaggedUsers = (users) => {
  payload.tagged_users = users.map((user) => user.user_id)
}

const fileClickedHandler = () => {
  if (file.value) return
  filesInput.value.click()
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

onMounted(() => fileClickedHandler())
</script>

<style lang="scss" scoped>
.muvi__mobile {
  height: calc(100dvh - 64px);
  overflow-y: auto;
  position: relative;
  .error {
    padding-top: 20%;
    text-align: center;
  }
  &--add {
    width: 100%;
    height: 100%;
    position: relative;
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .close__muvi {
      position: absolute;
      top: 16px;
      left: 16px;
    }
  }
  &--action {
    position: absolute;
    bottom: 12px;
    left: 16px;
    width: calc(100% - 32px);
    .muvi__add--player-btn {
      position: static !important;
      margin-bottom: 10px;
      padding: 6px;
      border-radius: 8px;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        font-size: 10px;
      }
    }
  }
  &--form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-top {
      padding: 20px 16px 24px;
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 8px;
    }
  }
  &--cover {
    height: 140px;
    border-radius: 10px;
    background-color: var(--color-gallery-first);
    overflow: hidden;
    position: relative;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
    }
    &-btn {
      position: absolute;
      left: 10px;
      bottom: 10px;
      z-index: 5;
      width: calc(100% - 20px);
      border-radius: 4px;
      background: rgba(45, 45, 45, 0.5);

      backdrop-filter: blur(10px);
      color: var(--color-stable-white);
      border: none;
      outline: none;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding: 6px;
    }
  }
  &--textarea {
    border: none;
    outline: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: var(--color-mine-shaft);
    background-color: transparent;
    &::placeholder {
      color: var(--color-secondary);
    }
  }
  .muvi__add--menu {
    padding: 0 16px;
  }
  &--submit {
    padding: 12px 16px;
  }
}
.not-visible {
  width: 30px;
  height: 30px;
  background-color: red;
  display: block;
  position: fixed;
  bottom: 15px;
  opacity: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 40;
}
</style>
