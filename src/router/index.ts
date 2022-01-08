import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/game_step',
    name: 'GameStart',
    component: () => import('@/views/EmployeeManag.vue')
  },
  {
    path: '/choose-location',
    name: 'EmployeeChoose',
    component: () => import('@/views/EmployeeChoose.vue')
  },
  {
    path: '/result-report',
    name: 'ResultReport',
    component: () => import('@/views/ResultReport.vue')
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})