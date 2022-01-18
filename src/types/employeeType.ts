export type Employee = {
  translation: string,
  category: string,
  settings: {
    workingDayHours: string,
    noiseLevel: string,
    illumination: string
  },
  optionalSetting: Array<any>
}