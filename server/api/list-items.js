const router = require('express').Router()
const {ListItem} = require('../db/models')
module.exports = router

router.put('/:itemId', async (req, res, next) => {
  try {
    const updatedListItem = await ListItem.update(req.body, {
      where: {
        id: req.params.itemId
      },
      returning: true
    })
    res.json(updatedListItem[1][0])
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newListItem = await ListItem.create(req.body, {returning: true})
    res.json(newListItem)
  } catch (error) {
    next(error)
  }
})