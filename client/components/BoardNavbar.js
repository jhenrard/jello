import React from 'react'
import {connect} from 'react-redux'
import {fetchBoardUsers} from '../store/boardUsers'

class BoardNavbar extends React.Component {
  componentDidMount() {
    this.props.fetchBoardUsers(this.props.board.id)
  }

  render() {
    return (
      <div className="board-navbar">
        <span>{this.props.board.name}</span>
        {this.props.boardUsers &&
          this.props.boardUsers.map(user => {
            return (
              <div className="board-navbar-item" key={user.id}>
                {user.email}
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    boardUsers: state.boardUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoardUsers: boardId => dispatch(fetchBoardUsers(boardId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardNavbar)
