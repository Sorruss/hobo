export const chooseLocationModule = {
  namespaced: true,
  state: {
    map_png: require('@/static/images/map-choose.png'),
    regions: require("@/static/data/mapData.json"),
    mapCounter: 0,
  },
  getters: {
    getRegionIndex(state:any) {
      return state.mapCounter;
    }
  },
  mutations: {

    mapCounterCorrect(state:any): void{
      if(state.mapCounter < 0){
        state.mapCounter = state.regions.parts.length-1;
      } else if(state.mapCounter>=state.regions.parts.length){
        state.mapCounter = 0;
      }
    },

    mapChooseRegion(state:any,id:any): void{
      state.regions.parts[state.mapCounter].isActive = false;
      state.mapCounter = id;
      state.regions.parts[state.mapCounter].isActive = true;
    }
  },
  actions: {
    mapStep({state,commit}:any,dir:boolean): void{
      state.regions.parts[state.mapCounter].isActive = false;

      if(dir)
        state.mapCounter++;
      else
        state.mapCounter--;

      commit("mapCounterCorrect");

      state.regions.parts[state.mapCounter].isActive = true;
    },
  }
}