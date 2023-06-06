import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
import { supportedLanguages } from '@/constants'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue'
import TermsView from '../views/TermsView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import ContactsView from '../views/ContactsView.vue'
import AboutUs from '../views/AboutUsView.vue'
import MessengerView from '@/views/MessengerView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import LibraryView from '@/views/LibraryView.vue'
import MarriageAgencyView from '@/views/MarriageAgencyView.vue'
import MyAlbumsView from '@/views/MyAlbumsView.vue'
import MyAudiosView from '@/views/MyAudiosView.vue'
import MyGroupsView from '@/views/MyGroupsView.vue'
import MyPageView from '@/views/MyPageView.vue'
import NewsView from '@/views/NewsView.vue'
import SavedView from '@/views/SavedView.vue'
import VideoView from '@/views/VideoView.vue'

const isProduction = process.env.NODE_ENV === 'production'

const baseDomain = isProduction ? 'front1.ummalife.dev' : 'localhost'

const routes = [
  {
    path: '/:lang?/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/:lang?/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:lang?/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/:lang?/terms',
    name: 'terms',
    component: TermsView
  },
  {
    path: '/:lang?/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView
  },
  {
    path: '/:lang?/contacts',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/:lang?/about-us',
    name: 'about-us',
    component: AboutUs
  },
  {
    path: '/:lang?/articles',
    name: 'articles',
    component: ArticlesView
  },
  {
    path: '/:lang?/library',
    name: 'library',
    component: LibraryView
  },
  {
    path: '/:lang?/marriage-agency',
    name: 'marriage-agency',
    component: MarriageAgencyView
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView
  },
  {
    path: '/:lang?/messenger',
    name: 'messenger',
    component: MessengerView
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView
  },
  {
    path: '/:lang?/my-audios',
    name: 'my-audios',
    component: MyAudiosView
  },
  {
    path: '/:lang?/my-groups',
    name: 'my-groups',
    component: MyGroupsView
  },
  {
    path: '/:lang?/my-page',
    name: 'my-page',
    component: MyPageView
  },
  {
    path: '/:lang?/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/:lang?/saved',
    name: 'saved',
    component: SavedView
  },
  {
    path: '/:lang?/video',
    name: 'video',
    component: VideoView
  }
]

if (isProduction) {
  routes.forEach(route => {
    route.path = `/${baseDomain}${route.path}`
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || i18n.global.locale.value

  if (supportedLanguages.includes(lang)) {
    // Установка языка для i18n
    i18n.global.locale = lang
  } else {
    // Если указанный язык не поддерживается, перенаправляем на язык по умолчанию
    const defaultLang = i18n.global.locale || 'ru'
    return next(`/${defaultLang}${to.path}`)
  }

  // Если язык в URL не совпадает с текущим языком, перенаправляем на правильный URL
  if (to.params.lang !== lang) {
    const pathWithoutLang = to.path.replace(`/${to.params.lang}`, `/${lang}`)
    return next(`/${lang}${pathWithoutLang}`)
  }

  return next()
})

export default router
