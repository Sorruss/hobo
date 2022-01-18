export type Setting = {
  id: number,
  title: string,
  translation: string,
  variants: Array<string>,
  additionalText: string | null,
  type: 'mp' | 'mm' | 'pm'
}