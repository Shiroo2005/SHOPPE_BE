import { checkSchema } from 'express-validator'
import { HTTP_STATUS } from '~/constants/http_status'
import { REGEX } from '~/constants/regex'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { validate } from '~/utils/custom_validation'

export const createProductValidator = validate(
  checkSchema(
    {
      title: {
        matches: {
          options: REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER,
          errorMessage: VALIDATE_MESSAGES.PRODUCT_TITLE_REX
        },
        isLength: {
          options: {
            min: 4,
            max: 100
          },
          errorMessage: `${VALIDATE_MESSAGES.MIN_LENGTH_4} and ${VALIDATE_MESSAGES.MAX_LENGTH_100}`
        }
      },
      categories: {
        custom: {
          options: (value: string[]) => {
            if (value.length === 0)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_NOT_EMPTY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })

            value.forEach((category) => {
              if (!category.match(REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER))
                throw new ErrorWithStatus({
                  message: `Category ${VALIDATE_MESSAGES.CONTAIN_ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_AT_LEAST_1_LETTER}`,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              else if (category.length > 100)
                throw new ErrorWithStatus({
                  message: `Category ${VALIDATE_MESSAGES.MAX_LENGTH_100}`,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
            })
            return true
          }
        }
      },
      description: {
        trim: true,
        isLength: {
          options: {
            min: 20,
            max: 200
          },
          errorMessage: `Description ${VALIDATE_MESSAGES.MIN_LENGTH} 20 and ${VALIDATE_MESSAGES.MAX_LENGTH} 200`
        },
        matches: {
          options: REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER,
          errorMessage: VALIDATE_MESSAGES.CONTAIN_ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_AT_LEAST_1_LETTER
        }
      },
      variants: {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_VARIANT_IS_ARRAY
        },
        custom: {
          options: (value: string[]) => {
            if (value.length === 0)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_VARIANT_NOT_EMPTY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })

            value.forEach((variant) => {
              if (!variant.match(REGEX.ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_ONE_LETTER)) {
                throw new ErrorWithStatus({
                  message: `Variant ${VALIDATE_MESSAGES.CONTAIN_ONLY_LETTER_NUMBER_AND_MUST_CONTAIN_AT_LEAST_1_LETTER}`,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
            })
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const createProductItemValidator = validate(
  checkSchema(
    {
      productItems: {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_ITEM_IS_ARRAY
        },
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_ITEM_NOT_EMPTY
        }
      },
      'productItems.*.price': {
        isFloat: {
          options: { gt: 0 },
          errorMessage: VALIDATE_MESSAGES.PRICE_POSITIVE
        }
      },
      'productItems.*.stock': {
        isInt: {
          options: { min: 0 },
          errorMessage: VALIDATE_MESSAGES.STOCK_NON_NEGATIVE
        }
      },
      'productItems.*.sold': {
        isInt: {
          options: { min: 0 },
          errorMessage: VALIDATE_MESSAGES.SOLD_NON_NEGATIVE
        }
      },
      'productItems.*.image': {
        optional: true,
        isString: {
          errorMessage: VALIDATE_MESSAGES.IMAGE_STRING
        },
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.IMAGE_NOT_EMPTY
        }
      },
      'productItems.*.choices': {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_CHOICES_ARRAY
        },
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_CHOICES_NOT_EMPTY
        },
        custom: {
          options: (value: string[]) => {
            if (!Array.isArray(value)) {
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_CHOICES_ARRAY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }

            for (const choice of value) {
              if (typeof choice !== 'string' || choice.trim() === '') {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_CHOICES_ITEM_NOT_EMPTY,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
