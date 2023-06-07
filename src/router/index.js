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
import SettingsView from '@/views/SettingsView.vue'

const isProduction = process.env.NODE_ENV === 'production'

const baseDomain = isProduction ? 'front1.ummalife.dev' : 'localhost'

const routes = [
  {
    path: '/:lang?/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/:lang?/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/:lang?/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/:lang?/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/:lang?/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      title: 'Terms'
    }
  },
  {
    path: '/:lang?/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
    meta: {
      title: 'Privacy Policy'
    }
  },
  {
    path: '/:lang?/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: {
      title: 'Contacts'
    }
  },
  {
    path: '/:lang?/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      title: 'About Us'
    }
  },
  {
    path: '/:lang?/articles',
    name: 'articles',
    component: ArticlesView,
    meta: {
      title: 'Articles'
    }
  },
  {
    path: '/:lang?/library',
    name: 'library',
    component: LibraryView,
    meta: {
      title: 'Library'
    }
  },
  {
    path: '/:lang?/marriage-agency',
    name: 'marriage-agency',
    component: MarriageAgencyView,
    meta: {
      title: 'Marriage Agency'
    }
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView,
    meta: {
      title: 'My Albums'
    }
  },
  {
    path: '/:lang?/messenger',
    name: 'messenger',
    component: MessengerView,
    meta: {
      title: 'Messenger'
    }
  },
  {
    path: '/:lang?/my-audio',
    name: 'my-audio',
    component: MyAudiosView,
    meta: {
      title: 'My Audio'
    }
  },
  {
    path: '/:lang?/my-groups',
    name: 'my-groups',
    component: MyGroupsView,
    meta: {
      title: 'My Groups'
    }
  },
  {
    path: '/:lang?/my-page',
    name: 'my-page',
    component: MyPageView,
    meta: {
      title: 'My Page'
    }
  },
  {
    path: '/:lang?/news',
    name: 'news',
    component: NewsView,
    meta: {
      title: 'News'
    }
  },
  {
    path: '/:lang?/saved',
    name: 'saved',
    component: SavedView,
    meta: {
      title: 'Saved'
    }
  },
  {
    path: '/:lang?/video',
    name: 'video',
    component: VideoView,
    meta: {
      title: 'Video'
    }
  },
  {
    path: '/:lang?/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
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
    return next(`/${lang}${pathWithoutLang}`)
  }

  document.title = `${to.meta.title}`

  return next()
})

export default router
