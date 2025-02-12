import { User } from '~/models/schemas/user.schema'
import databaseService from './database.service'
import { hashPassword } from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
config()
class UserService {
  async findByEmailOrUsername({ email, username }: { email: string; username: string }) {
    const result = await databaseService.users.findOne({
      $or: [{ email }, { username }]
    })

    return result
  }

  async authenticate(username: string, password: string) {
    const result = await databaseService.users.findOne({
      $or: [
        {
          $and: [{ username: username, password: hashPassword(password) }]
        },
        {
          $and: [{ email: username, password: hashPassword(password) }]
        }
      ]
    })

    return result
  }

  createAccessToken = ({ userId, isEmailVerified }: { userId: string; isEmailVerified: boolean }) => {
    const accessToken = signToken({
      payload: { userId, isEmailVerified },
      optional: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    })
    return accessToken
  }

  createRefreshToken = async ({
    userId,
    isEmailVerified,
    exp
  }: {
    userId: string
    isEmailVerified: boolean
    exp?: number
  }) => {
    if (exp) {
      const refreshToken = signToken({
        payload: { userId, isEmailVerified, exp }
      })
    }

    const refreshToken = signToken({
      payload: { userId, isEmailVerified },
      optional: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    })

    return refreshToken
  }

  async register({
    email,
    username,
    password,
    fullName
  }: {
    email: string
    username: string
    password: string
    fullName: string
  }) {
    console.log(email, username, password, fullName)

    const result = await databaseService.users.insertOne(
      new User({ email, username, password: hashPassword(password), fullName })
    )
    return result
  }

  async login({ userId, isEmailVerified }: { userId: ObjectId; isEmailVerified: boolean }) {
    const accessToken = this.createAccessToken({ userId: userId.toString(), isEmailVerified })
    const refreshToken = await this.createRefreshToken({ userId: userId.toString(), isEmailVerified })

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ userId: new ObjectId(userId), token: refreshToken })
    )
    return { accessToken, refreshToken }
  }
}

const userService = new UserService()
export default userService
