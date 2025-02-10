import express from 'express'
import { loginValidator } from '~/middlewares/auth.middlewares'

const authRouter = express.Router()

authRouter.get('/', loginValidator, (req, res) => {
  res.send('hello world')
})

export default authRouter
