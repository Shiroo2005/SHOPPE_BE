import express from 'express'

const categoryRouter = express.Router()

/*
  Description: Create new category
  Method: POST
  Path: /
  Body: {
    name: string
    image: string
    parentId: string
  }
*/
categoryRouter.post('/', (req, res) => {
  res.json({ message: 'hello' })
})

export default categoryRouter
