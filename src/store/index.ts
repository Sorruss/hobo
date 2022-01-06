import { createStore } from 'vuex'

import { employeeModule } from '@/store/employeeModule'


export default createStore({
  modules: {
    employeeModule
  }
})