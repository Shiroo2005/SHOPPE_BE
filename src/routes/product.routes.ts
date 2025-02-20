import express from 'express'
import { createProductController } from '~/controllers/product.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { createProductValidator } from '~/middlewares/variant.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const productRouter = express.Router()

productRouter.post('/', accessTokenValidator, createProductValidator, wrapRequestHandler(createProductController))

export default productRouter
