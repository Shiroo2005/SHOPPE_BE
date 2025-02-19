import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { REGEX } from '~/constants/regex'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { validate } from '~/utils/custom_validation'

export const validateVariantReqBody = validate(
  checkSchema({
    variants: {
      isArray: {
        errorMessage: VALIDATE_MESSAGES.VARIANT_ARRAY_REQUIRED
      },
      custom: {
        options: (variants) => {
          if (!Array.isArray(variants) || variants.length === 0) {
            throw new ErrorWithStatus({
              message: VALIDATE_MESSAGES.VARIANT_ARRAY_REQUIRED,
              status: HTTP_STATUS.UNPROCESSABLE_ENTITY
            })
          }

          variants.forEach((variant) => {
            if (!variant.title || !variant.title.match(REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER)) {
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.VARIANT_TITLE_REGEX,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }

            if (!Array.isArray(variant.choices) || variant.choices.length === 0) {
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.VARIANT_CHOICES_REQUIRED,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }

            variant.choices.forEach((choice: string) => {
              if (!choice.match(REGEX.ONLY_LETTER_AND_NUMBER)) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.VARIANT_CHOICE_REGEX,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
            })
          })

          return true
        }
      }
    }
  })
)
