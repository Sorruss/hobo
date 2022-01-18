import router from '@/router'

export const navigationModule = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    toManag(): void {
      router.push({name: 'GameStart'})
    },
    toRegistration(): void {
      router.push({name: 'Registration'})
    },
    toChooseLocation(): void {
      router.push({name: 'EmployeeChoose'})
    }
  }
}