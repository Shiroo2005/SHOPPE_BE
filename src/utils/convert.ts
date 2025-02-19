import { ObjectId } from 'mongodb'
import { CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import { Product } from '~/models/schemas/product.schema'

export const toProduct = (
  payload: CreateProductReqBody,
  userId: string,
  variantsId: ObjectId[],
  productItemsId: ObjectId[]
) => {
  return new Product({
    title: payload.title,
    description: payload.description,
    categoriesId: payload.categories,
    mainImage: payload.mainImage,
    medias: payload.medias,
    productItemsId: productItemsId,
    shopId: new ObjectId(userId),
    variantsId
  })
}
