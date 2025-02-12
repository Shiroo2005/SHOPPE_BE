import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()
export const signToken = ({
  payload,
  secretOrPrivateKey = process.env.JWT_SECRET as string,
  optional = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  secretOrPrivateKey?: string
  optional?: SignOptions
}) => {
  const token = jwt.sign(payload, secretOrPrivateKey, optional)
  return token
}
