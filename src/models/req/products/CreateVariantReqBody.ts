export interface CreateVariantReqBody {
  variants: Variant[]
}

interface Variant {
  title: string
  choices: string[]
}
