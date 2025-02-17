import { Int32, ObjectId } from 'mongodb'

interface ProductItemConstructor {
  _id?: ObjectId
  name: string
  price: number
  stock: Int32
  sold: Int32
  image: string
  choiceId?: ObjectId
}

export class ProductItem {
  _id?: ObjectId
  name: string
  price: number
  stock: Int32
  sold: Int32
  image: string
  choiceId?: ObjectId
  constructor(productItem: ProductItemConstructor) {
    this._id = productItem._id
    this.name = productItem.name
    this.price = productItem.price
    this.stock = productItem.stock
    this.sold = productItem.sold
    this.image = productItem.image
    this.choiceId = productItem.choiceId
  }
}
