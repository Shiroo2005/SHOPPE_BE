import { ObjectId } from 'mongodb'

interface VariantConstructor {
  _id?: ObjectId
  name: string
  choicesId: ObjectId[]
}

export class Variant {
  _id?: ObjectId
  name: string
  choicesId: ObjectId[]

  constructor(variation: VariantConstructor) {
    this._id = variation._id
    this.name = variation.name
    this.choicesId = variation.choicesId
  }
}
