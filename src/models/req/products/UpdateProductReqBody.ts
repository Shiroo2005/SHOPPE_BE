import { Int32, ObjectId } from 'mongodb'
import Media from '~/models/schemas/media.schema'

export interface UpdateProductReqBody {
  title: string
  mainImage: string
  medias: Media[]
  categories: ObjectId[]
  description: string
  variants: string[]
  productItems: UpdateProductItemReqBody[]
}

export interface UpdateProductItemReqBody {
  _id: ObjectId
  price: number
  stock: Int32
  sold: Int32
  image: string
  choices: ObjectId[]
}
