import { ObjectId } from 'mongodb'
import { MEDIA_TYPE } from '~/constants/media_type'

interface MediaType {
  name: string
  type: MEDIA_TYPE
  createdAt?: Date
  createdBy: ObjectId
}

export default class Media {
  name: string
  type: MEDIA_TYPE
  createdAt: Date
  createdBy: ObjectId
  constructor(media: MediaType) {
    this.name = media.name
    this.type = media.type
    this.createdAt = media.createdAt || new Date()
    this.createdBy = media.createdBy
  }
}
