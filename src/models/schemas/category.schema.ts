import { ObjectId } from 'mongodb'

interface CategoryConstructor {
  id?: ObjectId
  parentId?: ObjectId
  name: string
  image: string
  createdAt?: Date
  updatedAt?: Date
}

export class Category {
  id?: ObjectId
  parentId?: ObjectId
  name: string
  image: string
  createdAt: Date
  updatedAt: Date
  constructor(category: CategoryConstructor) {
    const now = new Date()
    this.id = category.id
    this.parentId = category.parentId
    this.name = category.name
    this.image = category.image
    this.createdAt = category.createdAt || now
    this.updatedAt = category.updatedAt || now
  }
}
