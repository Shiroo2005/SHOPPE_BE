import express from 'express'
import authRouter from './routes/auth.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
// import { defaultErrorHandler } from './middlewares/error.middleware'
const app = express()
const port = 8081

app.use(express.json())

app.use('/auth', authRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
