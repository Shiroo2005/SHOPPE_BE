import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/http_status'
import { REGEX } from '~/constants/regex'
import { VALIDATE_MESSAGES } from '~/constants/validate_messages'
import { ErrorWithStatus } from '~/models/error'
import { CreateProductReqBody, ProductItemReqBody } from '~/models/req/product/createProductReqBody'
import categoryService from '~/services/category.service'
import variantService from '~/services/variant.service'
import { validate } from '~/utils/custom_validation'
import { trimArray } from '~/utils/helper'

export const createProductValidator = validate(
  checkSchema(
    {
      title: {
        matches: {
          options: [new RegExp(REGEX.CONTAIN_NUMBER_LETTER_UNICODE, 'u')], // Chuyển thành regex object
          errorMessage: VALIDATE_MESSAGES.PRODUCT_TITLE_REGEX
        },
        isLength: {
          options: { min: 4, max: 100 },
          errorMessage: VALIDATE_MESSAGES.PRODUCT_TITLE_LENGTH
        }
      },
      categories: {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_CATEGORY_ARRAY
        },
        customSanitizer: {
          options: (value) => {
            return trimArray(value)
          }
        },
        custom: {
          options: async (value: string[]) => {
            if (value.length === 0) {
              throw new ErrorWithStatus({
                message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_NOT_EMPTY,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }

            for (const id of value) {
              if (!(typeof id == 'string') || !ObjectId.isValid(id)) {
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_CATEGORY_INVALID,
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
          options: { min: 20, max: 200 },
          errorMessage: VALIDATE_MESSAGES.PRODUCT_TITLE_LENGTH
        },
        isString: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_DESC_STRING
        }
      },
      variants: {
        optional: true,
        isArray: {
          options: { min: 1 },
          errorMessage: 'Variants phải là một mảng và có ít nhất một phần tử'
        },
        custom: {
          options: (value: string[]) => {
            value.forEach((variant) => {
              if (!(typeof variant == 'string'))
                throw new ErrorWithStatus({
                  message: 'Variant phải là mảng chứa phần tử dạng string',
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
            })
            return true
          }
        }
      },
      productItems: {
        isArray: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_ITEM_ARRAY
        },
        notEmpty: {
          errorMessage: VALIDATE_MESSAGES.PRODUCT_ITEM_NOT_EMPTY
        },
        custom: {
          options: (value, { req }) => {
            const variantNumber = (req.body as CreateProductReqBody).variants.length
            ;(value as ProductItemReqBody[]).forEach((item) => {
              if (item.choices.length !== variantNumber)
                throw new ErrorWithStatus({
                  message: VALIDATE_MESSAGES.PRODUCT_CHOICES_NUMBER_MATCH,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
            })
            return true
          }
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
        custom: {
          options: (value: string[], { req }) => {
            if (!value.every((choice) => typeof choice === 'string')) {
              throw new Error(VALIDATE_MESSAGES.PRODUCT_CHOICES_ITEM_INVALID)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
