import express from 'express'
import { createProductValidator } from '~/middlewares/variant.middleware'

const productRouter = express.Router()

productRouter.post('/', createProductValidator, (req, res) => {
  res.json({})
})

export default productRouter
