import express from 'express'
import { uploadImageController } from '~/controllers/media.controller'
import { accessTokenValidator } from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const mediaRouter = express.Router()

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
mediaRouter.post('/images', accessTokenValidator, wrapRequestHandler(uploadImageController))

export default mediaRouter
