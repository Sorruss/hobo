import { createStore } from 'vuex'

import { employeeModule } from '@/store/employeeModule'
import { navigationModule } from '@/store/navigationModule'
import { chooseLocationModule } from '@/store/chooseLocationModule'


export default createStore({
  state: {
    gameStarted: false,
    gameFinished: false,
    isAuth: false
  },
  mutations: {
    setGameStarted(state: any, newVal:boolean): void {
      state.gameStarted = newVal
    },
    setIsAuth(state: any, newVal:boolean): void {
      state.isAuth = newVal
    },
    setGameFinished(state: any, newVal:boolean): void {
      state.gameFinished = newVal
    }
  },
  modules: {
    employeeModule,
    navigationModule,
    chooseLocationModule
  }
})