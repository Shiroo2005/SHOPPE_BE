import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()
export const signToken = ({
  payload,
  secretOrPrivateKey = process.env.JWT_SECRET as string,
  optional
}: {
  payload: string | Buffer | object
  secretOrPrivateKey?: string
  optional?: SignOptions
}) => {
  optional = { ...optional, algorithm: 'HS256' }
  const token = jwt.sign(payload, secretOrPrivateKey, optional)
  return token
}
