import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
import {fetchBoardUsers, addUserToBoard} from '../store/boardUsers'
import {fetchAllUsers} from '../store/allUsers'

class BoardNavbar extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchBoardUsers(this.props.board.id)
    this.props.fetchAllUsers()
  }

  handleSubmit() {
    this.props.addUserToBoard(this.state.userId, this.props.board.id)
  }

  handleChange(event, {name, value}) {
    this.setState({userId: value})
  }

  render() {
    const boardUsers =
      this.props.boardUsers && this.props.boardUsers.map(user => user.id)
    const friendIdsToAdd =
      this.props.users &&
      this.props.users.map(user => user.id).reduce((available, user, index) => {
        if (boardUsers.includes(user)) return available
        return [...available, index]
      }, [])

    const friendsToAdd = []
    const availableFriends = friendIdsToAdd ? friendIdsToAdd.length : 0
    for (let i = 0; i < availableFriends; i++) {
      const friendObj = {
        text: this.props.users[friendIdsToAdd[i]].email,
        value: this.props.users[friendIdsToAdd[i]].id
      }
      friendsToAdd.push(friendObj)
    }

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
          <Form onSubmit={this.handleSubmit}>
            <Form.Select
              name="user"
              placeholder="Add a user to this board..."
              options={friendsToAdd}
              onChange={this.handleChange}
            />
            <Form.Button content="Add" />
          </Form>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.allUsers,
    boardUsers: state.boardUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoardUsers: boardId => dispatch(fetchBoardUsers(boardId)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    addUserToBoard: (userId, boardId) =>
      dispatch(addUserToBoard(userId, boardId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardNavbar)
