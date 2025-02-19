import databaseService from './database.service'

class VariantService {
  createVariant = async ({ title, choices }: { title: string; choices: string[] }) => {
    const variantInDb = await databaseService.variants.insertOne({ title, choices })

    return {
      variantInDb
    }
  }
}

const variantService = new VariantService()
export default variantService
