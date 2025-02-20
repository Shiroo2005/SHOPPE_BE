import { ObjectId } from 'mongodb'
import databaseService from './database.service'

class VariantService {
  findById = async (_id: ObjectId) => {
    const result = await databaseService.variants.findOne({ _id })
    return result
  }
}

const variantService = new VariantService()
export default variantService
