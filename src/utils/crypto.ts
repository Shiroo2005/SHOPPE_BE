import { createHash, randomBytes } from 'crypto'
import { config } from 'dotenv'
config()

function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function generateRandomPassword(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
    password = sha256(password)
  }

  return password
}

export function generateRandomUsername(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = ''
  const charactersLength = characters.length

  // Generate random bytes and map them to characters
  const bytes = randomBytes(length)
  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % charactersLength // Map random byte to index
    username += characters[randomIndex] // Append character to username
  }

  return username
}

export const hashPassword = (password: string) => sha256(password + process.env.PASSWORD_SECRET)
