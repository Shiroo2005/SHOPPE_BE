import { ObjectId } from 'mongodb'

interface ChoiceConstructor {
  _id?: ObjectId
  name: string
  choiceId?: ObjectId
}

export class Choice {
  _id?: ObjectId
  name: string
  choiceId?: ObjectId

  constructor(choice: ChoiceConstructor) {
    this._id = choice._id
    this.name = choice.name
    this.choiceId = choice.choiceId
  }
}
