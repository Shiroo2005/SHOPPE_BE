import { JwtPayload } from 'jsonwebtoken'

export class DecodedGoogleToken implements JwtPayload {
  email: string
  name: string
  picture: string // avatar

  constructor(token: DecodedGoogleToken) {
    this.email = token.email
    this.name = token.email
    this.picture = token.picture
  }
}
