import { CreateVariantReqBody } from '~/models/req/products/CreateVariantReqBody'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/tokenPayload'
import { NextFunction, Request, Response } from 'express'
import variantService from '~/services/variant.product.service'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
export const CreateVariantController = async (
  req: Request<ParamsDictionary, any, CreateVariantReqBody>,
  res: Response,
  next: NextFunction
) => {
  const variants = req.body
  const { userId } = req.decodedAuthorization as TokenPayload

  const result = await variantService.createVariants(variants, userId)
  res.json({
    message: RESPONSE_MESSAGES.CREATE_VARIANT_SUCCESS,
    result
  })
}
