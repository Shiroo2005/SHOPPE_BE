import { ObjectId } from 'mongodb'
import databaseService from './database.service'

class CategoryService {
  async findById(_id: ObjectId) {
    const result = await databaseService.categories.findOne({ _id })
    return result
  }
}

const categoryService = new CategoryService()
export default categoryService
