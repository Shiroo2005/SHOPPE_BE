import { Int32, ObjectId } from 'mongodb'
import Media from '~/models/schemas/media.schema'

export interface CreateProductReqBody {
  title: string
  mainImage: string
  medias: Media[]
  categories: ObjectId[]
  description: string
  variants: string[]
  productItems: CreateProductItemReqBody[]
}

export interface CreateProductItemReqBody {
  price: number
  stock: Int32
  sold: Int32
  image: string
  choices: ObjectId[]
}
