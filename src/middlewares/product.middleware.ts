import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/http_status'
import { REGEX } from '~/constants/regex'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import categoryService from '~/services/category.service'
import variantService from '~/services/variant.product.service'
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
          options: async (value: string[]) => {
            if (value.length === 0) {
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_NOT_EMPTY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }

            for (const id of value) {
              if (!ObjectId.isValid(id)) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_IS_INVALID,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }

              const categoryExists = await categoryService.findById(new ObjectId(id))
              if (!categoryExists) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_NOT_FOUND,
                  status: HTTP_STATUS.BAD_REQUEST
                })
              }
            }

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
        isString: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_DESCRIPTION_INVALID
        }
      },
      variants: {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_VARIANT_IS_ARRAY
        },
        custom: {
          options: async (value: string[]) => {
            if (value.length === 0)
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_VARIANT_NOT_EMPTY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })

            for (const id of value) {
              if (!ObjectId.isValid(id)) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_VARIANT_INVALID,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }

              const variantExitsts = await variantService.findById(new ObjectId(id))
              if (!variantExitsts) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_VARIANT_NOT_FOUND,
                  status: HTTP_STATUS.BAD_REQUEST
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
