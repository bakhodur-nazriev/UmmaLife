<template>
  <div class="publication__main--block">
    <div class="publication-top__layer">
      <div class="main__publications--section">
        <section class="publications__form--section">
          <form action="" class="form__section">
            <div class="form__left--side">
              <img width="48" height="48" src="../../assets/images/Ellipse.png" alt="">
              <textarea
                rows="1"
                :placeholder="$t('placeholders.publications_input')"
                @input="handleTextareaInput"
                class="enter__post--textarea"
                :class="{ 'active': isTextAreaActive }"
                @click="isTextAreaActive = true"
                @blur="isTextAreaActive = true"
              ></textarea>
            </div>
            <div v-if="!isTextAreaActive" class="form__inputs--block">
              <FileUpload label="image" accept="image/*">
                <ImageIcon />
              </FileUpload>

              <FileUpload label="video" accept="video/*">
                <VideoPublicationsIcon />
              </FileUpload>

              <FileUpload label="audio" accept="audio/*">
                <AudioPublicationIcon />
              </FileUpload>
              <div class="vertical__divider"></div>
              <FileUpload label="file">
                <ClipIcon />
              </FileUpload>
            </div>
            <div v-if="isTextAreaActive" class="textarea__active--buttons">
              <div class="textarea__active--smile mood__section" v-if="showSmileSection">
                <span class="emotions__label">{{ $t('labels.feeling.label') }}</span>

                <div class="buttons">
                  <SampleButton
                    icon="mood"
                    color="tertiary"
                    :title="`${ $t('buttons.mood') }`"
                    @click="isMoodActive"
                  >
                    <SmallSmileIcon />
                  </SampleButton>
                  <SampleButton
                    icon="traveling"
                    color="tertiary"
                    :title="`${ $t('buttons.traveling') }`"
                    @click="isTravelingActive"
                  >
                    <MapIcon />
                  </SampleButton>
                  <SampleButton
                    icon="watching"
                    color="tertiary"
                    :title="`${ $t('buttons.watching') }`"
                    @click="isWatchingActive"
                  >
                    <CinemaIcon />
                  </SampleButton>
                  <SampleButton
                    icon="playing"
                    color="tertiary"
                    :title="`${ $t('buttons.playing') }`"
                    @click="isPlayingActive"
                  >
                    <GamingIcon />
                  </SampleButton>
                  <SampleButton
                    icon="listening"
                    color="tertiary"
                    :title="`${ $t('buttons.listening') }`"
                    @click="isListeningActive"
                  >
                    <ListeningIcon />
                  </SampleButton>
                </div>
              </div>

              <div class="emotions__buttons--main--section" v-if="showMoodSection">
                <div class="emotions__input--section">
                  <span @click="backToMoodSection" class="emotion__label">{{ $t('labels.feeling.mood.title') }}</span>
                  <span class="emotion__input">{{ $t('labels.feeling.mood.placeholder') }}</span>
                </div>

                <div class="emotions__section--buttons">
                  <SampleButton color="tertiary" icon="happy" :title="`${ $t('buttons.emotions.happy') }`">
                    <HappyIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="in_love" :title="`${ $t('buttons.emotions.in_love') }`">
                    <InLoveIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="outraged" :title="`${ $t('buttons.emotions.outraged') }`">
                    <OutragedIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="celebrate" :title="`${ $t('buttons.emotions.celebrate') }`">
                    <CelebrateIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="giggle" :title="`${ $t('buttons.emotions.giggle') }`">
                    <GiggleIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="crazy" :title="`${ $t('buttons.emotions.crazy') }`">
                    <CrazyIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="falling_asleep" :title="`${ $t('buttons.emotions.falling_asleep') }`">
                    <FallingAsleepIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="shocked" :title="`${ $t('buttons.emotions.shocked') }`">
                    <ShockedIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="excited" :title="`${ $t('buttons.emotions.excited') }`">
                    <ExcitedIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="angry" :title="`${ $t('buttons.emotions.angry') }`">
                    <AngryIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="masked" :title="`${ $t('buttons.emotions.masked') }`">
                    <MaskedIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="think" :title="`${ $t('buttons.emotions.think') }`">
                    <ThinkIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="laughing_out_loud" :title="`${ $t('buttons.emotions.laughing_out_loud') }`">
                    <LaughingOutLoudIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="wonder" :title="`${ $t('buttons.emotions.wonder') }`">
                    <WonderIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="sick" :title="`${ $t('buttons.emotions.sick') }`">
                    <SickIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="embarrassed" :title="`${ $t('buttons.emotions.embarrassed') }`">
                    <EmbarrassedIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="ignore" :title="`${ $t('buttons.emotions.ignore') }`">
                    <IgnoreIcon />
                  </SampleButton>
                  <SampleButton color="tertiary" icon="frozen" :title="`${ $t('buttons.emotions.frozen') }`">
                    <FrozenIcon />
                  </SampleButton>
                </div>
              </div>

              <div class="emotions__input--section" v-if="showTravelingSection">
                <span @click="backToMoodSection" class="emotion__label">{{ $t('labels.feeling.traveling.title') }}</span>
                <input class="emotion__input" :placeholder="`${ $t('labels.feeling.traveling.placeholder') }`"/>
              </div>

              <div class="emotions__input--section" v-if="showWatchingSection">
                <span @click="backToMoodSection" class="emotion__label">{{ $t('labels.feeling.watching.title') }}</span>
                <input class="emotion__input" :placeholder="`${ $t('labels.feeling.watching.placeholder') }`"/>
              </div>

              <div class="emotions__input--section" v-if="showPlayingSection">
                <span @click="backToMoodSection" class="emotion__label">{{ $t('labels.feeling.playing.title') }}</span>
                <input class="emotion__input" :placeholder="`${ $t('labels.feeling.playing.placeholder') }`"/>
              </div>

              <div class="emotions__input--section" v-if="showListeningSection">
                <span @click="backToMoodSection" class="emotion__label">{{ $t('labels.feeling.listening.title') }}</span>
                <input class="emotion__input" :placeholder="`${ $t('labels.feeling.listening.placeholder') }`"/>
              </div>

              <div class="audio__input--section" v-if="showAudioSection && addedAudioItems.length">
                <div class="audio__input--section--content">
                  <div
                    class="audio__input--section--item"
                    v-for="(item, index) in addedAudioItems"
                    :key="index"
                  >
                    <AudioPublicationIcon />
                    <input
                      readonly
                      type="text"
                      class="audio__title"
                      :value="item.title"
                    >
                    <button type="button" class="remove__audio--button" @click="removeAudioItem(index)">
                      <RemoveAudioIcon />
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
                    <AudioPublicationIcon />
                    <input
                      readonly
                      type="text"
                      class="audio__title"
                      :value="item.title"
                    >
                    <button type="button" class="add__audio--button" @click="addAudioItem">
                      <AddAudioIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div class="textarea__active">
                <div class="textarea__active--left--side">
                  <button class="poll__button" type="button" @click="openPollModal">
                    <PollIcon />
                  </button>

                  <PollModal
                    v-if="showPollModal"
                    @close="closePollModal"
                  />

                  <button
                    class="smile__button"
                    type="button"
                    @click="activeSmileSection"
                  >
                    <SmileIcon />
                  </button>

                  <button
                    class="audio__button"
                    type="button"
                    @click="activeAudioSection"
                  >
                    <AudioPublicationIcon />
                  </button>

                  <div class="vertical__divider"></div>

                  <FileUpload label="file">
                    <ClipIcon></ClipIcon>
                  </FileUpload>
                </div>
                <div class="textarea__active--right--side">
                  <AccessDropDown />
                  <SampleButton
                    :title="`${ $t('buttons.publish') }`"
                    class="publish__button"
                    rounded="rounded"
                  />
                </div>
              </div>
            </div>
          </form>
        </section>
        <section class="tab__publications--section">
          <main-publications-tab :tabs-array="tabLabels"></main-publications-tab>
        </section>
      </div>
    </div>

    <PublicationTabSide />
  </div>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon.vue'
import AudioPublicationIcon from '@/components/icons/AudioPublicationIcon.vue'
import ClipIcon from '@/components/icons/ClipIcon.vue'
import VideoPublicationsIcon from '@/components/icons/VideoPublicationsIcon.vue'
import MainPublicationsTab from '@/components/ui/Publications/MainPublicationsTab.vue'
import SampleButton from '@/components/ui/SampleButton.vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import AccessDropDown from '@/components/ui/Post/AccessDropDown.vue'
import PollIcon from '@/components/icons/news/PollIcon.vue'
import SmileIcon from '@/components/icons/news/SmileIcon.vue'
import PollModal from '@/components/modals/PollModal.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import CinemaIcon from '@/components/icons/CinemaIcon.vue'
import GamingIcon from '@/components/icons/GamingIcon.vue'
import ListeningIcon from '@/components/icons/ListeningIcon.vue'
import SmallSmileIcon from '@/components/icons/SmallSmileIcon.vue'
import HappyIcon from '@/components/icons/emotions/HappyIcon.vue'
import InLoveIcon from '@/components/icons/emotions/InLoveIcon.vue'
import OutragedIcon from '@/components/icons/emotions/OutragedIcon.vue'
import CelebrateIcon from '@/components/icons/emotions/CelebrateIcon.vue'
import GiggleIcon from '@/components/icons/emotions/GiggleIcon.vue'
import CrazyIcon from '@/components/icons/emotions/CrazyIcon.vue'
import FallingAsleepIcon from '@/components/icons/emotions/FallingAsleepIcon.vue'
import ShockedIcon from '@/components/icons/emotions/ShockedIcon.vue'
import ExcitedIcon from '@/components/icons/emotions/ExcitedIcon.vue'
import AngryIcon from '@/components/icons/emotions/AngryIcon.vue'
import MaskedIcon from '@/components/icons/emotions/MaskedIcon.vue'
import ThinkIcon from '@/components/icons/emotions/ThinkIcon.vue'
import LaughingOutLoudIcon from '@/components/icons/emotions/LaughingOutLoudIcon.vue'
import WonderIcon from '@/components/icons/emotions/WonderIcon.vue'
import SickIcon from '@/components/icons/emotions/SickIcon.vue'
import EmbarrassedIcon from '@/components/icons/emotions/EmbarrassedIcon.vue'
import IgnoreIcon from '@/components/icons/emotions/IgnoreIcon.vue'
import FrozenIcon from '@/components/icons/emotions/FrozenIcon.vue'
import AddAudioIcon from '@/components/icons/AddAudioIcon.vue'
import RemoveAudioIcon from '@/components/icons/RemoveAudioIcon.vue'
import PublicationTabSide from '@/components/blocks/PublicationTabSide.vue'

export default {
  components: {
    PublicationTabSide,
    RemoveAudioIcon,
    AddAudioIcon,
    FrozenIcon,
    IgnoreIcon,
    EmbarrassedIcon,
    SickIcon,
    WonderIcon,
    LaughingOutLoudIcon,
    ThinkIcon,
    MaskedIcon,
    AngryIcon,
    ExcitedIcon,
    ShockedIcon,
    FallingAsleepIcon,
    CrazyIcon,
    GiggleIcon,
    CelebrateIcon,
    OutragedIcon,
    InLoveIcon,
    HappyIcon,
    SmallSmileIcon,
    ListeningIcon,
    GamingIcon,
    CinemaIcon,
    MapIcon,
    PollModal,
    SmileIcon,
    PollIcon,
    FileUpload,
    MainPublicationsTab,
    VideoPublicationsIcon,
    ClipIcon,
    AudioPublicationIcon,
    ImageIcon,
    SampleButton,
    AccessDropDown
  },
  data () {
    return {
      isTextAreaActive: false,
      showPollModal: false,
      showSmileSection: false,
      showMoodSection: false,
      showTravelingSection: false,
      showWatchingSection: false,
      showPlayingSection: false,
      showListeningSection: false,
      showAudioSection: true,
      addedAudioItems: [],
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
        }
      ]
    }
  },
  methods: {
    addAudioItem () {
      if (this.audioItems.length > 0) {
        const item = this.audioItems.shift()
        this.addedAudioItems.push(item)
      }
    },
    removeAudioItem (index) {
      const item = this.addedAudioItems.splice(index, 1)[0]
      if (item) {
        this.audioItems.push(item)
      }
    },
    activeAudioSection () {
      this.showAudioSection = !this.showAudioSection
    },
    backToMoodSection () {
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
    isMoodActive () {
      this.showMoodSection = !this.showMoodSection
      this.showSmileSection = false
    },
    isTravelingActive () {
      this.showTravelingSection = !this.showTravelingSection
      this.showSmileSection = false
    },
    isWatchingActive () {
      this.showWatchingSection = !this.showWatchingSection
      this.showSmileSection = false
    },
    isPlayingActive () {
      this.showPlayingSection = !this.showPlayingSection
      this.showSmileSection = false
    },
    isListeningActive () {
      this.showListeningSection = !this.showListeningSection
      this.showSmileSection = false
    },
    activeSmileSection () {
      this.showSmileSection = !this.showSmileSection
    },
    openPollModal () {
      this.showPollModal = true
      document.body.classList.add('modal-open')
    },
    closePollModal () {
      this.showPollModal = false
      document.body.classList.remove('modal-open')
    },
    handleWindowClick (event) {
      const textarea = this.$refs.textarea
      if (textarea && !textarea.contains(event.target)) {
        this.isTextAreaActive = false
      }
    },
    handleTextareaInput (event) {
      const textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  },
  computed: {
    tabLabels () {
      return [
        this.$t('tabs.publications_inside.articles'),
        this.$t('tabs.publications_inside.photo'),
        this.$t('tabs.publications_inside.video'),
        this.$t('tabs.publications_inside.audio')
      ]
    }
  },
  mounted () {
    window.addEventListener('click', this.handleWindowClick)
  },
  beforeUnmount () {
    window.removeEventListener('click', this.handleWindowClick)
  },
  watch: {
    isTextAreaActive (newValue) {
      const formSection = document.querySelector('.form__section')
      const formInputBlocks = document.querySelector('.form__inputs--block')
      if (newValue) {
        formSection.style.flexDirection = 'column'
        formInputBlocks.style.width = '100%'
      } else {
        formSection.style.flexDirection = 'row'
        formInputBlocks.style.width = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.publication-top__layer {
  width: 1200px;
  display: flex;
  justify-content: center;
}

svg {
  color: var(--color-silver-chalice);
}

.add__audio--button,
.remove__audio--button {
  cursor: pointer;
  display: flex;
  border: none;
  outline: none;
}

.emotions__buttons--main--section {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.modal-open {
  transition: .2s;
  overflow: hidden;
}

.poll__button,
.smile__button,
.audio__button {
  all: unset;
  cursor: pointer;
  max-height: 24px;
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

.form__left--side {
  display: flex;
  align-items: center;
  width: 100%;
}

.form__left--side > :first-child {
  align-self: flex-start;
}

.form__left--side img {
  margin-right: 16px;
}

.form__left--side textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  min-height: 22px;
  width: 89%;
}

.form__left--side textarea::placeholder {
  color: var(--color-silver-chalice);
}

.form__inputs--block {
  display: flex;
  align-items: center;
  gap: 24px;
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

.vertical__divider {
  width: 2px;
  height: 14px;
  background-color: var(--color-alto-second);
}

.publication__main--block {
  width: 100%;
  display: flex;
  gap: 13px;
}

.main__publications--section {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

@media (min-width: 768px) {
  .main__publications--section {
    width: 100%
  }
}

@media (min-width: 1280px) {
  .main__publications--section {
    width: 700px;
  }
}

@media (min-width: 1920px) {
  .main__publications--section {
    width: 700px;
  }
}
</style>
