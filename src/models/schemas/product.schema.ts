import { ObjectId } from 'mongodb'
import Media from './media.schema'

interface Product {
  _id: ObjectId
  shopId: ObjectId // userId
  title: string
  mainImage: string
  medias: Media[]
  categoriesId: ObjectId[]
  description: string
  variationsId: ObjectId[]
  productItems: ObjectId[]
  isDeleted: boolean
}
