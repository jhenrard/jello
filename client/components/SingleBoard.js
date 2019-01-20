import React from 'react'
import {connect} from 'react-redux'
import {fetchBoard} from '../store/singleBoard'
import {ListContainer} from '.'
import {fetchBoardLists} from '../store/boardLists'
import {fetchListItems} from '../store/boardListItems'
import AddList from './AddList'
import BoardNavbar from './BoardNavbar'

class SingleBoard extends React.Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId
    this.props.fetchBoard(boardId)
    this.props.fetchLists(boardId)
    this.props.fetchListItems(boardId)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.board.id && <BoardNavbar board={this.props.board} />}
        </div>
        <div className="board-container">
          {this.props.lists &&
            this.props.lists.map((list, index) => {
              return (
                <div key={list.id}>
                  <ListContainer position={index + 1} />
                </div>
              )
            })}
          <div>
            <AddList
              numOfLists={this.props.lists.length}
              boardId={this.props.board.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.singleBoard,
    lists: state.boardLists,
    listItems: state.listItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: boardId => dispatch(fetchBoard(boardId)),
    fetchLists: boardId => dispatch(fetchBoardLists(boardId)),
    fetchListItems: boardId => dispatch(fetchListItems(boardId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard)
