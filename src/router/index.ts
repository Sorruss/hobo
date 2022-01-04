import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/game_step',
    name: 'game_start',
    component: () => import('@/views/EmployeeManag.vue')
  },
  {
    path: '/choose',
    name: 'EmployeeChoose',
    component: () => import('@/views/EmployeeChoose.vue')
  },
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})