<template>
  <div class="publication__main--block">
    <div class="publication-top__layer">
      <div class="main__publications--section">
        <PublicationForm />
        <section class="tab__publications--section">
          <MainPublicationsTab :tabs-array="tabLabels" />
        </section>
      </div>
    </div>

    <PublicationTabSide />
  </div>
</template>

<script>
import MainPublicationsTab from '@/components/ui/Publications/MainPublicationsTab.vue'
import PublicationTabSide from '@/components/blocks/PublicationTabSide.vue'
import PublicationForm from '@/components/forms/PublicationForm.vue'

export default {
  components: {
    PublicationForm,
    PublicationTabSide,
    MainPublicationsTab
  },
  data () {
    return {
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
  computed: {
    tabLabels () {
      return [
        this.$t('tabs.publications_inside.publications'),
        this.$t('tabs.publications_inside.articles'),
        this.$t('tabs.publications_inside.photo'),
        this.$t('tabs.publications_inside.video'),
        this.$t('tabs.publications_inside.audio')
      ]
    }
  }
}
</script>

<style scoped>
.publication-top__layer {
  display: flex;
  justify-content: center;
  width: 100%;
}

svg {
  color: var(--color-silver-chalice);
}

.modal-open {
  transition: .2s;
  overflow: hidden;
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

.publication__main--block {
  display: flex;
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
