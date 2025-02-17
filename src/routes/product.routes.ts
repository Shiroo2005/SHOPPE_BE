import express from 'express'

const productRouter = express.Router()

productRouter.post('/variations', (req, res) => {
  res.json({})
})

export default productRouter
