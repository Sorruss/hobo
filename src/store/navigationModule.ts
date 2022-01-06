import router from '@/router'

export const navigationModule = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    toManag() {
      router.push({name: 'GameStart'})
    },
    toRegistration() {
      router.push({name: 'Registration'})
    },
    toChooseLocation() {
      router.push({name: 'EmployeeChoose'})
    }
  }
}