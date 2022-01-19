import router from '@/router'

import allEmployees from '@/static/data/employees'
import allSettings from '@/static/data/settings'
import allStates from '@/static/data/states'
import allDozes from '@/static/data/dozes'


export const employeeModule = {
  namespaced: true,
  state: {
    employees: [],
    yearCounter: 0,
    overdozeReport: '',
    overdozeAlertVisible: false,
    gameOver: false,
    gameOverReport: '',
    missingSettingAlertVidible: false,
    missingSettingAlertText: ''
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
      // {eId: employee.id, dozeTrans: allDozes[doze].translation, title: doze}
      for (const employee of state.employees) {
        employee.optionalSettings = []
      }
      for (const overdoze of overdozeInfo) {
        // @ts-ignore
        state.employees[overdoze.eId - 1].optionalSettings.push({id: overdoze.eId, title: overdoze.dozeTrans, variants: Object.keys(allDozes[overdoze.title].treatmentWays)})
      }
    },
    setGemeOver(state: any, payload: boolean): void {
      state.gameOver = payload
    },
    setGameOverReport(state: any, report: string): void {
      state.gameOverReport = report
    },
    pushSelected2History(_: any, employee: any): void {
      employee.history.push(Object.assign({}, employee.selectedSettings))
    },
    setMissingSettingAlertVisible(state: any, payload: boolean): void {
      state.missingSettingAlertVidible = payload
    },
    setMissingSettingAlertText(state: any, {settingTitle, employeePosition} : {settingTitle: string, employeePosition: string}): void {
      state.missingSettingAlertText = `Ви не обрали параметр ${settingTitle} для Вашого робітника ${employeePosition}`
    },
    selectODozeTreatment(state: any, payload: any): void {
      console.log(payload)
    }
  },
  actions: {
    nextYear({ state, commit, dispatch }: any): void {
      for (const employee of state.employees) {
        if (!(Object.keys(employee.selectedSettings).length === 
        (Object.keys(employee.settings).length - 
        Object.values(employee.settings).filter(x => x === null).length))) {
          const selected = Object.keys(employee.selectedSettings)
          const missing = Object.keys(employee.settings).filter(x => !selected.includes(x))[0]

          commit('setMissingSettingAlertVisible', true)
          commit('setMissingSettingAlertText', {
            // @ts-ignore 
            settingTitle: allSettings[missing].title.toLowerCase(),
            employeePosition: employee.translation
          })
          return
        }
      }

      for (const employee of state.employees) {
        dispatch('updateEmployeeState', employee)
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
      for (const employee of state.employees) {
        employee.history = []
      }
    },
    clearSettings({ state } : { state: any }): void {
      for (const employee of state.employees) {
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
          for (const doze of Object.keys(dozes)) {
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
      let empDoze = null
      for (const employee of state.employees) {
        if (employee.dozes) {
          for (const doze of Object.keys(employee.dozes)) {
            empDoze = employee.dozes[doze]
            employee.dozes[doze].state += empDoze.increment
            // @ts-ignore
            if ((empDoze.state + empDoze.increment) > allDozes[doze].threshold) {
              // @ts-ignore
              employee.state.hp -= allDozes[doze].damage
              dispatch('checkEmployeesState')
            }
            // @ts-ignore
            if ((empDoze.state + empDoze.increment) >= allDozes[doze].threshold * 0.8) {
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
      for (const overdoze of overdozeInfo) {
        overdozes[state.employees[overdoze.eId - 1].translation] = []
      }
      for (const overdoze of overdozeInfo) {
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
    checkEmployeesState({ state, dispatch }: any): void {
      for (const employee of state.employees) {
        for (const empState of Object.keys(employee.state)) {
          if (employee.state[empState] <= 0) {
            dispatch('gameOver', {stateTitle: empState, employeePosition: employee.translation})
            return
          }
        }
      }
    },
    gameOver({ commit }: any, {stateTitle, employeePosition} : {stateTitle: string, employeePosition: string}): void {
      commit('setGemeOver', true)
      // @ts-ignore
      commit('setGameOverReport', `Показник ${allStates[stateTitle].translation} Вашого робітника ${employeePosition} досяг критичного значення`)
    },
    updateEmployeeState({ dispatch }: any, employee: any): void {
      let settingType, setting, variants, diff = null
      for (const settingName of Object.keys(employee.settings)) {
        if (!employee.settings[settingName]) {
          continue
        }
        // @ts-ignore
        setting = allSettings[settingName]
        settingType = setting.type
        variants = [...setting.variants].sort()
        diff = variants.indexOf(employee.selectedSettings[settingName].replace(setting.additionalText, '')) - variants.indexOf(employee.settings[settingName])
        if (settingType === 'mp') {
          if (diff >= 0) {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] += (diff > 0 ? diff : 1) * setting.stateDamages[damage]
              if (employee.state[damage] > 100) {
                employee.state[damage] = 100
              }
            }
          } else {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] -= (-diff) * setting.stateDamages[damage]
              if (employee.state[damage] < 0) {
                dispatch('gameOver', {stateTitle: damage, employeePosition: employee.translation})
              }
            }
          }
        } else if (settingType === 'mm') {
          if (diff) {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] -= Math.abs(diff) * setting.stateDamages[damage]
              if (employee.state[damage] < 0) {
                dispatch('gameOver', {stateTitle: damage, employeePosition: employee.translation})
              }
            }
          } else {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] += setting.stateDamages[damage]
              if (employee.state[damage] > 100) {
                employee.state[damage] = 100
              }
            }
          }
        } else if (settingType === 'pm') {
          if (diff <= 0) {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] += (diff !== 0 ? -diff : 1) * setting.stateDamages[damage]
              if (employee.state[damage] > 100) {
                employee.state[damage] = 100
              }
            }
          } else {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] -= diff * setting.stateDamages[damage]
              if (employee.state[damage] < 0) {
                dispatch('gameOver', {stateTitle: damage, employeePosition: employee.translation})
              }
            }
          }
        } else {
          throw new Error(`Unknown setting type "${settingType}", choose one from "mp|mm|pm"`)
        }
      }
    }
  }
}