import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import userService from '~/services/user.service'
import { validate } from '~/utils/custom_validation'

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.EMAIL_NOT_EMPTY
        },
        isEmail: {
          errorMessage: VALIDATE_MESSAGES.EMAIL_INVALID
        }
      },
      username: {
        trim: true,
        isLength: {
          options: {
            min: 4
          }
        },
        matches: {
          options: /[a-zA-z]/
        },
        errorMessage: VALIDATE_MESSAGES.USERNAME_MIN_LENGTH_AND_LETTER,
        custom: {
          options: async (value, { req }) => {
            const user = await userService.findByEmailOrUsername({ email: req.body.email as string, username: value })
            if (user)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.EMAIL_OR_USERNAME_EXISTS,
                status: HTTP_STATUS.BAD_REQUEST
              })
          }
        }
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 0,
            minNumbers: 0,
            minSymbols: 0
          },
          errorMessage: VALIDATE_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      fullName: {
        trim: true,
        isLength: {
          options: {
            min: 4
          }
        },
        matches: {
          options: /[a-zA-z]/
        },
        errorMessage: VALIDATE_MESSAGES.FULLNAME_MIN_LENGTH_AND_LETTER
      }
    },
    ['body']
  )
)
