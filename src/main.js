import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import i18n from './i18n'
import store from '@/store/store'
import 'vue-tel-input/vue-tel-input.css'
/*import '@/assets/styles.scss'*/
import VueVideoPlayer from '@videojs-player/vue'
import draggable from 'vuedraggable'
import Vue3TouchEvents from 'vue3-touch-events'
import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
import AudioPlayer from '@liripeng/vue-audio-player'
import './interceptors/axios'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'video.js/dist/video-js.css'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import 'swiper/css'
import 'swiper/css/navigation'

const app = createApp(App)

app.config.globalProperties.$route = {}
app.use(draggable)
app.use(i18n)
app.use(router)
app.use(store)
app.use(VueVideoPlayer)
app.use(Vue3TouchEvents)
app.use(VueStickyDirective)
app.use(AudioPlayer)
app.mount('#app')
