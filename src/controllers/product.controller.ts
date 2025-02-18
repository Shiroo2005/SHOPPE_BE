import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const createProductController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  res.json({})
}
