import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
import { supportedLanguages } from '@/constants'
import HomeView from '@/views/HomeView.vue'
import LoginByEmailView from '@/views/Auth/Login/LoginByEmailView.vue'
import LoginByPhoneStep1View from '@/views/Auth/Login/LoginByPhoneStep1View.vue'
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/Auth/ResetPasswordView.vue'
import TermsView from '@/views/TermsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AboutUs from '@/views/AboutUsView.vue'
import MessengerView from '@/views/messenger/MessengerView.vue'
import MessengerChatView from '@/views/messenger/MessengerChatView.vue'
import MessengerEmptyView from '@/views/messenger/MessengerEmptyView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import LibraryView from '@/views/library/LibraryView.vue'
import LibraryDetailView from '@/views/library/LibraryDetailView.vue'
import LibraryBookView from '@/views/library/LibraryBookView.vue'
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
import MuviView from '@/views/muvi/MuviView.vue'
import MuviDetail from '@/views/muvi/MuviDetail.vue'
import PopularMuvi from '@/views/muvi/PopularMuvi.vue'
import AddMuvi from '@/views/muvi/AddMuvi.vue'
import AudioMuvi from '@/views/muvi/AudioMuvi.vue'
import ProfileMuvi from '@/views/muvi/ProfileMuvi.vue'
import ActivityMuvi from '@/views/muvi/ActivityMuvi.vue'
import CategoryMuvi from '@/views/muvi/CategoryMuvi.vue'
import VideoSingleViewVue from '@/views/VideoSingleView.vue'
import PreviewArticleView from '@/views/PreviewArticleView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import LoginByPhoneStep2View from '@/views/Auth/Login/LoginByPhoneStep2View.vue'
import RegisterAddEmailStep1View from '@/views/Auth/Register/RegisterAddEmailStep1View.vue'
import RegisterConfirmEmailStep2View from '@/views/Auth/Register/RegisterConfirmEmailStep2View.vue'
import RegisterCreatePasswordStep3View from '@/views/Auth/Register/RegisterCreatePasswordStep3View.vue'
import RegisterAddInfoStep4View from '@/views/Auth/Register/RegisterAddInfoStep4View.vue'
import RegisterAddPhoneStep5View from '@/views/Auth/Register/RegisterAddPhoneStep5View.vue'
import RegisterCategoryInterestsStep6View from '@/views/Auth/Register/RegisterCategoryInterestsStep6View.vue'
import { getFormData } from '@/utils'
import axios from 'axios'

const isProduction = import.meta.env.NODE_ENV === 'production'
const baseDomain = isProduction ? 'front1.ummalife.dev' : 'localhost'

const routes = [
  {
    path: '/:lang?/',
    name: 'home',
    component: HomeView,
    meta: {
      title: i18n.global.t('meta_title.home'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/login-by-email',
    name: 'LoginByEmailView',
    component: LoginByEmailView,
    meta: {
      title: i18n.global.t('meta_title.login.by_email'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/login-by-phone',
    children: [
      {
        path: '',
        name: 'LoginByPhoneStep1View',
        component: LoginByPhoneStep1View,
        meta: {
          title: i18n.global.t('meta_title.login.by_phone_step1'),
          requiresAuth: false,
          layout: 'auth'
        }
      },
      {
        path: 'step2',
        name: 'LoginByPhoneStep2View',
        component: LoginByPhoneStep2View,
        meta: {
          title: i18n.global.t('meta_title.login.confirm_phone_step2'),
          requiresAuth: false,
          layout: 'auth'
        }
      }
    ]
  },
  {
    path: '/:lang?/register',
    children: [
      {
        path: '',
        name: 'RegisterAddEmailStep1View',
        component: RegisterAddEmailStep1View,
        meta: {
          title: i18n.global.t('meta_title.register.add_email_step1'),
          requiresAuth: false,
          layout: 'auth'
        }
      },
      {
        path: 'step2',
        name: 'RegisterConfirmEmailStep2View',
        component: RegisterConfirmEmailStep2View,
        meta: {
          title: i18n.global.t('meta_title.register.confirm_email_step2'),
          requiresAuth: false,
          layout: 'auth'
        }
      },
      {
        path: 'step3',
        name: 'RegisterCreatePasswordStep3View',
        component: RegisterCreatePasswordStep3View,
        beforeEnter: (to, from, next) => {
          const userEmail = localStorage.getItem('email')
          if (!userEmail) {
            next('/register')
          } else {
            next()
          }
        },
        meta: {
          title: i18n.global.t('meta_title.register.create_password_step3'),
          requiresAuth: false,
          layout: 'auth'
        }
      },

      {
        path: '/:lang?/news',
        name: 'news',
        component: NewsView,
        meta: {
          title: i18n.global.t('meta_title.news'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: '/:lang?/saved',
        name: 'saved',
        component: SavedView,
        meta: {
          title: i18n.global.t('meta_title.saved'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: '/:lang?/video',
        name: 'video',
        component: VideoView,
        meta: {
          title: i18n.global.t('meta_title.video'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: '/:lang?/settings',
        name: 'settings',
        component: SettingsView,
        meta: {
          title: i18n.global.t('meta_title.settings'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: '/:lang?/muvi',
        name: 'muvi',
        component: MuviView,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/:id',
        name: 'muvi-detail',
        component: MuviDetail,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },

      {
        path: '/:lang?/muvi/popular',
        name: 'muvi-popular',
        component: PopularMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/add',
        name: 'muvi-add',
        component: AddMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/activity',
        name: 'muvi-activity',
        component: ActivityMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/profile',
        name: 'muvi-profile',
        component: ProfileMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/audio/:id',
        name: 'muvi-audio',
        component: AudioMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: '/:lang?/muvi/category/:id',
        name: 'muvi-category',
        component: CategoryMuvi,
        meta: {
          title: i18n.global.t('meta_title.muvi'),
          requiresAuth: true,
          layout: 'muvi'
        }
      },
      {
        path: 'step4',
        name: 'RegisterAddInfoStep4View',
        component: RegisterAddInfoStep4View,
        meta: {
          title: i18n.global.t('meta_title.register.add_info_step4'),
          requiresAuth: false,
          layout: 'auth'
        }
      },
      {
        path: 'step5',
        name: 'RegisterAddPhoneStep5View',
        component: RegisterAddPhoneStep5View,
        meta: {
          title: i18n.global.t('meta_title.register.add_phone_step5'),
          requiresAuth: false,
          layout: 'auth'
        }
      },
      {
        path: 'step6',
        name: 'RegisterCategoryInterestsStep6View',
        component: RegisterCategoryInterestsStep6View,
        meta: {
          title: i18n.global.t('meta_title.register.category_interests_step6'),
          requiresAuth: false,
          layout: 'auth'
        }
      }
    ]
  },
  {
    path: '/:lang?/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: {
      title: i18n.global.t('meta_title.forgot_password'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/reset-password',
    name: 'ResetPasswordView',
    component: ResetPasswordView,
    meta: {
      title: i18n.global.t('meta_title.reset_password'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      title: i18n.global.t('meta_title.terms'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView,
    meta: {
      title: i18n.global.t('meta_title.privacy_policy'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: {
      title: i18n.global.t('meta_title.contacts'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      title: i18n.global.t('meta_title.about_us'),
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:lang?/articles',
    name: 'articles',
    component: ArticlesView,
    meta: {
      title: i18n.global.t('meta_title.articles'),
      requiresAuth: true,
      layout: 'main'
    },
    children: [
      {
        path: ':id',
        name: 'show-article',
        component: ShowArticlesView,
        meta: {
          title: i18n.global.t('meta_title.show_article'),
          requiredAuth: true,
          layout: 'main'
        }
      },
      {
        path: ':id',
        name: 'preview-article',
        component: PreviewArticleView,
        meta: {
          title: i18n.global.t('meta_title.preview_article'),
          requiresAuth: true,
          layout: 'main'
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
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/library/:id',
    name: 'library-detail',
    component: LibraryDetailView,
    meta: {
      title: i18n.global.t('meta_title.library'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/library/:id/read',
    name: 'library-book-read',
    component: LibraryBookView,
    meta: {
      title: i18n.global.t('meta_title.library'),
      requiresAuth: true,
      layout: 'library'
    }
  },
  {
    path: '/:lang?/video/:id',
    name: 'video-detail',
    component: UmmaVideoDetailVue,
    meta: {
      title: i18n.global.t('meta_title.video'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/video-page/:id',
    name: 'video-page-single',
    component: VideoSingleViewVue,
    meta: {
      title: i18n.global.t('meta_title.video'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/marriage-agency',
    name: 'marriage-agency',
    component: MarriageAgencyView,
    meta: {
      title: i18n.global.t('meta_title.marriage_agency'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/my-albums',
    name: 'my-albums',
    component: MyAlbumsView,
    meta: {
      title: i18n.global.t('meta_title.my_albums'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/messenger',
    name: 'messenger',
    component: MessengerView,
    meta: {
      title: i18n.global.t('meta_title.messenger'),
      requiresAuth: true,
      layout: 'main'
    },
    children: [
      {
        path: ':id',
        name: 'messenger-chat',
        component: MessengerChatView,
        meta: {
          title: i18n.global.t('meta_title.messenger'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: '',
        name: 'messenger-empty',
        component: MessengerEmptyView,
        meta: {
          title: i18n.global.t('meta_title.messenger'),
          requiresAuth: true,
          layout: 'main'
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
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/my-groups',
    name: 'my-groups',
    component: MyGroupsView,
    meta: {
      title: i18n.global.t('meta_title.my_groups'),
      requiresAuth: true,
      layout: 'main'
    },
    children: [
      {
        path: '',
        name: 'my-groups-container',
        component: MyGroupsContainer,
        meta: {
          title: i18n.global.t('meta_title.my_groups'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: 'settings',
        name: 'my-groups-settings',
        component: MyGroupsSettings,
        meta: {
          title: i18n.global.t('meta_title.my_groups'),
          requiresAuth: true,
          layout: 'main'
        }
      },
      {
        path: ':id',
        name: 'my-groups-details',
        component: MyGroupsDetails,
        meta: {
          title: i18n.global.t('meta_title.my_groups'),
          requiresAuth: true,
          layout: 'main'
        },
        children: [
          {
            path: '',
            name: 'my-groups-publications',
            component: MyGroupsPublications,
            meta: {
              title: i18n.global.t('meta_title.my_groups'),
              requiresAuth: true,
              layout: 'main'
            }
          },
          {
            path: 'users',
            name: 'my-groups-users',
            component: MyGroupsUsers,
            meta: {
              title: i18n.global.t('meta_title.my_groups'),
              requiresAuth: true,
              layout: 'main'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:lang?/:profile_name',
    name: 'my-page',
    component: MyPageView,
    meta: {
      title: i18n.global.t('meta_title.my_page'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-all-recommendations',
    name: 'all-recommendations',
    component: SearchAllRecommendationsView,
    meta: {
      title: i18n.global.t('meta_title.search.all-recommendations'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-people',
    name: 'people',
    component: SearchPeopleView,
    meta: {
      title: i18n.global.t('meta_title.search.people'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-groups',
    name: 'search-groups',
    component: SearchGroupsView,
    meta: {
      title: i18n.global.t('meta_title.search.groups'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-muvi',
    name: 'search-muvi',
    component: SearchMUVIView,
    meta: {
      title: i18n.global.t('meta_title.search.muvi'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-article',
    name: 'search-article',
    component: SearchArticleView,
    meta: {
      title: i18n.global.t('meta_title.search.article'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-video',
    name: 'search-video',
    component: SearchVideoView,
    meta: {
      title: i18n.global.t('meta_title.search.video'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-audio',
    name: 'search-audio',
    component: SearchAudioView,
    meta: {
      title: i18n.global.t('meta_title.search.audio'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/search-hashtags',
    name: 'search-hashtags',
    component: SearchHashtagsView,
    meta: {
      title: i18n.global.t('meta_title.search.hashtags'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/news',
    name: 'news',
    component: NewsView,
    meta: {
      title: i18n.global.t('meta_title.news'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/saved',
    name: 'saved',
    component: SavedView,
    meta: {
      title: i18n.global.t('meta_title.saved'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/video',
    name: 'video',
    component: VideoView,
    meta: {
      title: i18n.global.t('meta_title.video'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: i18n.global.t('meta_title.settings'),
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    path: '/:lang?/muvi',
    name: 'muvi',
    component: MuviView,
    meta: {
      title: i18n.global.t('meta_title.muvi'),
      requiresAuth: true,
      layout: 'another'
    }
  },
  {
    path: '/:lang?/notifications',
    name: 'notifications',
    component: NotificationsView,
    meta: {
      title: i18n.global.t('meta_title.muvi'),
      requiresAuth: true,
      layout: 'main'
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
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  mode: 'history',
  routes
})

const isUserAuthenticated = () => {
  const accessToken = localStorage.getItem('access_token')
  return !!accessToken
}
const checkResetPasswordLink = async (email, code) => {
  const payload = getFormData({
    server_key: import.meta.env.VITE_SERVER_KEY,
    email: email,
    code: code
  })

  const headers = { 'Content-Type': 'multipart/form-data' }

  try {
    const response = await axios.post('/check-reset-password-link', payload, { headers })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

router.beforeEach(async (to, from, next) => {
  const lang = to.params.lang || i18n.global.locale.value
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth)

  const link1Param = to.query.link1
  if (link1Param === 'reset-password') {
    const email = to.query.email || ''
    const code = to.query.code || ''

    localStorage.setItem('resetPasswordEmail', email)
    localStorage.setItem('resetPasswordCode', code)

    try {
      const response = await checkResetPasswordLink(email, code)

      if (response.data.api_status === 200) {
        return next({ name: 'ResetPasswordView', query: { email, code } })
      } else {
        return next({ name: 'LoginByEmailView' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (supportedLanguages.includes(lang)) {
    i18n.global.locale = lang
  } else {
    const defaultLang = i18n.global.locale || 'ru'
    return next(`/${defaultLang}${to.path}`)
  }

  if (to.params.lang !== lang) {
    const pathWithoutLang = to.path.replace(`/${to.params.lang}`, `/${lang}`)
    return next({
      path: `/${lang}${pathWithoutLang}`,
      params: { lang }
    })
  }

  document.title = `${to.meta.title} | ${import.meta.env.VITE_TITLE}`

  const isAuthenticated = isUserAuthenticated() // Проверка авторизации в localStorage

  const allowedRoutes = ['login-by-email', 'register', 'forgot-password']

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'LoginByEmailView' })
  }

  if (isAuthenticated && to.name === 'home') {
    return next({ name: 'news' })
  }

  if (!isAuthenticated && allowedRoutes.includes(to.name)) {
    return next()
  }

  return next()
})

export default router
