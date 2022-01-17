import router from '@/router'

export const employeeModule = {
  namespaced: true,
  state: {
    employees: [
      {
        id: 1, 
        position: 'Программист', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {},
        history: []
      },
      {
        id: 2, 
        position: 'Водитель', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {},
        history: []
      },
      {
        id: 3, 
        position: 'Механик', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {},
        history: []
      },
      {
        id: 4, 
        position: 'Токарь', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {},
        history: []
      }
    ],
    settings: [
      {
        id: 1,
        title: 'Питание',
        translation: 'nutrition',
        variants: ['на молоке', 'диета', 'мясо', 'голуби']
      },
      {
        id: 2,
        title: 'Отдых',
        translation: 'relaxation',
        variants: ['геншин', 'танки', 'ютуб', 'голуби']
      },
      {
        id: 3,
        title: 'Лечение',
        translation: 'treatment',
        variants: ['наркоз', 'сон', 'мясо', 'голуби']
      }
    ],
    yearCounter: 0
  },
  getters: {},
  mutations: {
    setSetting(state: any, setting: any) {
      Object.assign(state.employees[setting[0] - 1].settings, setting[1])
    },
    setYearCounter(state: any, newVal: number) {
      state.yearCounter = newVal
    },
    setWorkers(state:any, workers:any){
      for(let worker in workers){
        state.employees[worker].position=workers[worker];
      }
    }
  },
  actions: {
    nextYear({ state, commit } : { state: any, commit: any }) {
      for (let employee of state.employees) {
        employee.history.push(Object.assign({}, employee.settings))
      }

      if (state.yearCounter >= 14) {
        commit('setGameStarted', false, {root: true})
        commit('setGameFinished', true, {root: true})
        commit('setYearCounter', 0)
        router.push({name: 'ResultReport'})
        return
      }
      commit('setYearCounter', state.yearCounter + 1)
    },
    clearHistories({ state } : { state: any }) {
      for (let employee of state.employees) {
        employee.history = []
      }
    },
    clearSettings({ state } : { state: any }) {
      for (let employee of state.employees) {
        employee.settings = {}
      }
    }
  }
}
