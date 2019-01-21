import React from 'react'
import {connect as connectRedux} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {List} from '.'
import {updateListOrder} from '../store/boardLists'
import store from '../store'

const containerTarget = {
  drop(props, monitor) {
    const lists = store.getState().boardLists
    const existingList = lists
      .sort((a, b) => a.order - b.order)
      .reduce((final, elem, index) => {
        if (index + 1 === props.position) {
          return elem
        }
        return final
      }, {})
    const from = monitor.getItem().list.order

    if (from !== props.position) {
      store.dispatch(
        updateListOrder(monitor.getItem().list, existingList.order)
      )
      store.dispatch(updateListOrder(existingList, from))
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class ListContainer extends React.Component {
  render() {
    // const styles = this.props.isOver ? 'list-card-hover' : 'list-card'
    const list = this.props.lists
      .sort((a, b) => a.order - b.order)
      .reduce((final, elem, index) => {
        if (index + 1 === this.props.position) {
          return elem
        }
        return final
      }, {})

    return this.props.connectDropTarget(
      // <div className={styles}>
      <div>
        {/* <Card className="list-card"> */}
        <List list={list} />
        {/* </Card> */}
      </div>
      // </div>
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
