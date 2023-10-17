<template>
  <div class="muvi__mobile">
    <div class="muvi__mobile--add" v-if="steps[0]">
      <video autoplay :src="videoSrc"></video>
      <div class="muvi__mobile--action">
        <button type="button" class="muvi__add--player-btn">
          <img src="@/assets/images/AiIcon.png" alt="AiIcon" />
          <p>Delete music <span>using AI</span></p>
        </button>
        <SampleButton
          class="next__muvi"
          title="Next"
          :size="14"
          padding="15px"
          width="100%"
          @click="steps = [false, true]"
        />
      </div>
      <CloseAddMuvi class="close__muvi" @click="emit('backToMain')" />
    </div>
    <form v-else-if="steps[1]" class="muvi__mobile--form" @submit.prevent>
      <div>
        <div class="muvi__mobile--nav white">
          <button type="button" @click="emit('backToMain')" class="muvi__mobile--nav-btn">
            <SettingsClose />
          </button>
          <div class="muvi__mobile--nav-title">Publish</div>
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
              Cover
            </button>
          </div>
          <textarea placeholder="Add description..." class="muvi__mobile--textarea"></textarea>
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
        </ul>
      </div>
      <div class="muvi__mobile--submit">
        <SampleButton title="Publish MUVI" width="100%" :size="14" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import CloseAddMuvi from '@/components/icons/shorts/mobile/CloseAddMuvi.vue'
import SettingsClose from '@/components/icons/settings/SettingsClose.vue'
import MuviTagPeopleList from '@/components/muvi/lists/MuviTagPeopleList.vue'
import MuviAddLocationList from '@/components/muvi/lists/MuviAddLocationList.vue'
import MuviViewList from '@/components/muvi/lists/MuviViewList.vue'
import AllowCommentIcon from '@/components/icons/shorts/AllowCommentIcon.vue'
import BaseToggle from '@/components/ui/BaseToggle.vue'
import MuviChooseCategory from '@/components/muvi/lists/MuviChooseCategory.vue'

const emit = defineEmits(['backToMain'])
const props = defineProps({
  file: {
    type: Object,
    default: {}
  }
})

const videoSrc = ref(null)
const posterSrc = ref(null)
const posterRef = ref()
const steps = ref([true, false])

const posterHandler = (event) => {
  const file = event.target.files[0]
  posterSrc.value = URL.createObjectURL(file)
}

onMounted(() => {
  videoSrc.value = URL.createObjectURL(props.file)
})
</script>

<style lang="scss" scoped>
.muvi__mobile {
  height: calc(100dvh - 64px);
  overflow-y: auto;
  position: relative;
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
      color: var(--color-white);
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
</style>
