import { createStore } from 'vuex'

import { employeeModule } from '@/store/employeeModule'
import { navigationModule } from '@/store/navigationModule'
import { chooseLocationModule } from '@/store/chooseLocationModule'


export default createStore({
  state: {
    gameStarted: false,
    isAuth: false
  },
  mutations: {
    setGameStarted(state, newVal:boolean) {
      state.gameStarted = newVal
    },
    setIsAuth(state, newVal:boolean) {
      state.isAuth = newVal
    }
  },
  modules: {
    employeeModule,
    navigationModule,
    chooseLocationModule
  }
})