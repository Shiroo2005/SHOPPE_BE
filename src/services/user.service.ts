import { User } from '~/models/schemas/user.schema'
import databaseService from './database.service'

class UserService {
  async findByEmailOrUsername({ email, username }: { email: string; username: string }) {
    const result = await databaseService.users.findOne({
      $or: [{ email }, { username }]
    })

    return result
  }

  async authenticate(username: string, password: string) {
    const result = await databaseService.users.findOne({
      $or: [
        {
          $and: [{ username: username, password }]
        },
        {
          $and: [{ email: username, password }]
        }
      ]
    })

    return result
  }

  async register({
    email,
    username,
    password,
    fullName
  }: {
    email: string
    username: string
    password: string
    fullName: string
  }) {
    console.log(email, username, password, fullName)

    const result = await databaseService.users.insertOne(new User({ email, username, password, fullName }))
    return result
  }
}

const userService = new UserService()
export default userService
