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

for (const route of routes) {
  route.meta = {
    progress: {
      func: [
        { call: 'color', modifier: 'temp', argument: '#ffb000' },
        { call: 'fail', modifier: 'temp', argument: '#6e0000' },
        { call: 'location', modifier: 'temp', argument: 'top' },
        {
          call: 'transition',
          modifier: 'temp',
          argument: {speed: '1.5s', opacity: '0.6s', termination: 400}
        }
      ]
    }
  }
}

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})