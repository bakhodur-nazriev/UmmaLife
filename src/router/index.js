/* eslint-disable */
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import i18n from '@/i18n'
import {
  supportedLanguages
} from '@/constants'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue'
import TermsView from '../views/TermsView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import ContactsView from '../views/ContactsView.vue'
import AboutUs from '../views/AboutUsView.vue'
import MessengerView from '@/views/MessengerView.vue'
import MessengerChatView from '@/views/MessengerChatView.vue'
import MessengerEmptyView from '@/views/MessengerEmptyView.vue'
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
import MyGroupsDetails from '@/views/MyGroupsDetails.vue'
import MyGroupsContainer from '@/views/MyGroupsContainer.vue'
import MyGroupsUsers from '@/views/MyGroupsUsers.vue'
import MyGroupsPublications from '@/views/MyGroupsPublications.vue'
import MyGroupsSettings from '@/views/MyGroupsSettings.vue'
import SearchAllRecommendationsView from '@/views/SearchViews/AllRecommendationsView.vue'
import SearchPeopleView from '@/views/SearchViews/PeopleView.vue'
import SearchGroupsView from '@/views/SearchViews/GroupsView.vue'
import SearchMUVIView from '@/views/SearchViews/MUVIView.vue'
import SearchArticleView from '@/views/SearchViews/ArticleView.vue'
import SearchAudioView from '@/views/SearchViews/AudioView.vue'
import SearchVideoView from '@/views/SearchViews/VideoView.vue'
import SearchHashtagsView from '@/views/SearchViews/HashtagsView.vue'
import ShowArticlesView from '@/views/ShowArticlesView.vue'
import UmmaVideoDetailVue from '@/views/UmmaVideoDetail.vue'
import PreviewArticleView from '@/views/PreviewArticleView.vue'

const isProduction = process.env.NODE_ENV === 'production'
const baseDomain = isProduction ? 'front1.ummalife.dev' : 'localhost'

const routes = [{
  path: '/:lang?/',
  name: 'home',
  component: HomeView,
  meta: {
    title: i18n.global.t('meta_title.home'),
    requiresAuth: true
  }
},
  {
    path: '/:lang?/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: i18n.global.t('meta_title.login'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: i18n.global.t('meta_title.register'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: {
      title: i18n.global.t('meta_title.forgot_password'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      title: i18n.global.t('meta_title.terms'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
    meta: {
      title: i18n.global.t('meta_title.privacy_policy'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: {
      title: i18n.global.t('meta_title.contacts'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      title: i18n.global.t('meta_title.about_us'),
      requiresAuth: false
    }
  },
  {
    path: '/:lang?/articles',
    name: 'articles',
    component: ArticlesView,
    meta: {
      title: i18n.global.t('meta_title.articles'),
      requiresAuth: true
    },
    children: [
      {
        path: 'show/:id',
        name: 'show-article',
        component: ShowArticlesView,
        meta: {
          title: i18n.global.t('meta_title.show_article'),
          requiredAuth: true
        }
      },
      {
        path: 'preview/:id',
        name: 'preview-article',
        component: PreviewArticleView,
        meta: {
          title: i18n.global.t('meta_title.preview_article'),
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:lang?/library',
    name: 'library',
    component: LibraryView,
    meta: {
      title: i18n.global.t('meta_title.library'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/video/:id',
    name: 'video-detail',
    component: UmmaVideoDetailVue,
    meta: {
      title: i18n.global.t('meta_title.video'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/marriage-agency',
    name: 'marriage-agency',
    component: MarriageAgencyView,
    meta: {
      title: i18n.global.t('meta_title.marriage_agency'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView,
    meta: {
      title: i18n.global.t('meta_title.my_albums'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/messenger',
    name: 'messenger',
    component: MessengerView,
    meta: {
      title: i18n.global.t('meta_title.messenger'),
      requiresAuth: true
    },
    children: [{
      path: ':id',
      name: 'messenger-chat',
      component: MessengerChatView,
      meta: {
        title: i18n.global.t('meta_title.messenger'),
        requiresAuth: true
      }
    },
      {
        path: '',
        name: 'messenger-empty',
        component: MessengerEmptyView,
        meta: {
          title: i18n.global.t('meta_title.messenger'),
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:lang?/my-audio',
    name: 'my-audio',
    component: MyAudiosView,
    meta: {
      title: i18n.global.t('meta_title.my_audio'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/my-groups',
    name: 'my-groups',
    component: MyGroupsView,
    meta: {
      title: i18n.global.t('meta_title.my_groups'),
      requiresAuth: true
    },
    children: [{
      path: '',
      name: 'my-groups-container',
      component: MyGroupsContainer,
      meta: {
        title: i18n.global.t('meta_title.my_groups'),
        requiresAuth: true
      }
    },
      {
        path: 'settings',
        name: 'my-groups-settings',
        component: MyGroupsSettings,
        meta: {
          title: i18n.global.t('meta_title.my_groups'),
          requiresAuth: true
        }
      },
      {
        path: ':id',
        name: 'my-groups-details',
        component: MyGroupsDetails,
        meta: {
          title: i18n.global.t('meta_title.my_groups'),
          requiresAuth: true
        },
        children: [{
          path: '',
          name: 'my-groups-publications',
          component: MyGroupsPublications,
          meta: {
            title: i18n.global.t('meta_title.my_groups'),
            requiresAuth: true
          }
        },
          {
            path: 'users',
            name: 'my-groups-users',
            component: MyGroupsUsers,
            meta: {
              title: i18n.global.t('meta_title.my_groups'),
              requiresAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:lang?/my-page',
    name: 'my-page',
    component: MyPageView,
    meta: {
      title: i18n.global.t('meta_title.my_page'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-all-recommendations',
    name: 'all-recommendations',
    component: SearchAllRecommendationsView,
    meta: {
      title: i18n.global.t('meta_title.search.all-recommendations'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-people',
    name: 'people',
    component: SearchPeopleView,
    meta: {
      title: i18n.global.t('meta_title.search.people'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-groups',
    name: 'search-groups',
    component: SearchGroupsView,
    meta: {
      title: i18n.global.t('meta_title.search.groups'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-muvi',
    name: 'search-muvi',
    component: SearchMUVIView,
    meta: {
      title: i18n.global.t('meta_title.search.muvi'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-article',
    name: 'search-article',
    component: SearchArticleView,
    meta: {
      title: i18n.global.t('meta_title.search.article'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-video',
    name: 'search-video',
    component: SearchVideoView,
    meta: {
      title: i18n.global.t('meta_title.search.video'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-audio',
    name: 'search-audio',
    component: SearchAudioView,
    meta: {
      title: i18n.global.t('meta_title.search.audio'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/search-hashtags',
    name: 'search-hashtags',
    component: SearchHashtagsView,
    meta: {
      title: i18n.global.t('meta_title.search.hashtags'),
      requiresAuth: true
    }
  },

  {
    path: '/:lang?/news',
    name: 'news',
    component: NewsView,
    meta: {
      title: i18n.global.t('meta_title.news'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/saved',
    name: 'saved',
    component: SavedView,
    meta: {
      title: i18n.global.t('meta_title.saved'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/video',
    name: 'video',
    component: VideoView,
    meta: {
      title: i18n.global.t('meta_title.video'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: i18n.global.t('meta_title.settings'),
      requiresAuth: true
    }
  },
  {
    path: '/:lang?/',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: i18n.global.t('meta_title.settings'),
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      // Перенаправляем пользователя на текущую страницу
      return {
        name: router.currentRoute.value.name,
        params: {
          lang: router.currentRoute.value.params.lang
        }
      }
    }
  }
]

if (isProduction) {
  routes.forEach((route) => {
    route.path = `/${baseDomain}${route.path}`
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

function isUserAuthenticated() {
  // Здесь проверяйте, аутентифицирован ли пользователь
  // Возвращайте true, если пользователь аутентифицирован, иначе false
}

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || i18n.global.locale.value
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)

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
    return next({
      path: `/${lang}${pathWithoutLang}`,
      params: {
        lang
      }
    })
  }

  document.title = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`

  // if (requiresAuth && !isUserAuthenticated()) {
  //   // Если маршрут требует авторизации и пользователь не аутентифицирован, перенаправляем на страницу авторизации
  //   return next({ name: 'login' })
  // }

  // Проверка статуса авторизации
  /*const isAuthenticated = store.getters.getAuthenticated

  // Роуты, на которых разрешено продолжить навигацию для неавторизованных пользователей
  const allowedRoutes = ['login', 'register', 'forgot-password']

  // Если пользователь авторизован, перенаправляем на главную страницу
  if (isAuthenticated) {
    return next('/')
  }

  // Если пользователь не авторизован и находится на разрешенных роутах, разрешаем продолжить навигацию
  if (!isAuthenticated && allowedRoutes.includes(to.name)) {
    return next()
  }

  // Если пользователь не авторизован и находится на других роутах, перенаправляем на страницу входа
  return next('/login')*/

  if (to.name === 'home') {
    return next({
      name: 'news'
    })
  }
  return next()
})

export default router
