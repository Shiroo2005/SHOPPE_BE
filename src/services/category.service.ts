import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateReqBody } from '~/models/req/category/CreateReqBody'
import { CategoryTree } from '~/models/categoryTree'

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
    const result = await databaseService.categories.insertOne({
      parentId: _parentId,
      image,
      name,
      updatedAt: new Date()
    })
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

  getCategoryTree = async () => {
    const categories = await databaseService.categories.find({}).toArray()

    const buildTree = ({ parentId }: { parentId: ObjectId | null }): CategoryTree[] => {
      return categories
        .filter(
          (category) =>
            (parentId === null && category.parentId === null) ||
            (category.parentId && category.parentId.equals(parentId))
        )
        .map((category) => {
          return {
            ...category,
            children: buildTree({ parentId: category._id })
          } as CategoryTree
        })
    }

    return buildTree({ parentId: null })
  }

  deleteById = async (_id: ObjectId) => {
    const result = await databaseService.categories.deleteMany({
      $or: [
        {
          _id
        },
        {
          parentId: _id
        }
      ]
    })
    return result
  }
}

const categoryService = new CategoryService()
export default categoryService
