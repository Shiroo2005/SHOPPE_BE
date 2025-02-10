import { RequestHandler, Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export const wrapRequestHandler = <P = ParamsDictionary>(handler: RequestHandler<P>) => {
  return (req: Request<P>, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}
