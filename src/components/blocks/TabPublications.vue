<template>
  <div class="publication__main--block">
    <div class="main__publications--section">
      <section class="publications__form--section">
        <form action="" class="form__section">
          <div class="form__left--side">
            <img src="../../assets/images/Ellipse.png" alt="">

            <textarea rows="1" :placeholder="$t('placeholders.publications_input')"></textarea>
          </div>

          <div class="form__inputs--block">
            <label for="image-input">
              <image-icon></image-icon>
            </label>
            <input id="image-input" type="file" accept="image/*"/>

            <label for="video-input">
              <video-publications-icon></video-publications-icon>
            </label>
            <input id="video-input" type="file" accept="video/*"/>

            <label for="audio-input">
              <audio-publication-icon></audio-publication-icon>
            </label>
            <input id="audio-input" type="file" accept="audio/*"/>

            <div class="vertical__divider"></div>

            <label for="file-input">
              <clip-icon></clip-icon>
            </label>
            <input id="file-input" type="file"/>
          </div>
        </form>
      </section>
      <section class="tab__publications--section">
        <publications-inside-tabs
          :tabs-array="[
            `${$t('tabs.publications_inside.publications')}`,
            `${$t('tabs.publications_inside.articles')}`,
            `${$t('tabs.publications_inside.photo')}`,
            `${$t('tabs.publications_inside.video')}`,
            `${$t('tabs.publications_inside.audio')}`
          ]"
        ></publications-inside-tabs>
      </section>
    </div>
    <aside class="aside__publications">
      <section class="section__last--actions">
        <div>
          <h3 class="text-1 medium">{{ $t('sections_title.last_actions') }}</h3>
        </div>
        <hr class="divider__line">
        <div></div>
      </section>
      <section class="section__recommended--groups">
        <div class="aside__title--section">
          <h3 class="text-1 medium">{{ $t('sections_title.recommended_groups') }}</h3>
          <a class="link" href="">{{ $t('links.all_groups') }}</a>
        </div>
        <hr class="divider__line">
        <div></div>
      </section>
      <section class="section__recommended--people">
        <div class="aside__title--section">
          <h3 class="text-1 medium">{{ $t('sections_title.recommended_people') }}</h3>
          <a class="link" href="">{{ $t('links.all_people') }}</a>
        </div>
        <hr class="divider__line">
        <div class="all__peoples" v-for="i in 5" :key="i">
          <a class="person__link" href="#">
            <img src="../../assets/images/Ellipse.png" alt="">
            <div class="person__info">
              <span>Courtney Henry</span>
              <small>1555 подписчик</small>
            </div>
          </a>
          <sample-button>{{ $t('buttons.subscribe') }}</sample-button>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
import ImageIcon from '@/components/icons/ImageIcon.vue'
import AudioPublicationIcon from '@/components/icons/AudioPublicationIcon.vue'
import ClipIcon from '@/components/icons/ClipIcon.vue'
import VideoPublicationsIcon from '@/assets/images/VideoPublicationsIcon.vue'
import PublicationsInsideTabs from '@/components/ui/Publications/PublicationsInsideTabs.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    PublicationsInsideTabs,
    VideoPublicationsIcon,
    ClipIcon,
    AudioPublicationIcon,
    ImageIcon,
    SampleButton
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.all__peoples {
  display: flex;
  justify-content: space-between;
  row-gap: 14px;
}

.all__peoples button {
  height: 34px;
  padding: 0;
}

.person__link {
  display: flex;
  width: 100%;
}

.person__info {
  display: flex;
  flex-direction: column;
}

.form__left--side {
  display: flex;
  width: 100%;
}

.form__left--side img {
  margin-right: 16px;
}

.form__left--side textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
  width: 89%;
}

.form__left--side textarea::placeholder {
  color: var(--color-text);
}

.aside__title--section {
  display: flex;
  justify-content: space-between;
}

.divider__line {
  height: 1px;
  margin: 16px 0;
  border: 0;
  background-color: var(--color-gray-2);
}

.publication__main--block {
  display: flex;
  gap: 13px;
}

.section__last--actions,
.section__recommended--groups,
.section__recommended--people {
  background-color: var(--color-background);
  color: var(--color-text);
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

.form__inputs--block input {
  display: none;
}

.form__inputs--block label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

svg {
  color: var(--color-text)
}

.publications__form--section {
  border-radius: 15px;
  padding: 16px;
  background-color: var(--color-background);
}

.form__section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.vertical__divider {
  width: 2px;
  height: 14px;
  background-color: var(--color-gray-2);
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
    width: 100%
  }

  .aside__publications {
    width: 100%;
  }
}

@media (min-width: 1920px) {
  .main__publications--section {
    width: 1123px;
  }

  .aside__publications {
    width: 411px;
  }
}
</style>
