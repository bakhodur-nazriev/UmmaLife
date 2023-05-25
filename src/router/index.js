import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue'
import TermsView from '../views/TermsView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import ContactsView from '../views/ContactsView.vue'
import AboutUs from '../views/AboutUs.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicyView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUs
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes
})

export default router
