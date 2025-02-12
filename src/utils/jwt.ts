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
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, optional, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}
