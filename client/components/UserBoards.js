import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'semantic-ui-react'
import {fetchUserBoards} from '../store/boards'
import AddBoard from './AddBoard'

class UserBoards extends React.Component {
  componentDidMount() {
    this.props.fetchUserBoards(this.props.user.id)
  }

  render() {
    return (
      <div className="home-container">
        <AddBoard />
        {this.props.boards &&
          this.props.boards.map(board => {
            return (
              <Card key={board.id}>
                <Card.Content>
                  <Card.Header className="card-header">
                    {board.name}
                  </Card.Header>
                  <Button href={`/boards/${board.id}`} active>
                    Open Board
                  </Button>
                </Card.Content>
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
