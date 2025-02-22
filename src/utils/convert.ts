import { ObjectId } from 'mongodb'
import { CreateProductReqBody } from '~/models/req/product/CreateProductReqBody'
import { Choice } from '~/models/schemas/choices.schema'
import { Product } from '~/models/schemas/product.schema'
import { Variant } from '~/models/schemas/variant.schema'

export const toProduct = (payload: CreateProductReqBody, userId: string, productItemIds: ObjectId[], variantIds: ObjectId[]) => {
  return new Product({
    title: payload.title,
    description: payload.description,
    categoriesId: payload.categories,
    mainImage: payload.mainImage,
    medias: payload.medias,
    productItemIds: productItemIds,
    shopId: new ObjectId(userId),
    variantIds
  })
}


