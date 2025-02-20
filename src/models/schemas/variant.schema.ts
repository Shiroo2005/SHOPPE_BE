import { ObjectId } from 'mongodb'

interface VariantConstructor {
  _id?: ObjectId
  name: string
}

export class Variant {
  _id?: ObjectId
  name: string

  constructor(variation: VariantConstructor) {
    this._id = variation._id
    this.name = variation.name
  }
}
