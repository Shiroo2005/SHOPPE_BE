import { checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/custom_validation'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USER_MESSAGES.EMAIL_NOT_EMPTY
        }
      },
      password: {
        notEmpty: {
          errorMessage: USER_MESSAGES.EMAIL_NOT_EMPTY
        }
      }
    },
    ['body']
  )
)
