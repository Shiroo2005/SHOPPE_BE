import { ObjectId } from 'mongodb'
import { MEDIA_TYPE } from '~/constants/media_type'

interface MediaType {
  url: string
  type: MEDIA_TYPE
  createdAt?: Date
  createdBy: ObjectId
}

export default class Media {
  url: string
  type: MEDIA_TYPE
  createdAt: Date
  createdBy: ObjectId
  constructor(media: MediaType) {
    this.url = media.url
    this.type = media.type
    this.createdAt = media.createdAt || new Date()
    this.createdBy = media.createdBy
  }
}
