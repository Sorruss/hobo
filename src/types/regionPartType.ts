export type regionPartType = {
  id: number,
  about: {
    regionInfo: {
      name: string,
      companyName: string,
      description: string
    },
    workers: Array<string>,
    specifications: Array<string>
  },
  coordinates: string,
  isActive: boolean
}