import { User } from './models/schemas/user.schema'
import { TokenPayload } from './models/tokenPayload'

declare module 'express' {
  interface Request {
    user?: User
    decodedAuthorization?: TokenPayload
    decodedRefreshToken?: TokenPayload
  }
}
