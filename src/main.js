import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import i18n from './i18n'
import store from '@/store/store'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

createApp(App)
  .use(i18n)
  .use(router)
  .use(store)
  .use(VueTelInput)
  .mount('#app')
