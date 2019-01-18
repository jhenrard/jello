import React from 'react'
import {connect as connectRedux} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {ListCard} from '.'
import {updateListOrder} from '../store/boardLists'
import store from '../store'

const containerTarget = {
  drop(props, monitor) {
    const lists = store.getState().boardLists
    const existingList = lists.reduce((final, elem) => {
      if (elem.order === props.position) {
        return elem
      }
      return final
    }, {})
    console.log('list container receiving item: ', monitor.getItem())
    const from = monitor.getItem().list.order

    store.dispatch(updateListOrder(monitor.getItem().list, props.position))
    store.dispatch(updateListOrder(existingList, from))
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
    lists: state.boardLists
  }
}

export default DropTarget('List', containerTarget, collect)(
  connectRedux(mapStateToProps)(ListContainer)
)
