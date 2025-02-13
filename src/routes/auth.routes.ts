import express from 'express'
import {
  getAccountController,
  loginController,
  loginGoogleController,
  logoutController,
  newTokenController,
  registerController
} from '~/controllers/auth.controller'
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

/*
  Description: Get new token
  Method: POST
  Header: {authorization: Bearer <accessToken>}
  Body: {refresh token: string}
*/
authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(newTokenController))

/*
  Description: Get info account
  Method: POST
  Header: {authorization: Bearer <accessToken>}
*/
authRouter.get('/account', accessTokenValidator, wrapRequestHandler(getAccountController))

/*
  Description: Login with google
  Method: POST
  Query: {code : string}
  // if email not exist any user in db, will create new user with its mail
*/
authRouter.get('/login-google', wrapRequestHandler(loginGoogleController))

export default authRouter
