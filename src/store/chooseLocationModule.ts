import regions from '@/static/data/mapData.json'

export const chooseLocationModule = {
  namespaced: true,
  state: {
    map_png: require('@/static/images/map-choose.png'),
    parts: regions.parts,
    mapCounter: 0
  },
  getters: {},
  mutations: {
    setMapCounter(state: any, newVal: number) {
      state.mapCounter = newVal
    }
  },
  actions: {
    mapCounterCorrect({ state, commit } : { state: any, commit: any }): void {
      if (state.mapCounter < 0) {
        commit('setMapCounter', state.parts.length - 1)
      } else if (state.mapCounter >= state.parts.length) {
        commit('setMapCounter', 0)
      }
    },
    mapStep({ state, commit, dispatch } : { state: any, commit: any, dispatch: any }, dir: boolean): void {
      state.parts[state.mapCounter].isActive = false

      if (dir) {
        commit('setMapCounter', state.mapCounter + 1)
      } else {
        commit('setMapCounter', state.mapCounter - 1)
      }

      dispatch('mapCounterCorrect')
      state.parts[state.mapCounter].isActive = true
    },
    mapChooseRegion({ state, commit } : { state: any, commit: any }, event: any): void {
      state.parts[state.mapCounter].isActive = false
      commit('setMapCounter', +event.target.id)
      state.parts[state.mapCounter].isActive = true
    }
  }
}