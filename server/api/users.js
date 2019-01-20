const router = require('express').Router()
const {User, Board} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/boards', async (req, res, next) => {
  try {
    const userWithBoards = await User.findOne({
      where: {id: req.params.userId},
      include: {
        model: Board
      }
    })
    res.json(userWithBoards.boards)
  } catch (error) {
    next(error)
  }
})
