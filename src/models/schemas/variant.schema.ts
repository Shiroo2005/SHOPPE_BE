import { ObjectId } from 'mongodb'

interface VariantConstructor {
  _id?: ObjectId
  title: string
  choices: string[]
}

export class Variant {
  _id?: ObjectId
  title: string
  choices: string[]

  constructor(variant: VariantConstructor) {
    this._id = variant._id
    this.title = variant.title
    this.choices = variant.choices
  }
}
