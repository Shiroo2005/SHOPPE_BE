import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { CreateReqBody } from '~/models/req/category/CreateReqBody'
import { UpdateReqBody } from '~/models/req/category/UpdateReqBody'
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

export const updateCategoryController = async (
  req: Request<ParamsDictionary, any, UpdateReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { name, image, parentId } = req.body

  const result = await categoryService.updateCategory({ _id: id, name, image, parentId })
  res.json({
    message: RESPONSE_MESSAGES.CATEGORY_UPDATE_SUCCESS,
    result
  })
}

export const deleteCategoryController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  const result = await categoryService.deleteById(new ObjectId(id))

  res.json({
    message: RESPONSE_MESSAGES.CATEGORY_DELETE_SUCCESS,
    result
  })
}

export const getTreeCategoryController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await categoryService.getCategoryTree()
  res.json({
    message: RESPONSE_MESSAGES.CATEGORY_GET_TREE_SUCCESS,
    result
  })
}
