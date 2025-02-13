import { User } from '~/models/schemas/user.schema'
import databaseService from './database.service'
import { generateRandomPassword, generateRandomUsername, hashPassword } from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
import { GetAccountRes } from '~/models/res/auth/GetAccountRes'
config()
class UserService {
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
    const result = await databaseService.users.insertOne(
      new User({ email, username, password: hashPassword(password), fullName })
    )
    return result
  }

  async login({ userId, isEmailVerified }: { userId: ObjectId; isEmailVerified: boolean }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken({ userId: userId.toString(), isEmailVerified }),
      this.createRefreshToken({ userId: userId.toString(), isEmailVerified })
    ])
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ userId: new ObjectId(userId), token: refreshToken })
    )
    return { accessToken, refreshToken }
  }

  async logout({ refreshToken }: { refreshToken: string }) {
    const result = await databaseService.refreshTokens.deleteOne({ token: refreshToken })
    return result
  }

  async newToken({
    userId,
    exp,
    isEmailVerified,
    refreshToken
  }: {
    userId: string
    isEmailVerified: boolean
    refreshToken: string
    exp: number
  }) {
    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.createAccessToken({ userId, isEmailVerified }),
      this.createRefreshToken({ userId, isEmailVerified, exp }),
      databaseService.refreshTokens.deleteOne({ token: refreshToken })
    ])

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ userId: new ObjectId(userId), token: newRefreshToken })
    )
    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async getAccount({ userId }: { userId: string }) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(userId) })
    const account = new GetAccountRes(user as User)
    return account
  }

  async loginByGoogle({ email, fullName, avatar }: { email: string; fullName: string; avatar: string }) {
    const userInDb = await databaseService.users.findOne({ email })
    if (userInDb) return this.login({ userId: userInDb._id, isEmailVerified: userInDb.isEmailVerified })
    else {
      const user = new User({
        email,
        fullName,
        password: generateRandomPassword(),
        username: generateRandomUsername(),
        avatar
      })

      const res = await databaseService.users.insertOne(user)

      return this.login({ userId: res.insertedId, isEmailVerified: user.isEmailVerified })
    }
  }

  async isExistRefreshTokenInDb({ refreshToken }: { refreshToken: string }) {
    const result = await databaseService.refreshTokens.findOne({ token: refreshToken })
    return result
  }

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

  createAccessToken = async ({ userId, isEmailVerified }: { userId: string; isEmailVerified: boolean }) => {
    const accessToken = await signToken({
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
      const refreshToken = await signToken({
        payload: { userId, isEmailVerified, exp }
      })

      return refreshToken
    }

    const refreshToken = await signToken({
      payload: { userId, isEmailVerified },
      optional: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    })

    return refreshToken
  }
}

const userService = new UserService()
export default userService
