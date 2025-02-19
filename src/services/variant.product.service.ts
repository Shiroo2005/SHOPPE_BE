import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateVariantReqBody } from '~/models/req/products/CreateVariantReqBody'
import { toVariant } from '~/utils/convert'

class VariantService {
  createVariants = async (variantsReq: CreateVariantReqBody, userId: string) => {
    const _userId = new ObjectId(userId)
    const variants = variantsReq.variants.map((value) => toVariant(value.title, value.choices, _userId))
    const variantInDb = await databaseService.variants.insertMany(variants)

    return Object.values(variantInDb.insertedIds)
  }

  findById = async (_id: ObjectId) => {
    const result = await databaseService.variants.findOne({ _id })
    return result
  }
}

const variantService = new VariantService()
export default variantService
