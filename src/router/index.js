/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
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
import SettingsView from '@/views/SettingsView.vue'

const isProduction = process.env.NODE_ENV === 'production'
const baseDomain = isProduction ? 'front1.ummalife.dev' : 'localhost'

const routes = [
  {
    path: '/:lang?/',
    name: 'home',
    component: HomeView,
    meta: {
      title: i18n.global.t('meta_title.home')
    }
  },
  {
    path: '/:lang?/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: i18n.global.t('meta_title.login')
    }
  },
  {
    path: '/:lang?/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: i18n.global.t('meta_title.register')
    }
  },
  {
    path: '/:lang?/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: {
      title: i18n.global.t('meta_title.forgot_password')
    }
  },
  {
    path: '/:lang?/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      title: i18n.global.t('meta_title.terms')
    }
  },
  {
    path: '/:lang?/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
    meta: {
      title: i18n.global.t('meta_title.privacy_policy')
    }
  },
  {
    path: '/:lang?/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: {
      title: i18n.global.t('meta_title.contacts')
    }
  },
  {
    path: '/:lang?/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      title: i18n.global.t('meta_title.about_us')
    }
  },
  {
    path: '/:lang?/articles',
    name: 'articles',
    component: ArticlesView,
    meta: {
      title: i18n.global.t('meta_title.articles')
    }
  },
  {
    path: '/:lang?/library',
    name: 'library',
    component: LibraryView,
    meta: {
      title: i18n.global.t('meta_title.library')
    }
  },
  {
    path: '/:lang?/marriage-agency',
    name: 'marriage-agency',
    component: MarriageAgencyView,
    meta: {
      title: i18n.global.t('meta_title.marriage_agency')
    }
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView,
    meta: {
      title: i18n.global.t('meta_title.my_albums')
    }
  },
  {
    path: '/:lang?/messenger',
    name: 'messenger',
    component: MessengerView,
    meta: {
      title: i18n.global.t('meta_title.messenger')
    }
  },
  {
    path: '/:lang?/my-audio',
    name: 'my-audio',
    component: MyAudiosView,
    meta: {
      title: i18n.global.t('meta_title.my_audio')
    }
  },
  {
    path: '/:lang?/my-groups',
    name: 'my-groups',
    component: MyGroupsView,
    meta: {
      title: i18n.global.t('meta_title.my_groups')
    }
  },
  {
    path: '/:lang?/my-page',
    name: 'my-page',
    component: MyPageView,
    meta: {
      title: i18n.global.t('meta_title.my_page')
    }
  },
  {
    path: '/:lang?/news',
    name: 'news',
    component: NewsView,
    meta: {
      title: i18n.global.t('meta_title.news')
    }
  },
  {
    path: '/:lang?/saved',
    name: 'saved',
    component: SavedView,
    meta: {
      title: i18n.global.t('meta_title.saved')
    }
  },
  {
    path: '/:lang?/video',
    name: 'video',
    component: VideoView,
    meta: {
      title: i18n.global.t('meta_title.video')
    }
  },
  {
    path: '/:lang?/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: i18n.global.t('meta_title.settings')
    }
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
    return next({ path: `/${lang}${pathWithoutLang}`, params: { lang } })
  }

  document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`

  return next()
})

export default router
