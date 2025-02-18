import { Int32, ObjectId } from 'mongodb'
import Media from '~/models/schemas/media.schema'

export interface CreateProductReqBody {
  title: string
  medias: string[]
  categories: string[]
  description: string
  variants: string[]
  productItems: CreateProductItemReqBody[]
}

interface CreateProductItemReqBody {
  price: number
  stock: Int32
  sold: Int32
  image: string
  choices: string[]
}
