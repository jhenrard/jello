const Sequelize = require('sequelize')
const db = require('../db')

const Board = db.define('board', {
  name: Sequelize.STRING
})

module.exports = Board
