<template>
  <component :is="layout" v-if="this.$route.meta.layout !== 'muvi'">
    <router-view></router-view>
  </component>
  <router-view v-else/>
  <div class="player" v-on-click-outside="closeHandler">
    <AudioPlayList v-if="isListOpen" :playerHeight="playerMargin"/>
    <AudioPlayerComponent @playerHeight="setPlayerMargin" v-if="isPlayerOpen"/>
  </div>
</template>

<script>
import MainLayout from '@/components/layouts/MainLayout.vue'
import AuthLayout from '@/components/layouts/LayoutAuth.vue'
import AudioPlayerComponent from '@/components/audio/AudioPlayerComponent.vue'
import MuviMobileLayout from '@/components/layouts/MuviMobileLayout.vue'
import AudioPlayList from '@/components/audio/AudioPlayList.vue'
import {mapMutations, mapState, useStore} from 'vuex'
import {getFormData} from '@/utils'
import axios from 'axios'

export default {
  components: {
    AudioPlayerComponent,
    AuthLayout,
    MainLayout,
    AudioPlayList,
    MuviMobileLayout
  },
  data() {
    return {
      supportedLanguages: [
        {
          code: 'en',
          title: 'english'
        },
        {
          code: 'ar',
          title: 'arabic'
        },
        {
          code: 'ru',
          title: 'russian'
        },
        {
          code: 'tr',
          title: 'turkish'
        },
        {
          code: 'uz',
          title: 'uzbek'
        },
        {
          code: 'id',
          title: 'indonesia'
        },
        {
          code: 'ms',
          title: 'malay'
        },
        {
          code: 'tj',
          title: 'tajik'
        },
        {
          code: 'tab',
          title: 'tabasaran'
        },
        {
          code: 'cv',
          title: 'chuvash'
        },
        {
          code: 'ur',
          title: 'urdu'
        },
        {
          code: 'inh',
          title: 'ingush'
        },
        {
          code: 'tt',
          title: 'tatar'
        },
        {
          code: 'lak',
          title: 'lak'
        },
        {
          code: 'kum',
          title: 'qumuq'
        },
        {
          code: 'krc',
          title: 'balkarian'
        },
        {
          code: 'am',
          title: 'amharic'
        },
        {
          code: 'lez',
          title: 'lezgin'
        }
      ]
    }
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'auth'}-layout`
    },
    isAuthPage() {
      const authRoutes = ['login', 'register', 'forgot-password']
      return authRoutes.includes(this.$route.name)
    },
    authLayout() {
      return this.isAuthPage ? 'AuthLayout' : 'MainLayout'
    },
    mainLayout() {
      return 'MainLayout'
    },
    ...mapState('audio', ['isPlayerOpen', 'isListOpen']),
    ...mapState(['playerMargin']),
  },
  methods: {
    ...mapMutations(['setPlayerMargin']),
    getUserLanguageTitle(languageCode) {
      const language = this.supportedLanguages.find(lang => lang.code === languageCode);
      return language ? language.title : '';
    },
    async setUserLanguage() {
      let userLanguage = null;
      const userData = JSON.parse(localStorage.getItem('user') || '{}');

      if (!userData || userData.language === null || userData.language === undefined) {
        const currentLocaleCode = this.$i18n.locale.split('-')[0];
        userLanguage = this.getUserLanguageTitle(currentLocaleCode);
      } else {
        userLanguage = userData.language;
      }

      let userLanguageTitle = userLanguage;

      if (userLanguage !== null) {
        const foundLanguage = this.supportedLanguages.find(lang => lang.code === userLanguage);
        if (foundLanguage) {
          userLanguageTitle = foundLanguage.title;
        }
      }

      const payload = getFormData({
        server_key: process.env.VUE_APP_SERVER_KEY,
        language: userLanguageTitle
      });

      const headers = {'Content-Type': 'multipart/form-data'};
      const accessToken = localStorage.getItem('access_token');
      const params = {access_token: accessToken};

      try {
        const response = await axios.post('/update-user-data', payload, {params, headers});
        if (response.data.api_status === 200) {
          // console.log('Language updated successfully');
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
  }
}
</script>

<script setup>
import {vOnClickOutside} from '@vueuse/components'

const store = useStore()
const closeHandler = () => {
  store.commit('audio/setListOpen', false)
}
</script>

<style>
@import 'assets/styles.scss';
</style>
