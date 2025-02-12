import { ObjectId } from 'mongodb'
import { GENDER } from '~/constants/gender'
import { ROLE } from '~/constants/role'
import { USER_STATUS } from '~/constants/user_status'

interface UserConstructor {
  _id?: ObjectId
  email: string
  username: string
  password: string
  fullName: string
  phoneNumber?: string
  emailVerified?: boolean
  gender?: GENDER
  dob?: Date
  avatar?: string
  role?: ROLE
  deliveryAddress?: ObjectId
  status?: USER_STATUS
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  _id?: ObjectId
  email: string
  username: string
  password: string
  fullName: string
  phoneNumber: string
  emailVerified: boolean
  gender: GENDER
  dob: Date
  avatar: string
  role: ROLE
  deliveryAddress?: ObjectId
  status: USER_STATUS
  createAt: Date
  updateAt: Date

  constructor(user: UserConstructor) {
    const now = new Date()
    this._id = user._id
    this.email = user.email
    this.fullName = user.fullName
    this.username = user.username
    this.password = user.password
    this.phoneNumber = user.phoneNumber || ''
    this.emailVerified = user.emailVerified || false
    this.gender = user.gender || GENDER.OTHER
    this.avatar = user.avatar || ''
    this.deliveryAddress = user.deliveryAddress
    this.dob = user.dob || now
    this.role = user.role || ROLE.USER
    this.status = user.status || USER_STATUS.ACTIVE
    this.createAt = user.createdAt || now
    this.updateAt = user.updatedAt || now
  }
}
