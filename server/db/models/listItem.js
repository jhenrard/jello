const Sequelize = require('sequelize')
const db = require('../db')

const ListItem = db.define('listItem', {
  title: Sequelize.STRING,
  order: Sequelize.INTEGER,
  description: Sequelize.STRING
})

module.exports = ListItem
