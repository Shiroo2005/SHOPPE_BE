import { JwtPayload } from 'jsonwebtoken'
import { TOKEN_TYPE } from '~/constants/token_type'

export interface TokenPayload extends JwtPayload {
  userId: string
  token_type: TOKEN_TYPE
  isEmailVerified: boolean
  exp: number
}
