const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('list', {
  title: Sequelize.STRING,
  order: Sequelize.INTEGER
})

module.exports = List
