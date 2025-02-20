import { ObjectId } from 'mongodb'

interface VariantConstructor {
  _id?: ObjectId
  title: string
  choices: ObjectId[]
  createdAt?: Date
  createdBy: ObjectId
  updatedAt?: Date
  updatedBy: ObjectId
}

export class Variant {
  _id?: ObjectId
  title: string
  choices: ObjectId[]
  createdAt?: Date
  createdBy: ObjectId
  updatedAt?: Date
  updatedBy: ObjectId

  constructor(variant: VariantConstructor) {
    const now = new Date()
    this._id = variant._id
    this.title = variant.title
    this.choices = variant.choices
    this.createdAt = variant.createdAt || now
    this.createdBy = variant.createdBy
    this.updatedAt = variant.updatedAt || now
    this.updatedBy = variant.updatedBy
  }
}
