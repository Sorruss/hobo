export type regionPartType = {
  id: number,
  about: {
    regionInfo: {
      name: string,
      description: string
    },
    workers: Array<string>,
    specifications: Array<string>
  },
  coordinates: string,
  isActive: boolean,
  imgName: string
}