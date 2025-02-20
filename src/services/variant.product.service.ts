import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CreateVariantReqBody } from '~/models/req/products/CreateVariantReqBody'
import { toChoices, toVariant } from '~/utils/convert'
import { UpdateVariantReqBody } from '~/models/req/products/UpdateVariantReqBody'

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

    return Object.values(variantIDDb.insertedIds)
  }

  updateVariantById = async (variantReq: UpdateVariantReqBody, userId: string, id: string) => {
    const choices = await this.createChoices(variantReq.choices)
    const result = await databaseService.variants.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          updatedBy: new ObjectId(userId),
          updatedAt: new Date(),
          choices,
          title: variantReq.title
        }
      }
    )

    return result
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
