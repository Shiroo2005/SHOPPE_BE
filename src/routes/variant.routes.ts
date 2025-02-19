import express from 'express'
import { CreateVariantController } from '~/controllers/variant.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { validateVariantReqBody } from '~/middlewares/variant.product.middleware'

const variantRouter = express.Router()

/*
  Description: Create new variant
  Method: POST
  Path: /
  Cookie: {accessToken: string}
  Body: {
    variant: {title: string, name: string[]} []
  }

*/
variantRouter.post('/', accessTokenValidator, validateVariantReqBody, CreateVariantController)

export default variantRouter
