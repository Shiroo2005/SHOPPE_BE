import express from 'express'
import {
  createCategoryController,
  getTreeCategoryController,
  updateCategoryController
} from '~/controllers/category.controller'
import {
  createCategoryValidator,
  idCategoryUpdateValidator,
  updateCategoryValidator
} from '~/middlewares/category.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const categoryRouter = express.Router()

/*
  Description: Create new category
  Method: POST
  Path: /
  Body: {
    name: string
    image: string
    parentId: string
  }
*/
categoryRouter.post('/', createCategoryValidator, wrapRequestHandler(createCategoryController))

/*
  Description: Update category
  Method: PUT
  Path: /:id
  Body: {
    name: string
    image: string
    parentId: string
  }
*/
categoryRouter.put(
  '/:id',
  updateCategoryValidator,
  idCategoryUpdateValidator,
  wrapRequestHandler(updateCategoryController)
)

categoryRouter.get('/tree', wrapRequestHandler(getTreeCategoryController))

export default categoryRouter
