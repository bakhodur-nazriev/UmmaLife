<template>
  <section class="publications__form--section" ref="formSectionRef">
    <form
      action=""
      class="form__section"
      :style="{ flexDirection: isTextAreaActive ? 'column' : 'row' }"
    >
      <div class="form__left--side">
        <a :href="`/${$i18n.locale}/profile`">
          <img :src="user.avatar" alt=""/>
        </a>
        <textarea
          :placeholder="$t('placeholders.publications_input')"
          @input="handleTextareaInput"
          :class="['enter__post--textarea', { active: isTextAreaActive }]"
          @click="isTextAreaActive = true"
        ></textarea>
      </div>

      <div class="form__buttons--section" v-if="isTextAreaActive">
        <AccessDropDown/>
        <SelectCategory/>
      </div>

      <div v-if="!isTextAreaActive" class="form__inputs--block">
        <FileUpload label="image" accept="image/*">
          <ImageIcon/>
        </FileUpload>

        <FileUpload label="video" accept="video/*">
          <VideoPublicationsIcon/>
        </FileUpload>

        <FileUpload label="audio" accept="audio/*">
          <AudioPublicationIcon/>
        </FileUpload>

        <div class="vertical__divider"></div>

        <FileUpload label="file">
          <ClipIcon/>
        </FileUpload>
      </div>
      <div v-if="isTextAreaActive" class="textarea__active--buttons">
        <div class="textarea__active--smile mood__section" v-if="showSmileSection">
          <span class="emotions__label">{{ $t('labels.feeling.label') }}</span>

          <div class="buttons">
            <SampleButton
              icon="mood"
              color="tertiary"
              :title="`${$t('buttons.mood')}`"
              @click="isMoodActive"
            >
              <SmallSmileIcon/>
            </SampleButton>
            <SampleButton
              icon="traveling"
              color="tertiary"
              :title="`${$t('buttons.traveling')}`"
              @click="isTravelingActive"
            >
              <MapIcon/>
            </SampleButton>
            <SampleButton
              icon="watching"
              color="tertiary"
              :title="`${$t('buttons.watching')}`"
              @click="isWatchingActive"
            >
              <CinemaIcon/>
            </SampleButton>
            <SampleButton
              icon="playing"
              color="tertiary"
              :title="`${$t('buttons.playing')}`"
              @click="isPlayingActive"
            >
              <GamingIcon/>
            </SampleButton>
            <SampleButton
              icon="listening"
              color="tertiary"
              :title="`${$t('buttons.listening')}`"
              @click="isListeningActive"
            >
              <ListeningIcon/>
            </SampleButton>
          </div>
        </div>

        <div class="emotions__buttons--main--section" v-if="showMoodSection">
          <div class="emotions__input--section">
            <span @click="backToMoodSection" class="emotion__label">
              {{ $t('labels.feeling.mood.title') }}
            </span>
            <span class="emotion__input">{{ $t('labels.feeling.mood.placeholder') }}</span>
          </div>

          <div class="emotions__section--buttons">
            <SampleButton color="tertiary" icon="happy" :title="`${$t('buttons.emotions.happy')}`">
              <HappyIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="in_love"
              :title="`${$t('buttons.emotions.in_love')}`"
            >
              <InLoveIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="outraged"
              :title="`${$t('buttons.emotions.outraged')}`"
            >
              <OutragedIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="celebrate"
              :title="`${$t('buttons.emotions.celebrate')}`"
            >
              <CelebrateIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="giggle"
              :title="`${$t('buttons.emotions.giggle')}`"
            >
              <GiggleIcon/>
            </SampleButton>
            <SampleButton color="tertiary" icon="crazy" :title="`${$t('buttons.emotions.crazy')}`">
              <CrazyIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="falling_asleep"
              :title="`${$t('buttons.emotions.falling_asleep')}`"
            >
              <FallingAsleepIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="shocked"
              :title="`${$t('buttons.emotions.shocked')}`"
            >
              <ShockedIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="excited"
              :title="`${$t('buttons.emotions.excited')}`"
            >
              <ExcitedIcon/>
            </SampleButton>
            <SampleButton color="tertiary" icon="angry" :title="`${$t('buttons.emotions.angry')}`">
              <AngryIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="masked"
              :title="`${$t('buttons.emotions.masked')}`"
            >
              <MaskedIcon/>
            </SampleButton>
            <SampleButton color="tertiary" icon="think" :title="`${$t('buttons.emotions.think')}`">
              <ThinkIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="laughing_out_loud"
              :title="`${$t('buttons.emotions.laughing_out_loud')}`"
            >
              <LaughingOutLoudIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="wonder"
              :title="`${$t('buttons.emotions.wonder')}`"
            >
              <WonderIcon/>
            </SampleButton>
            <SampleButton color="tertiary" icon="sick" :title="`${$t('buttons.emotions.sick')}`">
              <SickIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="embarrassed"
              :title="`${$t('buttons.emotions.embarrassed')}`"
            >
              <EmbarrassedIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="ignore"
              :title="`${$t('buttons.emotions.ignore')}`"
            >
              <IgnoreIcon/>
            </SampleButton>
            <SampleButton
              color="tertiary"
              icon="frozen"
              :title="`${$t('buttons.emotions.frozen')}`"
            >
              <FrozenIcon/>
            </SampleButton>
          </div>
        </div>

        <div class="emotions__input--section" v-if="showTravelingSection">
          <span @click="backToMoodSection" class="emotion__label">
            {{ $t('labels.feeling.traveling.title') }}
          </span>
          <input
            class="emotion__input"
            :placeholder="`${$t('labels.feeling.traveling.placeholder')}`"
          />
        </div>

        <div class="emotions__input--section" v-if="showWatchingSection">
          <span @click="backToMoodSection" class="emotion__label">
            {{ $t('labels.feeling.watching.title') }}
          </span>
          <input
            class="emotion__input"
            :placeholder="`${$t('labels.feeling.watching.placeholder')}`"
          />
        </div>

        <div class="emotions__input--section" v-if="showPlayingSection">
          <span @click="backToMoodSection" class="emotion__label">
            {{ $t('labels.feeling.playing.title') }}
          </span>
          <input
            class="emotion__input"
            :placeholder="`${$t('labels.feeling.playing.placeholder')}`"
          />
        </div>

        <div class="emotions__input--section" v-if="showListeningSection">
          <span @click="backToMoodSection" class="emotion__label">
            {{ $t('labels.feeling.listening.title') }}
          </span>
          <input
            class="emotion__input"
            :placeholder="`${$t('labels.feeling.listening.placeholder')}`"
          />
        </div>

        <div class="audio__input--section" v-if="showAudioSection && addedAudioItems.length">
          <div class="audio__input--section--content">
            <div
              class="audio__input--section--item"
              v-for="(item, index) in addedAudioItems"
              :key="index"
            >
              <AudioPublicationIcon/>
              <input readonly type="text" class="audio__title" :value="item.title"/>
              <button type="button" class="remove__audio--button" @click="removeAudioItem(index)">
                <RemoveAudioIcon/>
              </button>
            </div>
          </div>
        </div>

        <div class="audio__input--section" v-if="showAudioSection">
          <p class="audio__input--section--title">{{ $t('labels.audio') }}</p>

          <div class="audio__input--section--content">
            <div
              class="audio__input--section--item"
              v-for="(item, index) in audioItems"
              :key="index"
            >
              <AudioPublicationIcon/>
              <input readonly type="text" class="audio__title" :value="item.title"/>
              <button type="button" class="add__audio--button" @click="addAudioItem">
                <AddAudioIcon/>
              </button>
            </div>
          </div>
        </div>

        <div class="textarea__active" :class="{ active: isTextAreaActive }">
          <div class="textarea__active--left--side">
            <button class="poll__button" type="button" @click="openPollModal">
              <PollIcon/>
            </button>

            <PollModal v-if="showPollModal" @close="closePollModal"/>

            <button class="smile__button" type="button" @click="activeSmileSection">
              <SmileIcon/>
            </button>

            <button class="audio__button" type="button" @click="activeAudioSection">
              <AudioPublicationIcon/>
            </button>

            <div class="vertical__divider"></div>

            <FileUpload label="file">
              <ClipIcon></ClipIcon>
            </FileUpload>
          </div>
          <div class="textarea__active--right--side">
            <SampleButton
              :title="`${$t('buttons.publish')}`"
              class="publish__button"
              :class="{ rounded: isTextAreaActive }"
            />
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import VideoPublicationsIcon from '@/components/icons/VideoPublicationsIcon.vue'
import AudioPublicationIcon from '@/components/icons/AudioPublicationIcon.vue'
import ClipIcon from '@/components/icons/ClipIcon.vue'
import RemoveAudioIcon from '@/components/icons/RemoveAudioIcon.vue'
import FrozenIcon from '@/components/icons/emotions/FrozenIcon.vue'
import AddAudioIcon from '@/components/icons/AddAudioIcon.vue'
import IgnoreIcon from '@/components/icons/emotions/IgnoreIcon.vue'
import EmbarrassedIcon from '@/components/icons/emotions/EmbarrassedIcon.vue'
import SickIcon from '@/components/icons/emotions/SickIcon.vue'
import WonderIcon from '@/components/icons/emotions/WonderIcon.vue'
import AngryIcon from '@/components/icons/emotions/AngryIcon.vue'
import MaskedIcon from '@/components/icons/emotions/MaskedIcon.vue'
import ThinkIcon from '@/components/icons/emotions/ThinkIcon.vue'
import LaughingOutLoudIcon from '@/components/icons/emotions/LaughingOutLoudIcon.vue'
import GiggleIcon from '@/components/icons/emotions/GiggleIcon.vue'
import CrazyIcon from '@/components/icons/emotions/CrazyIcon.vue'
import FallingAsleepIcon from '@/components/icons/emotions/FallingAsleepIcon.vue'
import ShockedIcon from '@/components/icons/emotions/ShockedIcon.vue'
import ExcitedIcon from '@/components/icons/emotions/ExcitedIcon.vue'
import ListeningIcon from '@/components/icons/ListeningIcon.vue'
import SmallSmileIcon from '@/components/icons/SmallSmileIcon.vue'
import HappyIcon from '@/components/icons/emotions/HappyIcon.vue'
import InLoveIcon from '@/components/icons/emotions/InLoveIcon.vue'
import OutragedIcon from '@/components/icons/emotions/OutragedIcon.vue'
import CelebrateIcon from '@/components/icons/emotions/CelebrateIcon.vue'
import AccessDropDown from '@/components/ui/Publications/Post/AccessDropDown.vue'
import PollIcon from '@/components/icons/news/PollIcon.vue'
import SmileIcon from '@/components/icons/news/SmileIcon.vue'
import PollModal from '@/components/modals/PollModal.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import CinemaIcon from '@/components/icons/CinemaIcon.vue'
import GamingIcon from '@/components/icons/GamingIcon.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import {getFormData} from "@/utils";
import SelectCategory from "@/components/ui/Post/SelectCategory.vue";

export default {
  components: {
    SelectCategory,
    GamingIcon,
    CinemaIcon,
    MapIcon,
    PollModal,
    SmileIcon,
    PollIcon,
    ImageIcon,
    FileUpload,
    VideoPublicationsIcon,
    AudioPublicationIcon,
    ClipIcon,
    RemoveAudioIcon,
    FrozenIcon,
    AddAudioIcon,
    IgnoreIcon,
    EmbarrassedIcon,
    SickIcon,
    WonderIcon,
    AngryIcon,
    MaskedIcon,
    ThinkIcon,
    LaughingOutLoudIcon,
    GiggleIcon,
    CrazyIcon,
    FallingAsleepIcon,
    ShockedIcon,
    ExcitedIcon,
    ListeningIcon,
    SmallSmileIcon,
    HappyIcon,
    InLoveIcon,
    OutragedIcon,
    CelebrateIcon,
    AccessDropDown,
    SampleButton
  },
  data: () => ({
    isTextAreaActive: false,
    showSmileSection: false,
    addedAudioItems: [],
    showPlayingSection: false,
    showListeningSection: false,
    showAudioSection: false,
    showPollModal: false,
    showMoodSection: false,
    showTravelingSection: false,
    showWatchingSection: false,
    audioItems: [
      {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 2,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 3,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 4,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 5,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 6,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 7,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 6,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      },
      {
        id: 7,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      }
    ],
    user: JSON.parse(localStorage.getItem('user')) || {},
  }),
  methods: {
    addPost() {
      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        postText: '',
        postPrivacy: 1,
      })
    },
    backToMoodSection() {
      if (this.showMoodSection) {
        this.showMoodSection = false
        this.showSmileSection = true
      }

      if (this.showTravelingSection) {
        this.showTravelingSection = false
        this.showSmileSection = true
      }

      if (this.showWatchingSection) {
        this.showWatchingSection = false
        this.showSmileSection = true
      }

      if (this.showPlayingSection) {
        this.showPlayingSection = false
        this.showSmileSection = true
      }

      if (this.showListeningSection) {
        this.showListeningSection = false
        this.showSmileSection = true
      }
    },
    isMoodActive() {
      this.showMoodSection = !this.showMoodSection
      this.showSmileSection = false
    },
    activeAudioSection() {
      this.showAudioSection = !this.showAudioSection
    },
    isTravelingActive() {
      this.showTravelingSection = !this.showTravelingSection
      this.showSmileSection = false
    },
    isWatchingActive() {
      this.showWatchingSection = !this.showWatchingSection
      this.showSmileSection = false
    },
    isPlayingActive() {
      this.showPlayingSection = !this.showPlayingSection
      this.showSmileSection = false
    },
    isListeningActive() {
      this.showListeningSection = !this.showListeningSection
      this.showSmileSection = false
    },
    activeSmileSection() {
      this.showSmileSection = !this.showSmileSection
    },
    openPollModal() {
      this.showPollModal = true
      document.body.classList.add('modal-open')
    },
    closePollModal() {
      this.showPollModal = false
      document.body.classList.remove('modal-open')
    },
    handleTextareaInput(event) {
      const textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    },
    removeAudioItem(index) {
      const item = this.addedAudioItems.splice(index, 1)[0]
      if (item) {
        this.audioItems.push(item)
      }
    },
    addAudioItem() {
      if (this.audioItems.length > 0) {
        const item = this.audioItems.shift()
        this.addedAudioItems.push(item)
      }
    },
    handleDocumentClick(event) {
      const formSection = this.$refs.formSectionRef
      if (formSection && !formSection.contains(event.target)) {
        this.isTextAreaActive = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }
}
</script>

<style lang="scss" scoped>
.modal-open {
  transition: all 0.15s ease-in-out;
  overflow: hidden;
}

.publications__form--section {
  border-radius: 15px;
  padding: 16px 24px;
  background-color: var(--color-white);
}

.form__section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  row-gap: 24px;
}

.form__left--side {
  display: flex;
  align-items: center;
  width: 100%;

  &:first-child {
    align-self: flex-start;
  }

  a {
    margin-right: 16px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 16px;
    min-height: 22px;
    width: 89%;
    background-color: transparent;

    &::placeholder {
      color: var(--color-silver-chalice);
    }
  }
}

.form__inputs--block {
  display: flex;
  align-items: center;
  gap: 24px;

  label,
  input {
    svg {
      color: var(--color-silver-chalice);

      &:hover {
        color: var(--color-hippie-blue);
        transition: all 0.15s ease-in-out;
      }
    }
  }
}

.vertical__divider {
  width: 2px;
  height: 14px;
  background-color: var(--color-alto-second);
}

.mood__section {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .emotions__label {
    color: var(--color-silver-chalice);
  }

  .buttons {
    padding: 12px;
    display: flex;
    gap: 12px;
    background-color: var(--color-seashell);
    border-radius: 10px;
    width: max-content;

    .btn {
      display: flex;
      align-items: center;
      padding: 12px;

      svg {
        color: var(--color-hippie-blue);
      }
    }
  }
}

.emotions__section--buttons {
  background-color: var(--color-seashell);
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
  gap: 12px;
  border-radius: 10px;

  .btn {
    display: flex;
    align-items: center;
    width: 200px;
    padding: 10px 15px 10px 20px;
  }
}

.audio__input--section {
  display: flex;
  flex-direction: column;
  background-color: var(--color-seashell);
  padding: 12px;
  border-radius: 10px;

  .audio__title {
    color: var(--color-mine-shaft);
    border: none;
    background: none;
    font-size: 16px;
    outline: none;
    width: 90%;
  }

  &--title {
    color: var(--color-silver-chalice);
    margin: 0 0 12px;
  }

  &--content {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    max-height: 300px;
    overflow: auto;
  }

  &--item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    svg {
      color: var(--color-hippie-blue);
    }
  }
}

.emotions__input--section {
  display: flex;
  align-items: center;
  gap: 20px;

  .emotion__label {
    font-weight: 600;
    cursor: pointer;
  }

  .emotion__input {
    border: none;
    font-size: 16px;
    width: 100%;
    outline: none;
  }
}

.emotions__buttons--main--section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.add__audio--button,
.remove__audio--button {
  cursor: pointer;
  display: flex;
  border: none;
  outline: none;
}

.poll__button,
.smile__button,
.audio__button {
  all: unset;
  cursor: pointer;
  max-height: 24px;

  svg {
    color: var(--color-silver-chalice);

    &:hover {
      color: var(--color-hippie-blue);
      transition: all 0.15s ease-in-out;
    }
  }
}

.textarea__active {
  display: flex;
  justify-content: space-between;

  &--left--side,
  &--right--side {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &--left--side {
    svg {
      color: var(--color-silver-chalice);

      &:hover {
        color: var(--color-hippie-blue);
        transition: all 0.15s ease-in-out;
      }
    }
  }

  &--buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    row-gap: 24px;
  }
}

.publish__button {
  padding: 12px 38px;
}

.form__buttons--section {
  display: flex;
  gap: 12px;
  width: 100%;
}
</style>
