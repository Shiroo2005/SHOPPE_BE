import { options } from 'axios'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/http_status'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import categoryService from '~/services/category.service'

export const validateParentId = {
  custom: {
    options: async (value: string) => {
      if (!value) return true
      if (!ObjectId.isValid(value)) {
        throw new ErrorWithStatus({
          message: VALIDATE_MESSAGES.CATEGORY_PARENT_ID_INVALID,
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY
        })
      }
      const result = await categoryService.findById(new ObjectId(value))
      if (!result) {
        throw new ErrorWithStatus({
          message: VALIDATE_MESSAGES.CATEGORY_PARENT_ID_NOT_FOUND,
          status: HTTP_STATUS.BAD_REQUEST
        })
      }
      return true
    }
  }
}

export const validateName = {
  trim: true,
  notEmpty: {
    errorMessage: VALIDATE_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  matches: {
    options: /^(?=.*[a-zA-Z])[a-zA-Z0-9& ]{4,20}$/,
    errorMessage: VALIDATE_MESSAGES.CATEGORY_NAME_INVALID
  }
}
export const validateImage = {
  trim: true,
  isURL: {
    errorMessage: VALIDATE_MESSAGES.INVALID_URL
  },
  matches: {
    options: /\.(jpeg|jpg|png|gif|webp)$/i,
    errorMessage: VALIDATE_MESSAGES.IMAGE_URL_INVALID_FORMAT
  }
}

export const validateId = async (value: string) => {
  const id = value
  if (!ObjectId.isValid(id))
    throw new ErrorWithStatus({
      message: VALIDATE_MESSAGES.CATEGORY_ID_INVALID,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY
    })

  const result = await categoryService.findById(new ObjectId(id))
  if (!result) {
    throw new ErrorWithStatus({
      message: VALIDATE_MESSAGES.CATEGORY_ID_NOT_FOUND,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
  return true
}
