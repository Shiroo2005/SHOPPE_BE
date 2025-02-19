import { CreateProductItemReqBody, CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import variantService from './variant.product.service'
import databaseService from './database.service'
import { Product } from '~/models/schemas/product.schema'
import { toProduct } from '~/utils/convert'
import categoryService from './category.service'

class ProductService {
  createProduct = async (payload: CreateProductReqBody, userId: string) => {
    const productItems = await Promise.all(
      payload.productItems.map(async (productItem) => await this.createProductItem(productItem))
    )

    const variantInDb = await this.createVariants(payload.productItems, payload.variants)

    const result = await databaseService.products.insertOne(toProduct(payload, userId, variantInDb, productItems))

    return {
      productItems,
      variantInDb,
      result
    }
  }

  createProductItem = async ({ price, stock, sold, choices, image }: CreateProductItemReqBody) => {
    const result = await databaseService.productItems.insertOne({
      price,
      stock,
      sold,
      choices,
      image
    })

    return result.insertedId
  }

  createVariants = async (payload: CreateProductItemReqBody[], variants: string[]) => {
    const choices = payload.reduce((acc: string[][], item) => {
      item.choices.forEach((value, idx) => {
        if (!acc[idx]) {
          acc[idx] = []
        }
        acc[idx].push(value)
      })

      return acc
    }, [])

    const result = await Promise.all(
      variants.map(async (value, idx) => await variantService.createVariant({ title: value, choices: choices[idx] }))
    )

    return result.map((item) => item.variantInDb.insertedId)
  }

  getChoicesFromProductItem = (payload: CreateProductItemReqBody) => {
    const choices = payload.choices
  }
}

const productService = new ProductService()
export default productService
