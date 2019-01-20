import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'semantic-ui-react'
import {fetchUserBoards, createBoard} from '../store/boards'
import {Link} from 'react-router-dom'
import Test from './test'
import AddBoard from './AddBoard'

class UserBoards extends React.Component {
  componentDidMount() {
    this.props.fetchUserBoards(this.props.user.id)
  }

  render() {
    return (
      <div className="home-container">
        <AddBoard />
        {/* <Button color="blue" active onClick={() => this.createBoard(this.props.user.id)}>Create Board</Button> */}
        {this.props.boards &&
          this.props.boards.map(board => {
            return (
              <Card key={board.id}>
                <Card.Content>
                  <Card.Header className="card-header">
                    {board.name}
                  </Card.Header>
                  <Link to={`/boards/${board.id}`}>
                    <Button active>Open Board</Button>
                  </Link>
                </Card.Content>
                {/* </Card.Content> */}
              </Card>
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
