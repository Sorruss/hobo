import router from '@/router'

import { Accident } from '@/types/accidentType'
import accidentGroups from '@/static/data/accidentGroups'
import allEmployees from '@/static/data/employees'
// import categories from '@/static/data/categories'
import allDiseases from '@/static/data/diseases'
import allSettings from '@/static/data/settings'
import allSystems from '@/static/data/systems'
import allStates from '@/static/data/states'
import allDozes from '@/static/data/dozes'
// import { DXT } from 'docxtemplater'
// import integer = DXT.integer
import accidents from '@/static/data/accidents'
// import employees from '@/static/data/employees'


export const employeeModule = {
  namespaced: true,
  state: {
    employees: [],
    totalYears: 8,
    yearCounter: 0,
    overdozeReport: '',
    overdozeAlertVisible: false,
    gameOver: false,
    gameOverReport: '',
    missingSettingAlertVidible: false,
    missingSettingAlertText: '',
    permissionOnContinue: false,
    missedSettingIndex: null,
    accidentDescription: [],
    accidentAlert: false,
    isAccident: false,
    currentAccident: {
      employee: '',
      emplIndex: -1,
      damage: '',
      text: '',
      variants: [],
      treatment: ''
    },
    accidentTimer: -1,
    diseaseAlertVisible: false
  },
  getters: {
    getDiseasesReport(state: any): string {
      let report = ''
      for (const employee of state.employees) {
        if (employee.diseases.length) {
          if (employee.diseases.length === 1) {
            report += `Професійна хвороба ${allDiseases[employee.diseases[0]].translation} настигла Вашого робітника фаху ${employee.translation}.<br>`
          } else {
            report += `Професійні хвороби ${employee.diseases.map((x: any) => allDiseases[x].translation).join(', ')} настигла Вашого робітника ${employee.translation}.<br>`
          }
        }
      }
      return report
    }
  },
  mutations: {
    setSetting(state: any, setting: any): void {
      Object.assign(state.employees[setting[0] - 1].selectedSettings, setting[1])
    },
    setODozeTreatment(state: any, treatment: any): void {
      Object.assign(state.employees[treatment.eId - 1].selectedODozeTreatment, 
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
    },
    setRandomAccident(state: any): void {
      const newAccidents: Array<Accident> = []

      for (let i = 0; i < 2; i++) {
        newAccidents.push({year: 0, employee: -1, accident: {}})
      }

      //randomYears
      const firstMin = 1,
          firstMax = 6,
          secMax = 13,
          interval = 7

      const firstYear = 1 //Math.floor(Math.random() * (firstMax - firstMin + 1)) + firstMin
      const secMin = firstYear + interval
      const secYear = Math.floor(Math.random() * (secMax - secMin + 1)) + secMin

      newAccidents[0].year = firstYear
      newAccidents[1].year = secYear

      //randomEmployee
      let emplIndexes = [0, 1, 2, 3]

      const firstEmpl = Math.floor(Math.random() * 4)
      emplIndexes.splice(firstEmpl, 1)
      const secEmpl = emplIndexes[Math.floor(Math.random() * 3)]

      newAccidents[0].employee = firstEmpl
      newAccidents[1].employee = secEmpl

      //choosing the type of an accident
      const firstAccTypes = accidentGroups[state.employees[firstEmpl].accidentType]
      const secAccTypes = accidentGroups[state.employees[secEmpl].accidentType]

      const firstAccInd = Math.floor(Math.random() * firstAccTypes.length)
      const secAccInd = Math.floor(Math.random() * secAccTypes.length)

      const firstAcc = accidents[firstAccTypes[firstAccInd]]
      const secAcc = accidents[secAccTypes[secAccInd]]

      newAccidents[0].accident = firstAcc
      newAccidents[1].accident = secAcc

      state.accidentDescription = newAccidents
    },
    checkYearOnAccident(state: any): void {
      const accidentYears = [state.accidentDescription[0].year, state.accidentDescription[1].year]

      if (state.isAccident) {
        if (state.accidentTimer > 0) {
          state.accidentTimer--
        } else {
          state.isAccident = false
        }
      } else if (state.yearCounter === accidentYears[0]) {
        state.accidentTimer = 2
        state.isAccident = true
        state.accidentAlert = true
        state.currentAccident = {
          employee: state.employees[state.accidentDescription[0].employee].translation,
          emplIndex: state.accidentDescription[0].employee,
          ...state.accidentDescription[0].accident
        }
      } else if (state.yearCounter === accidentYears[1]) {
        state.accidentTimer = 2
        state.isAccident = true
        state.accidentAlert = true
        state.currentAccident = {
          employee: state.employees[state.accidentDescription[1].employee].translation,
          emplIndex: state.accidentDescription[1].employee,
          ...state.accidentDescription[0].accident
        }
      }
    },
    setAccidentAlert(state: any, flag: boolean): void {
      state.accidentAlert = flag
    },
    updateStateAccident(state: any): void {
      const emplIndex = state.currentAccident.emplIndex
      const stat = state.currentAccident.damage

      state.employees[emplIndex].state[stat] = Math.ceil(state.employees[emplIndex].state[stat] * 0.7)
    },
    setAccidentTreatment(state: any, treatChoose: any): void {
      return
    },
    setDiseaseAlertVisible(state: any, payload: boolean): void {
      state.diseaseAlertVisible = payload
    },
    setDiseaseTreatment(state: any, treatment: any): void {
      Object.assign(state.employees[treatment.eId - 1].selectedDiseasesTreatment, 
        {[treatment.diseaseTitle]: treatment.variant})
    }
  },
  actions: {
    nextYear({ state, commit, dispatch }: any): void {
      dispatch('checkOnAllSelected')
      if (!state.permissionOnContinue || state.gameOver) {
        return
      }

      for (const employee of state.employees) {
        dispatch('updateEmployeeState', employee)
        commit('pushState2History', employee)

        if (Object.keys(employee.selectedODozeTreatment).length) {
          dispatch('overdozeTreatment', employee)
        }
        if (Object.keys(employee.selectedDiseasesTreatment).length) {
          dispatch('diseasesTreatment', employee)
        }
        dispatch('updateSystemsState', employee)
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

      // commit('checkYearOnAccident')
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
        // set main settings
        newEmp = {
          id: id,
          state: {hp: 100, vision: 100, hearing: 100}, 
          systems: {},
          selectedSettings: {},
          selectedODozeTreatment: {},
          selectedDiseasesTreatment: {},
          history: [],
          optionalSettings: [],
          diseases: [],
          ...JSON.parse(JSON.stringify(allEmployees[employee]))
        }

        // set other main settings
        // newEmp.settings.calories = categories[newEmp.category].calories
        // newEmp.settings.temperatureWarmSeason = categories[newEmp.category].temperatureWarmSeason
        // newEmp.settings.temperatureColdSeason = categories[newEmp.category].temperatureColdSeason

        // set all systems
        for (const system of Object.keys(allSystems)) {
          newEmp.systems[system] = 100
        }

        // set employee dozes
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
      for (const oDoze of Object.keys(employee.selectedODozeTreatment)) {
        const treatmentFactor = allDozes[oDoze].treatmentWays[employee.selectedODozeTreatment[oDoze]]
        const currentState = employee.dozes[oDoze].state
        
        employee.dozes[oDoze].state -= Math.ceil(currentState * treatmentFactor)
        if (employee.dozes[oDoze].state <= allDozes[oDoze].threshold) {
          employee.optionalSettings = employee.optionalSettings.filter((doze: any) => doze.title !== oDoze)
        }
      }
      for (const treat in employee.selectedODozeTreatment) delete employee.selectedODozeTreatment[treat]
    },
    updateSystemsState({ dispatch }: any, employee: any): void {
      let dependCount = 0
      for (const system of Object.keys(employee.systems)) {
        for (const [dependState, coeff] of Object.entries(allSystems[system].dependencies as Object)) {
          dependCount += employee.state[dependState] * coeff
        }
        employee.systems[system] = Math.round(dependCount)
        dependCount = 0
      }
      dispatch('ckeckOnOccupationDiseases', employee)
    },
    ckeckOnOccupationDiseases({ commit }: any, employee: any): void {
      let allConds = false
      for (const potDis of employee.potentialDiseases) {
        for (const [system, cod] of Object.entries(allDiseases[potDis].conditions as Object)) {
          if (employee.systems[system] <= cod) {
            allConds = true
          } else {
            allConds = false
            return
          }
        }
        if (allConds && !employee.diseases.includes(potDis)) {
          employee.diseases.push(potDis)
          commit('setDiseaseAlertVisible', true)
        }
        allConds = false
      }
    },
    diseasesTreatment(_: any, employee: any): void {
      let improvement, count
      for (const disease of employee.diseases) {
        improvement = allDiseases[disease].treatmentWays[employee.selectedDiseasesTreatment[disease]].healthImprovement * (100 / 3)
        for (const system of Object.keys(allDiseases[disease].conditions)) {
          count = Object.keys(allSystems[system].dependencies).length
          for (const [dep, coeff] of Object.entries(allSystems[system].dependencies as Object)) {
            employee.state[dep] += Math.round(improvement * count * coeff)
            if (employee.state[dep] > 100) {
              employee.state[dep] = 100
            }
          }
        }
      }

      employee.diseases.length = 0
      employee.selectedDiseasesTreatment = {}
    }
  }
}