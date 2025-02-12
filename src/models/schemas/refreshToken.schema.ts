import { ObjectId } from 'mongodb'

export interface RefreshTokenConstructor {
  _id?: ObjectId
  userId: ObjectId
  token: string
}

export class RefreshToken {
  _id?: ObjectId
  userId: ObjectId
  token: string

  constructor(refreshToken: RefreshTokenConstructor) {
    this._id = refreshToken._id
    this.userId = refreshToken.userId
    this.token = refreshToken.token
  }
}
