export default <any>{
  driver: {
    translation: 'Водій',
    category: '2а',
    settings: {
      workingDayHours: '8-10',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: {
      carbonMonoxide: 3, 
      carbonDioxide: 2
    },
    potentialDiseases: ['radiculitis'],
    accidentType: 'office'
  },
  manager: {
    translation: 'Менеджер',
    category: '1а',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<60',
      illumination: '200-500'
    },
    dozes: {
      paperDust: 6
    },
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  brewer: {
    translation: 'Пивовар',
    category: '2а',
    settings: {
      workingDayHours: '7',
      noiseLevel: null,
      illumination: '150-300'
    },
    dozes: null,
    potentialDiseases: ['tuberculosis'],
    accidentType: 'office'
  },
  smelter: {
    translation: 'Сталевар',
    category: '3',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['silicosis'],
    accidentType: 'office'
  },
  welder: {
    translation: 'Зварювальник',
    category: '2б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<75',
      illumination: null,
    },
    dozes: {
      carbonMonoxide: 2,
      nitricOxide: 1
    },
    potentialDiseases: ['bronchialAsthma'],
    accidentType: 'office'
  },
  dispatcher: {
    translation: 'Диспетчер',
    category: '1а',
    settings: {
      workingDayHours: '7',
      noiseLevel: '<60',
      illumination: null
    },
    dozes: {
      carbonDioxide: 1
    },
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  handyman: {
    translation: 'Різноробочий',
    category: '2а',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: '100-300'
    },
    dozes: {
      woodDust: 2,
      metalDust: 3
    },
    potentialDiseases: ['epicondylitis'],
    accidentType: 'office'
  },
  agronomist: {
    translation: 'Агроном',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: null,
      illumination: '150-300'
    },
    dozes: {
      earthDust: 1
    },
    potentialDiseases: ['chronicalBronchitis'],
    accidentType: 'office'
  },
  pilot: {
    translation: 'Пілот',
    category: '1а',
    settings: {
      workingDayHours: '6',
      noiseLevel: '>75',
      illumination: null
    },
    dozes: {
      carbonDioxide: 1
    },
    potentialDiseases: ['tuberculosis'],
    accidentType: 'office'
  },
  shipRepair: {
    translation: 'Судноремонтний робочий',
    category: '3',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<75',
      illumination: '100-200'
    },
    dozes: {
      carbonMonoxide: 2,
      lead: 1,
      metalDust: 2
    },
    potentialDiseases: ['tuberculosis'],
    accidentType: 'office'
  },
  conveyor: {
    translation: 'Конвеєрний робочий',
    category: '2а',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<75',
      illumination: '150-300'
    },
    dozes: {
      paperDust: 2
    },
    potentialDiseases: ['bronchialAsthma'],
    accidentType: 'office'
  },
  miner: {
    translation: 'Шахтар',
    category: '3',
    settings: {
      workingDayHours: '6-7',
      noiseLevel: '>75',
      illumination: null
    },
    dozes: {
      methane: 3
    },
    potentialDiseases: ['silicosis'],
    accidentType: 'office'
  },
  dataAnalyst: {
    translation: 'Дата аналітик',
    category: '1а',
    settings: {
      workingDayHours: '8',
      noiseLevel: null,
      illumination: '200-500'
    },
    dozes: null,
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  tester: {
    translation: 'Тестувальник',
    category: '1а',
    settings: {
      workingDayHours: '8',
      noiseLevel: null,
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  projectManager: {
    translation: 'Проджект менеджер',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null,
    },
    dozes: null,
    potentialDiseases: ['radiculitis'],
    accidentType: 'office'
  },
  HRManager: {
    translation: 'HR менеджер',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['tuberculosis'],
    accidentType: 'office'
  },
  accountant: {
    translation: 'Бухгалтер',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<50',
      illumination: '200-500'
    },
    dozes: {
      paperDust: 1
    },
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  economist: {
    translation: 'Економіст',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<50',
      illumination: '200-500'
    },
    dozes: {
      paperDust: 1
    },
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  teacher: {
    translation: 'Викладач',
    category: '1а',
    settings: {
      workingDayHours: '6',
      noiseLevel: '<65',
      illumination: '200-500'
    },
    dozes: null,
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  salesConsultant: {
    translation: 'Продавець-консультант',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['vegetovascularDystonia'],
    accidentType: 'office'
  },
  cashier: {
    translation: 'Касир',
    category: '1б',
    settings: {
      workingDayHours: '8-10',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['radiculitis'],
    accidentType: 'office'
  },
  secretary: {
    translation: 'Секретар',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<60',
      illumination: '200-500'
    },
    dozes: null,
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  dean: {
    translation: 'Декан',
    category: '1б',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: '200-500'
    },
    dozes: null,
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  student: {
    translation: 'Студент',
    category: '1б',
    settings: {
      workingDayHours: '6',
      noiseLevel: '<65',
      illumination: '200-500'
    },
    dozes: null,
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  administrator: {
    translation: 'Адміністратор',
    category: '1а',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null
    },
    dozes: null,
    potentialDiseases: ['hypodynamia'],
    accidentType: 'office'
  },
  driller: {
    translation: 'Бурильник',
    category: '3',
    settings: {
      workingDayHours: '6-7',
      noiseLevel: '>75',
      illumination: null
    },
    dozes: {
      earthDust: 3
    },
    potentialDiseases: ['silicosis'],
    accidentType: 'office'
  },
  engineer: {
    translation: 'Інженер',
    category: '2а',
    settings: {
      workingDayHours: '8',
      noiseLevel: '<65',
      illumination: null,
    },
    dozes: {
      metalDust: 1
    },
    potentialDiseases: ['osteochondrosis'],
    accidentType: 'office'
  },
  builder: {
    translation: 'Будівельник',
    category: '2а',
    settings: {
      workingDayHours: '8-10',
      noiseLevel: '<75',
      illumination: null,
    },
    dozes: {
      metalDust: 2
    },
    potentialDiseases: ['prostatitis'],
    accidentType: 'office'
  }
}