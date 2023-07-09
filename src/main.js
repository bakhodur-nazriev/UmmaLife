/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import i18n from './i18n'
import store from '@/store/store'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
/*import '@/assets/styles.scss'*/
// import { createMetaManager } from 'vue-meta'
import draggable from 'vuedraggable'

const app = createApp(App)
// const metaManager = app.use(createMetaManager)

app.config.globalProperties.$route = {}
app.use(draggable)
app.use(i18n)
app.use(router)
app.use(store)
app.use(VueTelInput)
// app.use(metaManager)
app.mount('#app')
