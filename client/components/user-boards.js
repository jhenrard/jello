import React from 'react'
import {connect} from 'react-redux'
import {fetchUserBoards, createBoard} from '../store/boards'
import {Link} from 'react-router-dom'

class UserBoards extends React.Component {
  constructor() {
    super()
    this.createBoard = this.createBoard.bind(this)
  }

  componentDidMount() {
    this.props.fetchUserBoards(this.props.user.id)
  }

  createBoard(userId) {
    this.props.createBoard(userId)
  }

  render() {
    return (
      <div>
        <div
          className="create-board-button"
          onClick={() => this.createBoard(this.props.user.id)}
        >
          Create Board
        </div>
        {this.props.boards &&
          this.props.boards.map(board => {
            return (
              <Link key={board.id} to={`/boards/${board.id}`}>
                <span className="board-card">{board.name}</span>
              </Link>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserBoards: userId => dispatch(fetchUserBoards(userId)),
    createBoard: userId => dispatch(createBoard(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards)
