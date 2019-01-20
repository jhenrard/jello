import React from 'react'
import {connect} from 'react-redux'
import {fetchUserBoards} from '../store/boards'
import {Link} from 'react-router-dom'

class UserBoards extends React.Component {
  componentDidMount() {
    this.props.fetchUserBoards(this.props.user.id)
  }

  render() {
    return (
      <div className="board-card-container">
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
    fetchUserBoards: userId => dispatch(fetchUserBoards(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards)
