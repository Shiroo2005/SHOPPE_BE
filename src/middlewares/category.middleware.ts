import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/http_status'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import categoryService from '~/services/category.service'
import { validate } from '~/utils/custom_validation'

export const createCategoryValidator = validate(
  checkSchema({
    parentId: {
      isMongoId: {
        errorMessage: VALIDATE_MESSAGES.PARENT_ID_INVALID
      },
      custom: {
        options: async (value: string, { req }) => {
          const result = await categoryService.findById(new ObjectId(value))
          if (!result)
            throw new ErrorWithStatus({
              message: VALIDATE_MESSAGES.PARENT_ID_NOT_FOUND,
              status: HTTP_STATUS.BAD_REQUEST
            })
        }
      }
    },
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATE_MESSAGES.CATEGORY_NAME_REQUIRED
      },
      matches: {
        options: /^(?=.*[a-zA-Z])[a-zA-Z0-9& ]{4,20}$/,
        errorMessage: VALIDATE_MESSAGES.CATEGORY_NAME_INVALID
      }
    },
    image: {
      trim: true,
      isURL: {
        errorMessage: VALIDATE_MESSAGES.INVALID_URL
      },
      matches: {
        options: /\.(jpeg|jpg|png|gif|webp)$/i,
        errorMessage: VALIDATE_MESSAGES.IMAGE_URL_INVALID_FORMAT
      }
    }
  })
)
