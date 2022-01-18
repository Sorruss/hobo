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
    setGameStarted(state: any, payload: boolean): void {
      state.gameStarted = payload
    },
    setIsAuth(state: any, payload: boolean): void {
      state.isAuth = payload
    },
    setGameFinished(state: any, payload: boolean): void {
      state.gameFinished = payload
    }
  },
  modules: {
    employeeModule,
    navigationModule,
    chooseLocationModule
  }
})