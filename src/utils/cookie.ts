export const accessTokenCookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
  maxAge: 60 * 15 * 1000 // 15m expire
}

export const refreshTokenCookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
  maxAge: 7 * 60 * 60 * 1000 // 7d expire
}
