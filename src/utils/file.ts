import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { TEMP_UPLOAD_IMAGE_FOLDER, TEMP_UPLOAD_VIDEO_FOLDER, UPLOAD_VIDEO_FOLDER } from '~/constants/dir'

export const initFolder = () => {
  ;[TEMP_UPLOAD_IMAGE_FOLDER, TEMP_UPLOAD_VIDEO_FOLDER].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }
  })
}

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: TEMP_UPLOAD_IMAGE_FOLDER,
    maxFiles: 4, // 4 image
    keepExtensions: true,
    maxFileSize: 1000 * 1024, // 1 MB
    maxTotalFileSize: 1000 * 1024 * 4, // 4 MB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'images' && mimetype?.includes('image/')
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }

      return valid as boolean
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      } else if (!files.images) {
        return reject(new Error('Image must be not empty'))
      }

      resolve(files.images as File[])
    })
  })
}

export const handleUploadVideo = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_FOLDER,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      console.log(name, originalFilename, mimetype)
      const valid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid as boolean
    }
  })

  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log(files)

      if (err) {
        return reject(err)
      } else if (!files.video) {
        return reject(new Error('Video must be not empty'))
      }

      resolve((files.video as File[])[0])
    })
  })
}

export const getNameFromFullnameMedia = (fullname: string) => {
  const _name = fullname.split('.')
  _name.pop()
  return _name.join('')
}
