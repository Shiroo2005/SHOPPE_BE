import { CreateProductReqBody, ProductItemReqBody } from '~/models/req/product/CreateProductReqBody'
import databaseService from './database.service'
import { toProduct } from '~/utils/convert'
import { Variant } from '~/models/schemas/variant.schema'
import { ObjectId } from 'mongodb'
import { Choice } from '~/models/schemas/choices.schema'

class ProductService {
  createProduct = async (payload: CreateProductReqBody, userId: string) => {
    const variantInDb = await databaseService.variants.insertMany(
      payload.variants.map(
        (variant) =>
          new Variant({
            name: variant
          })
      )
    )

    const variantIds = Object.values(variantInDb.insertedIds)
    const choices = this.convertToChoiceMatch(payload.productItems)
    let choiceIds = await Promise.all(choices.map((choice, idx) => this.createChoices(choice, variantIds[idx])))

    //revert choices
    choiceIds = this.revertChoice(choiceIds)
    const productItemIds = await Promise.all(
      payload.productItems.map((productItem, idx) => this.createProductItem(productItem, choiceIds[idx]))
    )
    const result = await databaseService.products.insertOne(toProduct(payload, userId, productItemIds))

    const productInDb = await databaseService.products.findOne({ _id: result.insertedId })
    return productInDb
  }

  private convertToChoiceMatch = (productItems: ProductItemReqBody[]) => {
    return productItems.reduce((acc: string[][], item) => {
      item.choices.forEach((choice: string, idx) => {
        if (!acc[idx]) acc[idx] = []
        acc[idx].push(choice)
      })
      return acc
    }, [] as string[][])
  }

  private revertChoice = (choices: ObjectId[][]) => {
    return choices.reduce((acc: ObjectId[][], choice) => {
      choice.forEach((item, idx) => {
        if (!acc[idx]) acc[idx] = []
        acc[idx].push(item)
      })
      return acc
    }, [] as ObjectId[][])
  }

  private createChoices = async (choices: string[], variantId: ObjectId) => {
    const result = await databaseService.choices.insertMany(
      choices.map(
        (choice) =>
          new Choice({
            name: choice,
            variant: variantId
          })
      )
    )

    return Object.values(result.insertedIds)
  }

  private createProductItem = async ({ price, stock, sold, image }: ProductItemReqBody, choices: ObjectId[]) => {
    const result = await databaseService.productItems.insertOne({
      price,
      stock,
      sold,
      choices,
      image
    })

    return result.insertedId
  }

  // createVariants = async (payload: CreateProductItemReqBody[], variants: string[]) => {
  //   const choices = payload.reduce((acc: string[][], item) => {
  //     item.choices.forEach((value, idx) => {
  //       if (!acc[idx]) {
  //         acc[idx] = []
  //       }
  //       acc[idx].push(value)
  //     })

  //     return acc
  //   }, [])

  //   const result = await Promise.all(
  //     variants.map(async (value, idx) => await variantService.createVariant({ title: value, choices: choices[idx] }))
  //   )

  //   return result.map((item) => item.variantInDb.insertedId)
  // }
}

const productService = new ProductService()
export default productService
