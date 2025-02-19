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
  variantsId: ObjectId[]
  productItemsId: ObjectId[]
  isDeleted?: boolean
  createdAt?: Date
  createdBy: ObjectId
  updatedAt?: Date
  updatedBy: ObjectId
}

export class Product {
  _id?: ObjectId
  shopId: ObjectId // userId
  title: string
  mainImage: string
  medias: Media[]
  categoriesId: ObjectId[]
  description: string
  variantsId: ObjectId[]
  productItemsId: ObjectId[]
  isDeleted: boolean
  createdAt?: Date
  createdBy: ObjectId
  updatedAt?: Date
  updatedBy: ObjectId
  constructor(product: ProductConstructor) {
    const now = new Date()
    this._id = product._id
    this.shopId = product.shopId
    this.title = product.title
    this.mainImage = product.mainImage
    this.medias = product.medias
    this.categoriesId = product.categoriesId
    this.description = product.description
    this.variantsId = product.variantsId
    this.productItemsId = product.productItemsId
    this.isDeleted = product.isDeleted || false
    this.createdAt = product.createdAt || now
    this.createdBy = product.createdBy
    this.updatedAt = product.updatedAt || now
    this.updatedBy = product.updatedBy
  }
}
