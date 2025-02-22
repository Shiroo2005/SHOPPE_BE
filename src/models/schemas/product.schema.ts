import { ObjectId } from 'mongodb'
import Media from './media.schema'

interface ProductConstructor {
  _id?: ObjectId
  shopId: ObjectId // userId
  title: string
  mainImage: string
  medias: Media[]
  categoriesId: ObjectId[]
  description: string
  variantIds: ObjectId[]
  productItemIds: ObjectId[]
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class Product {
  _id?: ObjectId
  shopId: ObjectId // userId
  title: string
  mainImage: string
  medias: Media[]
  categoriesId: ObjectId[]
  description: string
  variantIds: ObjectId[]
  productItemIds: ObjectId[]
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
  constructor(product: ProductConstructor) {
    const now = new Date()
    this._id = product._id
    this.shopId = product.shopId
    this.title = product.title
    this.mainImage = product.mainImage
    this.medias = product.medias
    this.categoriesId = product.categoriesId
    this.description = product.description
    this.variantIds = product.variantIds
    this.productItemIds = product.productItemIds
    this.isDeleted = product.isDeleted || false
    this.createdAt = product.createdAt || now
    this.updatedAt = product.updatedAt || now
  }
}
