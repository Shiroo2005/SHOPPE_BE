import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateVariantReqBody } from '~/models/req/products/CreateVariantReqBody'
import { toChoices, toVariant } from '~/utils/convert'

class VariantService {
  createVariants = async (variantsReq: CreateVariantReqBody, userId: string) => {
    const _userId = new ObjectId(userId)

    const variants = await Promise.all(
      variantsReq.variants.map(async (value) => {
        const choices = await this.createChoices(value.choices)
        return toVariant(value.title, choices, _userId)
      })
    )
    const variantIDDb = await databaseService.variants.insertMany(variants)
    const variantInDb = await databaseService.variants.find({
      _id: {
        $in: Object.values(variantIDDb.insertedIds)
      }
    })
    return variantInDb.toArray()
  }

  createChoices = async (choices: string[]) => {
    const result = await databaseService.choices.insertMany(choices.map((choice) => toChoices(choice)))
    return Object.values(result.insertedIds)
  }

  findById = async (_id: ObjectId) => {
    const result = await databaseService.variants.findOne({ _id })
    return result
  }
}

const variantService = new VariantService()
export default variantService
