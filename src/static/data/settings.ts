export default <any>{
  relaxation: {
    title: 'Відпочинок',
    variants: ['геншин', 'танки', 'ютуб', 'голуби'],
    additionalText: null,
    type: 'mp',
    stateDamages: {
      hp: 4,
      hearing: 4,
      vision: 4
    }
  },
  treatment: {
    title: 'Лечение',
    variants: ['гольф', 'санаторий', 'мясо', 'голуби'],
    additionalText: null,
    type: 'mp',
    stateDamages: {
      hp: 4,
      hearing: 4,
      vision: 4
    }
  },
  energyCosts: {
    title: 'Енерговитрати',
    variants: ['10', '11', '12', '13'],
    additionalText: ' кк',
    type: 'pm',
    stateDamages: {
      hp: 4
    }
  },
  calories: {
    title: 'Калорійність',
    variants: ['<120', '121-150', '151-200', '201-250', '>250'],
    additionalText: ' ккал/г',
    type: 'mm',
    stateDamages: {
      hp: 5
    }
  },
  temperatureWarmSeason: {
    title: 'Температура на теплий сезон',
    variants: ['16-18', '17-19', '19-21', '21-23', '22-24'],
    additionalText: '°C',
    type: 'mm',
    stateDamages: {
      hp: 4
    }
  },
  temperatureColdSeason: {
    title: 'Температура на холодний сезон',
    variants: ['19-20', '20-22', '21-23', '22-24', '23-25'],
    additionalText: '°C',
    type: 'mm',
    stateDamages: {
      hp: 4
    }
  },
  workingDayHours: {
    title: 'Робоча зміна',
    variants: ['6', '6-7', '7', '8', '8-10'],
    additionalText: ' годин',
    type: 'pm',
    stateDamages: {
      hp: 4,
      hearing: 2,
      vision: 2
    }
  },
  illumination: {
    title: 'Освітленість',
    variants: ['100-200', '100-300', '150-300', '200-500'],
    additionalText: 'лк',
    type: 'mm',
    stateDamages: {
      vision: 4
    }
  },
  noiseLevel: {
    title: 'Рівень шуму',
    variants: ['<50', '<60', '<65', '<75', '>75'],
    additionalText: 'дБА',
    type: 'pm',
    stateDamages: {
      hearing: 4
    }
  }
}