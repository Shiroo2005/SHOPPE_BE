import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { CreateReqBody } from '~/models/req/category/CreateReqBody'
import categoryService from '~/services/category.service'
export const createCategoryController = async (
  req: Request<ParamsDictionary, any, CreateReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { image, name, parentId } = req.body

  const result = await categoryService.createCategory({ parentId, image, name })
  res.json({
    message: RESPONSE_MESSAGES.CATEGORY_CREATE_SUCCESS,
    result
  })
}
