import { ObjectId } from 'mongodb'

export class Choice {
  _id?: ObjectId
  name: string
  constructor(choice: Choice) {
    this._id = choice._id
    this.name = choice.name
  }
}
