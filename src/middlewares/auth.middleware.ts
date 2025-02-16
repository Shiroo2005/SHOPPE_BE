import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { RESPONSE_MESSAGES } from '~/constants/response_messages'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { LoginReqBody } from '~/models/req/auth/LoginReqBody'
import userService from '~/services/user.service'
import { validate } from '~/utils/custom_validation'
import { verifyToken } from '~/utils/jwt'

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
          options: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,20}$/
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
            return true
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

export const loginValidator = validate(
  checkSchema(
    {
      username: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.USERNAME_REQUIRED
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.PASSWORD_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            const result = await userService.authenticate((req.body as LoginReqBody).username, value)
            if (!result)
              throw new ErrorWithStatus({ message: VALIDATE_MESSAGES.LOGIN_FAILED, status: HTTP_STATUS.BAD_REQUEST })
            ;(req as Request).user = result
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema({
    accessToken: {
      custom: {
        options: async (value: string, { req }) => {
          const accessToken = value
          console.log(accessToken)

          if (accessToken === '') {
            throw new ErrorWithStatus({
              message: VALIDATE_MESSAGES.ACCESS_TOKEN_INVALID,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          try {
            const decodedAuthorization = await verifyToken({ token: accessToken })
            ;(req as Request).decodedAuthorization = decodedAuthorization
          } catch (error) {
            if (error === 'jwt expired')
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.ACCESS_TOKEN_EXPIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            throw error
          }
          return true
        }
      }
    }
  })
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refreshToken: {
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.REFRESH_TOKEN_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            const refreshToken = value.trim()

            try {
              const [decodedRefreshToken, tokenInDb] = await Promise.all([
                verifyToken({ token: refreshToken }),
                userService.isExistRefreshTokenInDb({ refreshToken })
              ])

              if (!tokenInDb)
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.REFRESH_TOKEN_INVALID,
                  status: HTTP_STATUS.BAD_REQUEST
                })
              ;(req as Request).decodedRefreshToken = decodedRefreshToken
            } catch (error) {
              if (error === 'jwt expired')
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.REFRESH_TOKEN_EXPIRED,
                  status: HTTP_STATUS.BAD_REQUEST
                })
              throw error
            }

            //check access token whether match refresh token
            const decodedAuthorization = (req as Request).decodedAuthorization
            const decodedRefreshToken = (req as Request).decodedRefreshToken
            if (decodedAuthorization && decodedAuthorization.userId != decodedRefreshToken?.userId)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.REFRESH_ACCESS_TOKEN_NOT_MATCH,
                status: HTTP_STATUS.BAD_REQUEST
              })

            return true
          }
        }
      }
    },
    ['cookies']
  )
)

export const loginByGoogleValidator = validate(
  checkSchema(
    {
      code: {
        notEmpty: {
          errorMessage: RESPONSE_MESSAGES.CODE_LOGIN_GOOGLE_NOT_FOUND
        }
      }
    },
    ['query']
  )
)
