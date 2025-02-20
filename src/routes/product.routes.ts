import express from 'express'
import variantRouter from './variant.routes'
import { createProductController } from '~/controllers/product.controller'
import { createProductItemValidator, createProductValidator } from '~/middlewares/product.middleware'
import { accessTokenValidator } from '~/middlewares/auth.middleware'

const productRouter = express.Router()

productRouter.use('/variants', variantRouter)

/*
  Description: Create new product
  Method: POST
  Path: /
  Cookie: {accessToken: string}
  Body: {
    title: string
    medias: string[]
    categoryIds: string[]
    description: string
    variant: string[]
    productItems: CreateProductItemReqBody[]
  }

  CreateProductItemReqBody {
    price: number
    stock: Int32
    sold: Int32
    image: string
    choices: string[]
  }
*/
productRouter.post(
  '/',
  accessTokenValidator,
  createProductValidator,
  createProductItemValidator,
  createProductController
)

export default productRouter
