import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateReqBody } from '~/models/req/category/CreateReqBody'

class CategoryService {
  async findByParentId(parentId: ObjectId) {
    const result = await databaseService.categories.findOne({ parentId })
    return result
  }

  async findById(_id: ObjectId) {
    const result = await databaseService.categories.findOne({ _id })
    return result
  }

  async createCategory({ parentId, image, name }: CreateReqBody) {
    const _parentId = parentId == null ? null : new ObjectId(parentId)
    const result = await databaseService.categories.insertOne({ parentId: _parentId, image, name })
    return result
  }

  async updateCategory({ _id, name, image, parentId }: { _id: string; name: string; image: string; parentId: string }) {
    const _parentId = parentId == null ? null : new ObjectId(parentId)

    const result = await databaseService.categories.updateOne(
      {
        _id: new ObjectId(_id)
      },
      {
        $set: {
          name,
          image,
          parentId: _parentId
        }
      }
    )

    return result
  }
}

const categoryService = new CategoryService()
export default categoryService
