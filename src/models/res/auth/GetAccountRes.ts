import { GENDER } from '~/constants/gender'
import { ROLE } from '~/constants/role'
import { USER_STATUS } from '~/constants/user_status'
import { User } from '~/models/schemas/user.schema'

export class GetAccountRes {
  _id?: string
  email: string
  username: string
  fullName: string
  phoneNumber?: string
  gender?: GENDER
  dob?: Date
  avatar?: string
  role?: ROLE
  deliveryAddress?: string
  status?: USER_STATUS
  createdAt?: Date
  updatedAt?: Date
  constructor(account: User) {
    this._id = account._id?.toString()
    this.email = account.email
    this.fullName = account.fullName
    this.username = account.username
    this.phoneNumber = account.phoneNumber
    this.gender = account.gender
    this.dob = account.dob
    this.avatar = account.avatar
    this.role = account.role
    this.deliveryAddress = account.deliveryAddress?.toString()
    this.status = account.status
    this.createdAt = account.createAt
    this.updatedAt = account.updateAt
    this.deliveryAddress = account.deliveryAddress?.toString()
  }
}
