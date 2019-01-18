import React from 'react'
import {connect} from 'react-redux'
import {fetchBoard} from '../store/singleBoard'
import {ListContainer} from '.'
import {fetchBoardLists} from '../store/boardLists'

class SingleBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId
    this.props.fetchBoard(boardId)
    this.props.fetchLists(boardId)
  }

  render() {
    // const lists = []
    // for (let key in this.props.lists) {
    //   if (this.props.lists.hasOwnProperty(key)) {
    //     lists.push(this.props.lists[key])
    //   }
    // }

    return (
      <div className="board-container">
        {this.props.board.name}
        <p />
        {this.props.lists &&
          this.props.lists.map((list, index) => {
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
    board: state.singleBoard,
    lists: state.boardLists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: boardId => dispatch(fetchBoard(boardId)),
    fetchLists: boardId => dispatch(fetchBoardLists(boardId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard)
