import { Int32, ObjectId } from 'mongodb'

interface ProductItemConstructor {
  _id?: ObjectId
  price: number
  stock: Int32
  sold: Int32
  image: string
  choiceIds?: ObjectId
}

export class ProductItem {
  _id?: ObjectId
  price: number
  stock: Int32
  sold: Int32
  image: string
  choiceIds?: ObjectId
  constructor(productItem: ProductItemConstructor) {
    this._id = productItem._id
    this.price = productItem.price
    this.stock = productItem.stock
    this.sold = productItem.sold
    this.image = productItem.image
    this.choiceIds = productItem.choiceIds
  }
}
