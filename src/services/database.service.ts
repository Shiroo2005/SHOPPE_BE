import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import { User } from '~/models/schemas/user.schema'

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppe.68c4b.mongodb.net/?retryWrites=true&w=majority&appName=Shoppe`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    await this.client.connect()
    console.log('Connected successfully to server')
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
