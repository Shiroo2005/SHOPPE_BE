import express from 'express'
import authRouter from './routes/auth.routes'
import { defaultErrorHandler } from './middlewares/error.middleware'
import databaseService from './services/database.service'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import categoryRouter from './routes/category.routes'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { UPLOAD_IMAGE_FOLDER } from './constants/dir'

config()
const app = express()
const port = 8081
app.use(
  cors({
    origin: process.env.HOST_FE || 'http://localhost:3000', // Thêm fallback nếu HOST_FE không hoạt động
    credentials: true, // Nếu có dùng cookies hoặc session
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Chỉ định các phương thức HTTP cho phép
    allowedHeaders: ['Content-Type', 'Authorization'] // Chỉ định các headers cho phép
  })
)

initFolder()
app.use('/static/images', express.static(UPLOAD_IMAGE_FOLDER))
app.use(cookieParser())
app.use(express.json())

databaseService.connect()

app.use('/auth', authRouter)
app.use('/categories', categoryRouter)
app.use('/media', mediaRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
