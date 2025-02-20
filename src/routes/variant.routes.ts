import express from 'express'
import { CreateVariantController } from '~/controllers/variant.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { idVariantUpdateReqBody, validateVariantReqBody } from '~/middlewares/variant.product.middleware'
import { wrapRequestHandler } from '~/utils/handler'

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
variantRouter.post('/', accessTokenValidator, validateVariantReqBody, wrapRequestHandler(CreateVariantController))

variantRouter.put(
  '/:id',
  accessTokenValidator,
  idVariantUpdateReqBody,
  validateVariantReqBody,
  wrapRequestHandler(CreateVariantController)
)

export default variantRouter
