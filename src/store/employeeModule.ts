import router from '@/router'

import allEmployees from '@/static/data/employees'
import allSettings from '@/static/data/settings'
import allDozes from '@/static/data/dozes'


export const employeeModule = {
  namespaced: true,
  state: {
    employees: [],
    yearCounter: 0,
    overdozeReport: '',
    overdozeAlertVisible: false,
    gameOver: false
  },
  getters: {},
  mutations: {
    setSetting(state: any, setting: any): void {
      Object.assign(state.employees[setting[0] - 1].selectedSettings, setting[1])
    },
    setYearCounter(state: any, payload: number): void {
      state.yearCounter = payload
    },
    resetEmployees(state: any): void {
      state.employees = []
    },
    setOverdozeAlertVisible(state: any, payload: boolean): void {
      state.overdozeAlertVisible = payload
    },
    setOverdozeReport(state: any, payload: string): void {
      state.overdozeReport = payload
    },
    setOptionalSettings(state: any, overdozeInfo: object[]): void {
      for (const employee of state.employees) {
        employee.optionalSettings = []
      }
      for (const overdoze of overdozeInfo) {
        // @ts-ignore
        state.employees[overdoze.eId - 1].optionalSettings.push({title: overdoze.dozeTrans, variants: Object.keys(allDozes[overdoze.title].treatmentWays)})
      }
    },
    setGemeOver(state: any, payload: boolean): void {
      state.gameOver = payload
    },
    pushSelected2History(_: any, employee: any): void {
      employee.history.push(Object.assign({}, employee.selectedSettings))
    },
    updateEmployeeState(_: any, employee: any): void {
      let settingType = null
      for (const setting of Object.keys(employee.settings)) {
        // @ts-ignore
        settingType = allSettings[setting].type
        if (settingType === 'mp') {
          
        } else if (settingType === 'mm') {

        } else if (settingType === 'pm') {
          
        } else {
          throw new Error(`Unknown setting type "${settingType}", choose one from "mp|mm|pm"`)
        }
      }
    }
  },
  actions: {
    nextYear({ state, commit, dispatch }: any): void {
      for (const employee of state.employees) {
        commit('updateEmployeeState', employee)
        commit('pushSelected2History', employee)
      }

      if (state.yearCounter >= 14) {
        commit('setGameStarted', false, {root: true})
        commit('setGameFinished', true, {root: true})
        commit('setYearCounter', 0)
        router.push({name: 'ResultReport'})
        return
      }
      commit('setYearCounter', state.yearCounter + 1)

      dispatch('dozesIncrement')
    },
    clearHistories({ state } : { state: any }): void {
      for (let employee of state.employees) {
        employee.history = []
      }
    },
    clearSettings({ state } : { state: any }): void {
      for (let employee of state.employees) {
        employee.settings = {}
      }
    },
    setEmployees({ state, commit }: any, employees: Array<string>): void {
      commit('resetEmployees')
      let id = 1
      let dozes
      for (const employee of employees) {
        state.employees.push({
          id: id,
          state: {hp: 100, vision: 100, hearing: 100}, 
          selectedSettings: {},
          history: [],
          optionalSettings: [],
          // @ts-ignore
          ...JSON.parse(JSON.stringify(allEmployees[employee]))
        })
        dozes = state.employees[id - 1].dozes
        if (dozes) {
          for (let doze of Object.keys(dozes)) {
            state.employees[id - 1].dozes[doze] = {
              increment: dozes[doze],
              state: 0
            }
          }
        }
        id++
      }
    },
    dozesIncrement({ state, dispatch }: any): void {
      const overdozes = []
      for (const employee of state.employees) {
        if (employee.dozes) {
          for (const doze of Object.keys(employee.dozes)) {
            employee.dozes[doze].state += employee.dozes[doze].increment
            // @ts-ignore
            if ((employee.dozes[doze].state + employee.dozes[doze].increment) > allDozes[doze].threshold) {
              // @ts-ignore
              employee.state.hp -= allDozes[doze].damage
              dispatch('checkEmployeeState')
            }
            // @ts-ignore
            if ((employee.dozes[doze].state + employee.dozes[doze].increment) >= allDozes[doze].threshold * 0.8) {
              // @ts-ignore
              overdozes.push({eId: employee.id, dozeTrans: allDozes[doze].translation, title: doze})
            }
          }
        }
      }
      dispatch('overdozeAlert', overdozes)
    },
    overdozeAlert({ state, commit }: any, overdozeInfo: Array<any>): void {
      let report
      const overdozes: any = {}
      for (let overdoze of overdozeInfo) {
        overdozes[state.employees[overdoze.eId - 1].translation] = []
      }
      for (let overdoze of overdozeInfo) {
        overdozes[state.employees[overdoze.eId - 1].translation].push(overdoze.dozeTrans)
      }
      const emps = Object.keys(overdozes)
      if (emps.length > 1) {
        report = `У середовищі праці Ваших робітників ${emps.join(', ')} значення ${Object.values(overdozes).join(', ')} відповідно перевищили допустимих 80%.`
      } else {
        if (overdozes[emps[0]].length > 1) {
          report = `У середовищі праці Вашого робітника ${emps[0]} значення ${overdozes[emps[0]].join(', ')} перевищили допустимих 80%.`
        } else {
          report = `У середовищі праці Вашого робітника ${emps[0]} значення ${overdozes[emps[0]][0]} перевищило допустимих 80%.`
        }
      }

      commit('setOverdozeAlertVisible', true)
      commit('setOverdozeReport', report)
      commit('setOptionalSettings', overdozeInfo)
    },
    changeEnding(_: any, word: string): string | void {
      if (word.endsWith('ий')) {
        return word.slice(0, word.length - 2) + 'ого'
      } else if (word.endsWith('ар')) {
        return word + 'я'
      } else if (word.endsWith('й')) {
        return word.slice(0, word.length - 1) + 'я'
      } else if (word.endsWith('р') || word.endsWith('к') || word.endsWith('ч')) {
        return word + 'а'
      } else if (word.endsWith('м') || word.endsWith('т')) {
        return word + 'у'
      } 
    },
    checkEmployeeState({ state, commit }: any): void {
      for (const employee of state.employees) {
        if (employee.state.hp <= 0) {
          commit('setGemeOver', true)
          return
        }
      }
    }
  }
}