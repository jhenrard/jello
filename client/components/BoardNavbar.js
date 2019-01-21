import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
import {fetchBoardUsers} from '../store/boardUsers'

class BoardNavbar extends React.Component {
  componentDidMount() {
    this.props.fetchBoardUsers(this.props.board.id)
  }

  render() {
    return (
      <div className="board-navbar">
        <div className="board-navbar-name">{this.props.board.name}</div>
        <nav>
          {this.props.boardUsers &&
            this.props.boardUsers.map(user => {
              return (
                <div className="board-navbar-user" key={user.id}>
                  {user.email}
                </div>
              )
            })}
          <Form>
            <Form.Select
              placeholder="Add a user to this board..."
              options={[{text: 'test friend', value: 'test friend'}]}
            />
          </Form>
        </nav>
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
