const router = require('express').Router()
const {List} = require('../db/models')
module.exports = router

router.put('/:listId', async (req, res, next) => {
  try {
    const updatedList = await List.update(req.body, {
      where: {
        id: req.params.listId
      },
      returning: true
    })
    res.json(updatedList[1][0])
  } catch (error) {
    next(error)
  }
})
