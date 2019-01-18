import React from 'react'
import {connect as connectRedux} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {ListCard} from '.'

const containerTarget = {
  drop(props, monitor) {
    console.log('drop props', props)

    // move current ListCard to source ListContainer -- change current ListCard order
    // drop dragged ListCard into this ListContainer -- change dragged ListCard order
    // give lists an order number, keep containers sequential and render lists based on their order number
  },
  canDrop(props, monitor) {
    return true
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class ListContainer extends React.Component {
  render() {
    const styles = this.props.isOver ? 'list-card-hover' : 'list-card'
    const list = this.props.lists.reduce((final, elem) => {
      if (elem.order === this.props.position) {
        return elem
      }
      return final
    }, {})

    return this.props.connectDropTarget(
      <div className={styles}>
        <ListCard list={list} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lists: state.singleBoard.lists
  }
}

export default DropTarget('List', containerTarget, collect)(
  connectRedux(mapStateToProps)(ListContainer)
)
