const router = require('express').Router()
const {Board, List, ListItem, BoardAssignment, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const boards = await Board.findAll({
      include: {model: List, include: {model: ListItem}}
    })
    res.json(boards)
  } catch (error) {
    next(error)
  }
})

router.get('/:boardId', async (req, res, next) => {
  try {
    const board = await Board.findOne({
      where: {id: req.params.boardId},
      include: {
        model: List,
        include: {
          model: ListItem
        }
      }
    })
    res.json(board)
  } catch (error) {
    next(error)
  }
})

router.get('/:boardId/lists', async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {boardId: req.params.boardId},
      include: {
        model: ListItem
      }
    })
    res.json(lists)
  } catch (error) {
    next(error)
  }
})

router.get('/:boardId/listItems', async (req, res, next) => {
  try {
    const listItems = await ListItem.findAll({
      include: {
        model: List,
        where: {
          boardId: req.params.boardId
        }
      }
    })
    res.json(listItems)
  } catch (error) {
    next(error)
  }
})

router.get('/:boardId/users', async (req, res, next) => {
  try {
    const boardWithUsers = await Board.findOne({
      where: {id: req.params.boardId},
      include: {
        model: User
      }
    })
    res.json(boardWithUsers.users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newBoard = await Board.create(
      {name: req.body.name},
      {returning: true}
    )
    await BoardAssignment.create({...req.body, boardId: newBoard.id})
    res.json(newBoard)
  } catch (error) {
    next(error)
  }
})

router.post('/:boardId/add-user', async (req, res, next) => {
  try {
    await BoardAssignment.create({...req.body})
    const addedUser = await User.findOne({
      where: {
        id: req.body.userId
      }
    })
    res.json(addedUser)
  } catch (error) {
    next(error)
  }
})
