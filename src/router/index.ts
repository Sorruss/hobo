import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})