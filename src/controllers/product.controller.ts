import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import { TokenPayload } from '~/models/tokenPayload'
import databaseService from '~/services/database.service'
import productService from '~/services/product.service'

export const createProductController = async (
  req: Request<ParamsDictionary, any, CreateProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.decodedAuthorization as TokenPayload
  const payload = req.body as CreateProductReqBody

  const result = await productService.createProduct(payload, userId)
  res.json({
    message: RESPONSE_MESSAGES.CREATE_PRODUCT_SUCCESS,
    result
  })
}
