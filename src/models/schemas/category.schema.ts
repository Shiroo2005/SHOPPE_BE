import { ObjectId } from 'mongodb'

interface CategoryConstructor {
  _id?: ObjectId
  parentId?: ObjectId
  name: string
  image: string
  createdAt?: Date
  updatedAt?: Date
}

export class Category {
  _id?: ObjectId
  parentId?: ObjectId | null
  name: string
  image: string
  createdAt?: Date
  updatedAt?: Date
  constructor(category: CategoryConstructor) {
    const now = new Date()
    this._id = category._id
    this.parentId = category.parentId
    this.name = category.name
    this.image = category.image
    this.createdAt = category.createdAt || now
    this.updatedAt = category.updatedAt || now
  }
}
