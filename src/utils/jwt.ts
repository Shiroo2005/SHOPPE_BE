import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { DecodedGoogleToken } from '~/models/req/auth/DecodedGoogleToken'
import { TokenPayload } from '~/models/tokenPayload'
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

export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error.message)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

export const decodeToken = (token: string) => {
  const { email, name, picture } = jwt.decode(token) as DecodedGoogleToken
  return { email, name, picture }
}
