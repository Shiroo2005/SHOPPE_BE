import express from 'express'
import authRouter from './routes/auth.routes'
import { defaultErrorHandler } from './middlewares/error.middleware'
import databaseService from './services/database.service'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import categoryRouter from './routes/category.routes'

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

app.use(cookieParser())
app.use(express.json())

databaseService.connect()

app.use('/auth', authRouter)
app.use('/category', categoryRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
