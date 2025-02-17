import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { validate } from '~/utils/custom_validation'
import { validateId, validateImage, validateName, validateParentId } from './fieldValidations/category.common'
import { UpdateReqBody } from '~/models/req/category/UpdateReqBody'

export const createCategoryValidator = validate(
  checkSchema(
    {
      parentId: validateParentId,
      name: validateName,
      image: validateImage
    },
    ['body']
  )
)

export const updateCategoryValidator = validate(
  checkSchema(
    {
      parentId: validateParentId,
      name: validateName,
      image: validateImage
    },
    ['body']
  )
)

export const idCategoryUpdateValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value, { req }) => {
            const id = value
            const { parentId } = req.body as UpdateReqBody
            if (id === parentId)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.CATEGORY_ID_MUST_DIFFERENT_PARENT_ID,
                status: HTTP_STATUS.BAD_REQUEST
              })
            await validateId(id)
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const idCategoryValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            await validateId(value)
            return true
          }
        }
      }
    },
    ['params']
  )
)
