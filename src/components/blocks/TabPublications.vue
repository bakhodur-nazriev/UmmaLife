<template>
  <div class="publication__main--block">
    <div class="main__publications--section">
      <PublicationForm />
      <section class="tab__publications--section">
        <main-publications-tab :tabs-array="tabLabels"></main-publications-tab>
      </section>
    </div>
    <aside class="aside__publications">
      <section class="section__last--actions">
        <div>
          <h3 class="text-1 medium">{{ $t("sections_title.last_actions") }}</h3>
        </div>
        <hr class="divider__line" />
        <div class="actions__section">
          <div v-for="i in 5" :key="i">
            <router-link class="actions__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="" />
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing e tempor
                incididunt</span
              >
            </router-link>
          </div>
        </div>
      </section>
      <section class="section__recommended--groups">
        <div class="aside__title--section">
          <h3 class="text-1 medium">
            {{ $t("sections_title.recommended_groups") }}
          </h3>
          <router-link class="link" to="#">{{
            $t("links.all_groups")
          }}</router-link>
        </div>
        <hr class="divider__line" />
        <div class="group__section">
          <div
            class="group__right--side"
            v-for="(group, index) in recommendedGroups"
            :key="index"
          >
            <router-link class="group__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="" />
              <div class="group__info">
                <span>{{ group.name }}</span>
                <small>{{ group.members }}</small>
              </div>
            </router-link>
            <SampleButton
              icon="plus"
              color="primary"
              :title="`${$t('buttons.join')}`"
            />
          </div>
        </div>
      </section>
      <section class="section__recommended--people">
        <div class="aside__title--section">
          <h3 class="text-1 medium">
            {{ $t("sections_title.recommended_people") }}
          </h3>
          <router-link class="link" to="#">{{
            $t("links.all_people")
          }}</router-link>
        </div>
        <hr class="divider__line" />
        <div class="person__section">
          <div
            class="person__right--side"
            v-for="(person, index) in recommendedPeople"
            :key="index"
          >
            <router-link class="person__link" to="#">
              <img src="../../assets/images/Ellipse.png" alt="" />
              <div class="person__info">
                <span>{{ person.name }}</span>
                <small>{{ person.followers }}</small>
              </div>
            </router-link>
            <SampleButton
              :title="`${
                subscribeButtonStatus
                  ? $t('buttons.follow')
                  : $t('buttons.subscribe')
              }`"
              @click="toggleSubscribeButton"
              :class="{ active: subscribeButtonStatus }"
            />
          </div>
        </div>
      </section>
    </aside>
  </div>
</template>

<script>
import PublicationForm from '@/components/forms/PublicationForm.vue'
import MainPublicationsTab from '@/components/ui/Publications/MainPublicationsTab.vue'
import SampleButton from '@/components/ui/SampleButton.vue'

export default {
  components: {
    PublicationForm,
    MainPublicationsTab,
    SampleButton
  },
  data () {
    return {
      subscribeButtonStatus: false,
      isTextAreaActive: false
    }
  },
  methods: {
    handleWindowClick (event) {
      const textarea = this.$refs.textarea
      if (textarea && !textarea.contains(event.target)) {
        this.isTextAreaActive = false
      }
    },

    toggleSubscribeButton () {
      this.subscribeButtonStatus = !this.subscribeButtonStatus
    }
  },
  computed: {
    recommendedGroups () {
      return [
        {
          name: 'Мы Мусульмане',
          members: 4560 + ' ' + this.$t('labels.members.plural')
        },
        {
          name: 'Big Kahuna BuLtd.',
          members: 21260 + ' ' + this.$t('labels.members.plural')
        },
        {
          name: 'Binford Ltd.',
          members: 33241 + ' ' + this.$t('labels.members.plural')
        },
        {
          name: 'Biffco EnterpriLtd.',
          members: 445100 + ' ' + this.$t('labels.members.plural')
        },
        {
          name: 'Acme Co.',
          members: 987654 + ' ' + this.$t('labels.members.plural')
        }
      ]
    },
    recommendedPeople () {
      return [
        {
          name: 'Courtney Henry',
          followers: 4560 + ' ' + this.$t('labels.subscribers.plural')
        },
        {
          name: 'Eleanor Pena',
          followers: 21260 + ' ' + this.$t('labels.subscribers.plural')
        },
        {
          name: 'Theresa Webb',
          followers: 33241 + ' ' + this.$t('labels.subscribers.plural')
        },
        {
          name: 'Ronald Richards',
          followers: 445100 + ' ' + this.$t('labels.subscribers.plural')
        },
        {
          name: 'Arlene McCoy',
          followers: 987654 + ' ' + this.$t('labels.subscribers.plural')
        }
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
    width: 100%;
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
  .group__right--side button {
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
  .group__right--side button {
    height: 34px;
    padding: 8px 32px;
    font-size: 14px;
    min-width: 153px;
    max-width: 153px;
  }

}
</style>
