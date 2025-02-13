import axios, { options } from 'axios'
import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { DecodedGoogleToken } from '~/models/req/auth/DecodedGoogleToken'
import { LoginReqBody } from '~/models/req/auth/LoginReqBody'
import { LogoutReqBody } from '~/models/req/auth/LogoutReqBody'
import { NewTokenReqBody } from '~/models/req/auth/NewTokenReqBody'
import { RegisterReqBody } from '~/models/req/auth/RegisterReqBody'
import { User } from '~/models/schemas/user.schema'
import { TokenPayload } from '~/models/tokenPayload'
import userService from '~/services/user.service'
import { decodeToken, signToken } from '~/utils/jwt'
config()
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, fullName, password, username } = req.body
  const result = await userService.register({ email, username, password, fullName })
  res.json({
    message: RESPONSE_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User

  const result = await userService.login({
    userId: user._id as ObjectId,
    isEmailVerified: user.isEmailVerified
  })
  res.json({
    message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body
  const result = await userService.logout({ refreshToken })
  res.json({
    message: RESPONSE_MESSAGES.LOGOUT_SUCCESS,
    result
  })
}

export const newTokenController = async (
  req: Request<ParamsDictionary, any, NewTokenReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body
  const decodedRefreshToken = req.decodedRefreshToken as TokenPayload
  const { userId, exp, isEmailVerified } = decodedRefreshToken as TokenPayload
  const result = await userService.newToken({ userId, exp, isEmailVerified, refreshToken })
  res.json({
    message: RESPONSE_MESSAGES.NEW_TOKEN_SUCCESS,
    result
  })
}

export const getAccountController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = (req as Request).decodedAuthorization as TokenPayload

  const result = await userService.getAccount({ userId })
  res.json({
    message: RESPONSE_MESSAGES.GET_ACCOUNT_SUCCESS,
    result
  })
}

export const loginGoogleController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code

  const tokenResponse = await axios.post(process.env.GOOGLE_TOKEN_URL as string, null, {
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
      code: code
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })

  const { id_token } = tokenResponse.data

  const data = decodeToken(id_token) as DecodedGoogleToken

  const result = await userService.loginByGoogle({ email: data.email, fullName: data.name, avatar: data.picture })
  // res.json({
  //   message: RESPONSE_MESSAGES.LOGIN_GOOGLE_SUCCESS,
  //   result
  // })

  res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 80 * 1000 }) // 7d expire
  res.cookie('refreshToken', result.refreshToken)

  res.redirect(process.env.FE_URL as string)
}
