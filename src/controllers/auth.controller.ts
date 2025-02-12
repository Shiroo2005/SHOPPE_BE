import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { RegisterReqBody } from '~/models/req/RegisterReqBody'
import userService from '~/services/user.service'

export const authController = async (
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
