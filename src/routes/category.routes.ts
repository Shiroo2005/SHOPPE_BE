import express from 'express'
import { createCategoryController } from '~/controllers/category.controller'
import { createCategoryValidator } from '~/middlewares/category.middleware'
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

export default categoryRouter
