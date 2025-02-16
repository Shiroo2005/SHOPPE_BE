import { config } from 'dotenv'
import path from 'path'

config()
export const UPLOAD_IMAGE_FOLDER = path.resolve(process.env.UPLOAD_IMAGE_FOLDER as string)
export const TEMP_UPLOAD_IMAGE_FOLDER = path.resolve(process.env.TEMP_UPLOAD_IMAGE_FOLDER as string)

export const UPLOAD_VIDEO_FOLDER = path.resolve(process.env.UPLOAD_VIDEO_FOLDER as string)
export const TEMP_UPLOAD_VIDEO_FOLDER = path.resolve(process.env.TEMP_UPLOAD_VIDEO_FOLDER as string)
