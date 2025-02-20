import { ObjectId } from 'mongodb'

export class Choice {
  _id?: ObjectId
  name: string
  variant: ObjectId
  constructor(choice: Choice) {
    this._id = choice._id
    this.name = choice.name
    this.variant = choice.variant
  }
}
