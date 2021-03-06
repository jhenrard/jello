import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
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
    const nextOrder = this.props.lists.length
      ? this.props.lists.sort((a, b) => a.order - b.order)[
          this.props.lists.length - 1
        ].order + 1
      : 1

    return (
      <div>
        <div>
          {this.props.board.id && <BoardNavbar board={this.props.board} />}
        </div>
        <div className="board-container">
          {this.props.lists &&
            this.props.lists.map((list, index) => {
              return (
                <div className="card-spacing" key={list.id}>
                  <Card>
                    <ListContainer position={index + 1} />
                  </Card>
                </div>
              )
            })}
          <div className="card-spacing">
            <Card>
              <AddList nextOrder={nextOrder} boardId={this.props.board.id} />
            </Card>
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
