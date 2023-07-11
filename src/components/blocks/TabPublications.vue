<template>
  <div class="publication__main--block">
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
              <ImageIcon></ImageIcon>
            </FileUpload>

            <FileUpload label="video" accept="video/*">
              <VideoPublicationsIcon></VideoPublicationsIcon>
            </FileUpload>

            <FileUpload label="audio" accept="audio/*">
              <AudioPublicationIcon></AudioPublicationIcon>
            </FileUpload>
            <div class="vertical__divider"></div>
            <FileUpload label="file">
              <ClipIcon></ClipIcon>
            </FileUpload>
          </div>
          <div v-if="isTextAreaActive" class="textarea__active--buttons">
            <div class="textarea__active--smile mood__section" v-if="showSmileSection">
              <div class="buttons">
                <SampleButton icon="mood" color="tertiary" :title="`${ $t('buttons.mood') }`">
                  <SmallSmileIcon />
                </SampleButton>
                <SampleButton icon="traveling" color="tertiary" :title="`${ $t('buttons.traveling') }`">
                  <MapIcon />
                </SampleButton>
                <SampleButton icon="watching" color="tertiary" :title="`${ $t('buttons.watching') }`">
                  <CinemaIcon />
                </SampleButton>
                <SampleButton icon="playing" color="tertiary" :title="`${ $t('buttons.playing') }`">
                  <GamingIcon />
                </SampleButton>
                <SampleButton icon="listening" color="tertiary" :title="`${ $t('buttons.listening') }`">
                  <ListeningIcon />
                </SampleButton>
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

                <button class="audio__button" type="button">
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
    <aside class="aside__publications">
      <section class="section__last--actions">
        <div>
          <h3 class="text-1 medium">{{ $t('sections_title.last_actions') }}</h3>
        </div>
        <hr class="divider__line">
        <div class="actions__section">
          <div v-for="i in 5" :key="i">
            <router-link class="actions__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="">
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing e tempor incididunt</span>
            </router-link>
          </div>
        </div>
      </section>
      <section class="section__recommended--groups">
        <div class="aside__title--section">
          <h3 class="text-1 medium">{{ $t('sections_title.recommended_groups') }}</h3>
          <router-link class="link" to="#">{{ $t('links.all_groups') }}</router-link>
        </div>
        <hr class="divider__line">
        <div class="group__section">
          <div class="group__right--side" v-for="(group, index) in recommendedGroups" :key="index">
            <router-link class="group__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="">
              <div class="group__info">
                <span>{{ group.name }}</span>
                <small>{{ group.members }}</small>
              </div>
            </router-link>
            <SampleButton
              icon="plus"
              color="primary"
              :title="`${ $t('buttons.join') }`"
            />
          </div>
        </div>
      </section>
      <section class="section__recommended--people">
        <div class="aside__title--section">
          <h3 class="text-1 medium">{{ $t('sections_title.recommended_people') }}</h3>
          <router-link class="link" to="#">{{ $t('links.all_people') }}</router-link>
        </div>
        <hr class="divider__line">
        <div class="person__section">
          <div class="person__right--side" v-for="(person, index) in recommendedPeople" :key="index">
            <router-link class="person__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="">
              <div class="person__info">
                <span>{{ person.name }}</span>
                <small>{{ person.followers }}</small>
              </div>
            </router-link>
            <SampleButton
              :title="`${ subscribeButtonStatus ? $t('buttons.follow') : $t('buttons.subscribe') }`"
              @click="toggleSubscribeButton"
              :class="{ 'active' :subscribeButtonStatus }"
            />
          </div>
        </div>
      </section>
    </aside>
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
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  components: {
    PlusIcon,
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
      subscribeButtonStatus: false,
      isTextAreaActive: false,
      showPollModal: false,
      showSmileSection: true
    }
  },
  methods: {
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
    },
    toggleSubscribeButton () {
      this.subscribeButtonStatus = !this.subscribeButtonStatus
    }
  },
  computed: {
    recommendedGroups () {
      return [
        { name: 'Мы Мусульмане', members: 4560 + ' ' + this.$t('labels.members.plural') },
        { name: 'Big Kahuna BuLtd.', members: 21260 + ' ' + this.$t('labels.members.plural') },
        { name: 'Binford Ltd.', members: 33241 + ' ' + this.$t('labels.members.plural') },
        { name: 'Biffco EnterpriLtd.', members: 445100 + ' ' + this.$t('labels.members.plural') },
        { name: 'Acme Co.', members: 987654 + ' ' + this.$t('labels.members.plural') }
      ]
    },
    recommendedPeople () {
      return [
        { name: 'Courtney Henry', followers: 4560 + ' ' + this.$t('labels.subscribers.plural') },
        { name: 'Eleanor Pena', followers: 21260 + ' ' + this.$t('labels.subscribers.plural') },
        { name: 'Theresa Webb', followers: 33241 + ' ' + this.$t('labels.subscribers.plural') },
        { name: 'Ronald Richards', followers: 445100 + ' ' + this.$t('labels.subscribers.plural') },
        { name: 'Arlene McCoy', followers: 987654 + ' ' + this.$t('labels.subscribers.plural') }
      ]
    },
    tabLabels () {
      return [
        this.$t('tabs.publications_inside.publications'),
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
.mood__section {
  display: flex;

  .buttons {
    padding: 12px;
    display: flex;
    gap: 12px;
    background-color: var(--color-seashell);
    border-radius: 10px;

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

.person__section,
.group__section,
.actions__section {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.person__right--side,
.group__right--side {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.person__link,
.group__link,
.actions__link {
  display: flex;
  width: 100%;
  text-decoration: none;
  align-items: center;
}

.person__link img,
.group__link img,
.actions__link img {
  margin-right: 8px;
  width: 56px;
  height: 56px;
}

.actions__section span {
  color: var(--color-mine-shaft);
}

.person__info,
.group__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.person__info span,
.group__info span {
  color: var(--color-mine-shaft);
}

.person__info small,
.group__info small {
  color: var(--color-silver-chalice);
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

.aside__title--section {
  display: flex;
  justify-content: space-between;
}

.divider__line {
  height: 1px;
  margin: 16px 0;
  border: 0;
  background-color: var(--color-alto-second);
}

.publication__main--block {
  display: flex;
  gap: 13px;
}

.section__last--actions,
.section__recommended--groups,
.section__recommended--people {
  background-color: var(--color-white);
  color: var(--color-silver-chalice);
  border-radius: 15px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
}

.form__inputs--block {
  display: flex;
  align-items: center;
  gap: 24px;
}

svg {
  color: var(--color-silver-chalice)
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

.aside__publications {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
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

  .aside__publications {
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .main__publications--section {
    width: 850px;
  }

  .aside__publications {
    width: 350px;
  }

  .person__right--side button,
  .group__right--side button
  {
    height: 34px;
    padding: 8px 10px;
    font-size: 14px;
    min-width: 110px;
    max-width: 110px;
  }
}

@media (min-width: 1920px) {
  .main__publications--section {
    width: 1123px;
  }

  .aside__publications {
    width: 411px;
  }

  .person__right--side button,
  .group__right--side button
  {
    height: 34px;
    padding: 8px 32px;
    font-size: 14px;
    min-width: 153px;
    max-width: 153px;
  }
}
</style>
