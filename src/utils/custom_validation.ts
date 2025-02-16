import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { HTTP_STATUS } from '~/constants/http_status'
import { EntityError, ErrorWithStatus } from '~/models/error'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    await validation.run(req)
    const result = validationResult(req)

    const errorObjects = result.array()

    console.log(errorObjects)

    const errors = errorObjects.map((error) => {
      const { msg } = error
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      return error
    })

    const entityError = new EntityError({ errors: errors })

    if (!result.isEmpty()) {
      next(entityError)
    }
    next()
  }
}
