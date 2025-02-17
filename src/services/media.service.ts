import { Request } from 'express'
import { ObjectId } from 'mongodb'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_FOLDER } from '~/constants/dir'
import { MEDIA_TYPE } from '~/constants/media_type'
import Media from '~/models/schemas/media.schema'
import { getNameFromFullnameMedia, handleUploadImage } from '~/utils/file'
import databaseService from './database.service'

class MediaService {
  uploadImage = async (req: Request, userId: string) => {
    const files = await handleUploadImage(req)

    const medias = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullnameMedia(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_FOLDER, `${newName}.jpeg`)

        await sharp(file.filepath).jpeg().toFile(newPath)
        const media = new Media({
          createdBy: new ObjectId(userId),
          type: MEDIA_TYPE.IMAGE,
          name: `${newName}.jpeg`
        })
        return media
      })
    )
    await databaseService.medias.insertMany(medias)
    return medias
  }
}

const mediaService = new MediaService()
export default mediaService
