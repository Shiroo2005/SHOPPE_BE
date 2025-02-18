import express from 'express'
import variantRouter from './variant.routes'
import { createProductController } from '~/controllers/product.controller'
import { createProductValidator } from '~/middlewares/product.middleware'

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
productRouter.use('/', createProductValidator, createProductController)

export default productRouter
