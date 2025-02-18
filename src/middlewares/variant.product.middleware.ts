import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { REGEX } from '~/constants/regex'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { validate } from '~/utils/custom_validation'

export const validateVariantReqBody = validate(
  checkSchema({
    title: {
      trim: true,
      matches: {
        options: REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER,
        errorMessage: VALIDATE_MESSAGES.VARIANT_TITLE_REGEX
      },
      notEmpty: {
        errorMessage: VALIDATE_MESSAGES.VARIANT_TITLE_REQUIRED
      }
    },
    choices: {
      custom: {
        options: (value) => {
          const choices = value as string[]
          if (choices.length === 0)
            throw (
              (new ErrorWithStatus({
                message: VALIDATE_MESSAGES.VARIANT_CHOICES_REQUIRED,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              }),
              choices.forEach((choice) => {
                if (!choice.match(REGEX.ONLY_LETTER_AND_NUMBER))
                  throw new ErrorWithStatus({
                    message: VALIDATE_MESSAGES.VARIANT_CHOICE_REGEX,
                    status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                  })
              }))
            )
        }
      }
    }
  })
)
