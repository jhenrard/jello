import React from 'react'
import {connect} from 'react-redux'
import {fetchBoard} from '../store/singleBoard'
import {ListContainer} from '.'

class SingleBoard extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.boardId)
  }

  render() {
    return (
      <div className="board-container">
        {this.props.board.name}
        <p />
        {this.props.board.lists &&
          this.props.board.lists.map((list, index) => {
            return (
              <div key={list.id} className="list-container">
                <ListContainer position={index + 1} />
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.singleBoard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: boardId => dispatch(fetchBoard(boardId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard)
