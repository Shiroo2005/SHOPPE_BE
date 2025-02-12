import express from 'express'
import { loginController, registerController } from '~/controllers/auth.controller'
import { loginValidator, registerValidator } from '~/middlewares/auth.middleware'
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

export default authRouter
