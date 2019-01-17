const User = require('./user')
const Board = require('./board')
const List = require('./list')
const ListItem = require('./listItem')
const BoardAssignment = require('./board_assignment')

ListItem.belongsTo(List)
List.hasMany(ListItem)

List.belongsTo(Board)
Board.hasMany(List)

User.belongsToMany(Board, {through: BoardAssignment})
Board.belongsToMany(User, {through: BoardAssignment})

module.exports = {
  User,
  Board,
  List,
  ListItem,
  BoardAssignment
}
