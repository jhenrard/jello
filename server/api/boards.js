const router = require('express').Router()
const {Board, List, ListItem} = require('../db/models')
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
