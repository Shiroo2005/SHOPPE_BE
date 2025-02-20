import { CreateProductItemReqBody, CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import databaseService from './database.service'
import { toProduct } from '~/utils/convert'

class ProductService {
  createProduct = async (payload: CreateProductReqBody, userId: string) => {
    const productItems = await Promise.all(
      payload.productItems.map(async (productItem) => await this.createProductItem(productItem))
    )

    const result = await databaseService.products.insertOne(toProduct(payload, userId, productItems))

    const productInDb = await databaseService.products.findOne({ _id: result.insertedId })
    return productInDb
  }

  private createProductItem = async ({ price, stock, sold, choices, image }: CreateProductItemReqBody) => {
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

  getChoicesFromProductItem = (payload: CreateProductItemReqBody) => {
    const choices = payload.choices
  }
}

const productService = new ProductService()
export default productService
