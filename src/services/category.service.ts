import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateReqBody } from '~/models/req/category/CreateReqBody'

class CategoryService {
  async findById(_id: ObjectId) {
    const result = await databaseService.categories.findOne({ _id })
    return result
  }

  async createCategory({ parentId, image, name }: CreateReqBody) {
    const result = await databaseService.categories.insertOne({ parentId: new ObjectId(parentId), image, name })
    return result
  }
}

const categoryService = new CategoryService()
export default categoryService
