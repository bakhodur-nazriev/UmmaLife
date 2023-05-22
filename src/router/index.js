import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue'
import ConditionsView from '../views/ConditionsView.vue'

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
    path: '/conditions',
    name: 'conditions',
    component: ConditionsView
  },
  {
    path: '/politic',
    name: 'politic',
    component: ForgotPasswordView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ForgotPasswordView
  },
  {
    path: '/about',
    name: 'about',
    component: ForgotPasswordView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
