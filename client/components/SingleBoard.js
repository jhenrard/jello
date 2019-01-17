import React from 'react'
import {connect} from 'react-redux'
import {fetchBoard} from '../store/singleBoard'
import {ListCard} from '.'

class SingleBoard extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.boardId)
  }

  render() {
    return (
      <div>
        {this.props.board.name}
        <p />
        {this.props.board.lists &&
          this.props.board.lists.map(item => {
            return (
              <div key={item.id} className="list-card">
                <ListCard list={item} />
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
