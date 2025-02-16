import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { TokenPayload } from '~/models/tokenPayload'
import mediaService from '~/services/media.service'

export const uploadImageController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.decodedAuthorization as TokenPayload
  const result = await mediaService.uploadImage(req, userId)
  res.json({
    message: RESPONSE_MESSAGES.UPLOAD_IMAGE_SUCCESS,
    result
  })
}
