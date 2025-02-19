import { ObjectId } from 'mongodb'
import { CreateProductReqBody } from '~/models/req/products/CreateProductReqBody'
import { CreateVariantReqBody } from '~/models/req/products/CreateVariantReqBody'
import { Product } from '~/models/schemas/product.schema'
import { Variant } from '~/models/schemas/variant.schema'

export const toProduct = (payload: CreateProductReqBody, userId: string, productItemsId: ObjectId[]) => {
  return new Product({
    title: payload.title,
    description: payload.description,
    categoriesId: payload.categories,
    mainImage: payload.mainImage,
    medias: payload.medias,
    productItemsId: productItemsId,
    shopId: new ObjectId(userId),
    variantsId: payload.variants.map((variant) => new ObjectId(variant))
  })
}

export const toVariant = (title: string, choices: string[], userId: ObjectId) => {
  return new Variant({
    title,
    choices,
    createdBy: userId,
    updatedBy: userId
  })
}
