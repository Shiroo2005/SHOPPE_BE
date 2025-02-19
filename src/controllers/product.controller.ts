import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import { TokenPayload } from '~/models/tokenPayload'
import productService from '~/services/product.service'

export const createProductController = async (
  req: Request<ParamsDictionary, any, CreateProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.decodedAuthorization as TokenPayload
  const payload = req.body as CreateProductReqBody

  console.log(await productService.createProduct(payload))

  res.json({})
}
