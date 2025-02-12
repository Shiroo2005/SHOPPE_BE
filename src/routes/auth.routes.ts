import express from 'express'
import { authController } from '~/controllers/auth.controller'
import { registerValidator } from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const authRouter = express.Router()

authRouter.post('/register', registerValidator, wrapRequestHandler(authController))

export default authRouter
