import router from '@/router'

import allEmployees from '@/static/data/employees'
import categories from '@/static/data/categories'
import allSettings from '@/static/data/settings'
import allStates from '@/static/data/states'
import allDozes from '@/static/data/dozes'


export const employeeModule = {
  namespaced: true,
  state: {
    employees: [],
    totalYears: 15,
    yearCounter: 0,
    overdozeReport: '',
    overdozeAlertVisible: false,
    gameOver: false,
    gameOverReport: '',
    missingSettingAlertVidible: false,
    missingSettingAlertText: '',
    permissionOnContinue: false,
    missedSettingIndex: null
  },
  getters: {},
  mutations: {
    setSetting(state: any, setting: any): void {
      Object.assign(state.employees[setting[0] - 1].selectedSettings, setting[1])
    },
    setODozeTreatment(state: any, treatment: any): void {
      Object.assign(state.employees[treatment.eId - 1].selectedODozeTreatments, 
        {[treatment.overdozeTitle]: treatment.variant})
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
    clearOptionalSettings(state: any): void {
      for (const employee of state.employees) {
        employee.optionalSettings = []
      }
    },
    setGemeOver(state: any, payload: boolean): void {
      state.gameOver = payload
    },
    setGameOverReport(state: any, report: string): void {
      state.gameOverReport = report
    },
    pushState2History(state: any, employee: any): void {
      employee.history.push(Object.assign({year: state.yearCounter + 1}, employee.state))
    },
    setMissingSettingAlertVisible(state: any, payload: boolean): void {
      state.missingSettingAlertVidible = payload
    },
    setMissingSettingAlertText(state: any, {settingTitle, employeePosition} : {settingTitle: string, employeePosition: string}): void {
      state.missingSettingAlertText = `Ви не обрали параметр ${settingTitle} для Вашого робітника ${employeePosition}`
    },
    serPermissionOnContinue(state: any, payload: boolean): void {
      state.permissionOnContinue = payload
    },
    setMissedSettingIndex(state: any, index: string): void {
      state.missedSettingIndex = index
    }
  },
  actions: {
    nextYear({ state, commit, dispatch }: any): void {
      dispatch('checkOnAllSelected')
      console.log(state.gameOver)
      if (!state.permissionOnContinue || state.gameOver) {
        return
      }

      for (const employee of state.employees) {
        dispatch('updateEmployeeState', employee)
        commit('pushState2History', employee)

        if (Object.keys(employee.selectedODozeTreatments).length) {
          dispatch('overdozeTreatment', employee)
        }
      }
      dispatch('dozesIncrement')

      if (state.gameOver) {
        return
      }

      if (state.yearCounter >= state.totalYears - 1) {
        commit('setGameStarted', false, {root: true})
        commit('setGameFinished', true, {root: true})
        commit('setYearCounter', 0)
        router.push({name: 'ResultReport'})
        return
      }
      commit('setYearCounter', state.yearCounter + 1)
    },
    checkOnAllSelected({ state, commit }: any): void {
      let empSettings = null
      for (const employee of state.employees) {
        empSettings = Object.keys(employee.settings)
        if (!(Object.keys(employee.selectedSettings).length === 
        (empSettings.length - 
        Object.values(employee.settings).filter(x => x === null).length))) {
          const selected = Object.keys(employee.selectedSettings)
          const missing = empSettings.filter(x => employee.settings[x] !== null && !selected.includes(x))[0]

          commit('setMissingSettingAlertVisible', true)
          commit('setMissingSettingAlertText', {
            settingTitle: allSettings[missing].title.toLowerCase(),
            employeePosition: employee.translation
          })
          commit('serPermissionOnContinue', false)
          commit('setMissedSettingIndex', employee.translation + empSettings.filter(x => employee.settings[x] !== null).indexOf(missing))
          return
        }
      }
      commit('serPermissionOnContinue', true)
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
      let dozes, newEmp
      for (const employee of employees) {
        newEmp = {
          id: id,
          state: {hp: 100, vision: 100, hearing: 100}, 
          selectedSettings: {},
          selectedODozeTreatments: {},
          history: [],
          optionalSettings: [],
          ...JSON.parse(JSON.stringify(allEmployees[employee]))
        }

        newEmp.settings.calories = categories[newEmp.category].calories
        newEmp.settings.temperatureWarmSeason = categories[newEmp.category].temperatureWarmSeason
        newEmp.settings.temperatureColdSeason = categories[newEmp.category].temperatureColdSeason

        dozes = newEmp.dozes
        if (dozes) {
          for (const doze of Object.keys(dozes)) {
            newEmp.dozes[doze] = {
              increment: dozes[doze],
              state: 0
            }
          }
        }
        state.employees.push(newEmp)
        id++
      }
    },
    dozesIncrement({ state, dispatch }: any): void {
      if (state.gameOver) {
        return
      }

      const overdozes = []
      let empDoze = null
      for (const employee of state.employees) {
        if (employee.dozes) {
          for (const doze of Object.keys(employee.dozes)) {
            empDoze = employee.dozes[doze]
            employee.dozes[doze].state += empDoze.increment
            if ((empDoze.state + empDoze.increment) > allDozes[doze].threshold) {
              state.employees[employee.id - 1].state.hp -= allDozes[doze].damage
              dispatch('checkEmployeesState')
            }
            if ((empDoze.state + empDoze.increment) >= allDozes[doze].threshold * 0.8) {
              overdozes.push({eId: employee.id, dozeTrans: allDozes[doze].translation, title: doze})
            }
          }
        }
      }
      if (overdozes.length) {
        dispatch('overdozeAlert', overdozes)
      }
    },
    overdozeAlert({ state, commit, dispatch }: any, overdozeInfo: Array<any>): void {
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
      dispatch('setOptionalSettings', overdozeInfo)
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
      commit('setGameOverReport', `Показник ${allStates[stateTitle].translation} Вашого робітника ${employeePosition} досяг критичного значення`)
    },
    updateEmployeeState({ state, dispatch }: any, employee: any): void {
      let settingType, setting, variants, diff = null
      for (const settingName of Object.keys(employee.settings)) {
        if (state.gameOver) {
          return
        } else if (!employee.settings[settingName]) {
          continue
        }
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
              if (employee.state[damage] <= 0) {
                dispatch('gameOver', {stateTitle: damage, employeePosition: employee.translation})
              }
            }
          }
        } else if (settingType === 'mm') {
          if (diff) {
            for (const damage of Object.keys(setting.stateDamages)) {
              employee.state[damage] -= Math.abs(diff) * setting.stateDamages[damage]
              if (employee.state[damage] <= 0) {
                console.log('1')
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
              if (employee.state[damage] <= 0) {
                dispatch('gameOver', {stateTitle: damage, employeePosition: employee.translation})
              }
            }
          }
        } else {
          throw new Error(`Unknown setting type "${settingType}", please, choose one from list ['mp', 'mm', 'pm']`)
        }
      }
    },
    setOptionalSettings({state, commit}: any, overdozeInfo: any): void {
      commit('clearOptionalSettings')
      for (const overdoze of overdozeInfo) {
        state.employees[overdoze.eId - 1].optionalSettings.push({...overdoze, variants: Object.keys(allDozes[overdoze.title].treatmentWays)})
      }
    },
    overdozeTreatment(_: any, employee: any): void {
      for (const oDoze of Object.keys(employee.selectedODozeTreatments)) {
        const treatmentFactor = allDozes[oDoze].treatmentWays[employee.selectedODozeTreatments[oDoze]]
        const currentState = employee.dozes[oDoze].state
        
        employee.dozes[oDoze].state -= Math.ceil(currentState * treatmentFactor)
        if (employee.dozes[oDoze].state <= allDozes[oDoze].threshold) {
          employee.optionalSettings = employee.optionalSettings.filter((doze: any) => doze.title !== oDoze)
        }
      }
      for (const treat in employee.selectedODozeTreatments) delete employee.selectedODozeTreatments[treat]
    }
  }
}