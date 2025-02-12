import express from 'express'
import { loginController, logoutController, registerController } from '~/controllers/auth.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const authRouter = express.Router()
/*
  Description: Register new user
  Method: POST
  Path: /register
  Body: {email: string, username: string, password: string,  fullName: string}
*/
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/*
  Description: Login user
  Method: POST
  Path: /login
  Body: {username: string, password: string}
  username body = username or email in user
*/
authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/*
  Description: Logout user
  Method: POST
  Path: /logout
  Header: {authorization: Bearer <accessToken>}
  Body: {refresh token: string}
*/
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

export default authRouter
