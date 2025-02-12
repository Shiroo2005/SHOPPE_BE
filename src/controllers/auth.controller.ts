import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { LoginReqBody } from '~/models/req/auth/LoginReqBody'
import { LogoutReqBody } from '~/models/req/auth/LogoutReqBody'
import { RegisterReqBody } from '~/models/req/auth/RegisterReqBody'
import { User } from '~/models/schemas/user.schema'
import userService from '~/services/user.service'
import { signToken } from '~/utils/jwt'

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
