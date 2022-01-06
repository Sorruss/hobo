export const employeeModule = {
  namespaced: true,
  state: {
    employees: [
      {id: 1, position: 'Программист', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {}
      },
      {id: 2, position: 'Водитель', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {}
      },
      {id: 3, position: 'Механик', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {}
      },
      {id: 4, position: 'Токарь', 
        state: {hp: 100, vision: 100, hearing: 100}, 
        settings: {},
        optionalSettings: {}
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
    ]
  },
  getters: {},
  mutations: {
    setSetting(state: any, setting: any) {
      Object.assign(state.employees[setting[0] - 1].settings, setting[1])
    }
  },
  actions: {}
}
