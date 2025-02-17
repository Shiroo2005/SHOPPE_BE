import { ObjectId } from 'mongodb'

interface VariationConstructor {
  _id?: ObjectId
  name: string
  choicesId: ObjectId[]
}

export class Variation {
  _id?: ObjectId
  name: string
  choicesId: ObjectId[]

  constructor(variation: VariationConstructor) {
    this._id = variation._id
    this.name = variation.name
    this.choicesId = variation.choicesId
  }
}
