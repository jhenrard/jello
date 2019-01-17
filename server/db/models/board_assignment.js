const Sequelize = require('sequelize')
const db = require('../db')

const BoardAssignment = db.define('board_assignment', {
  owner: Sequelize.BOOLEAN
})

module.exports = BoardAssignment
