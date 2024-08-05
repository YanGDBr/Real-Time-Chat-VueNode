import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import DownloadView from '../views/DownloadView.vue'
import ChatView from '../views/ChatView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ChatView
  },
  {
    path: '/login/:pre',
    name: 'login',
    component: LoginView
  },
  {
    path: '/download',
    name: 'download',
    component: DownloadView
  },
  {
    path: '/userconfig',
    name: 'userconfig',
    component: UserView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
