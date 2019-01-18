import React from 'react'
import {connect as connectRedux} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {ListItem} from '.'
import {updateListOrder} from '../store/boardLists'
import store from '../store'

const containerTarget = {
  drop(props, monitor) {
    // const lists = store.getState().boardLists
    // const existingList = lists.reduce((final, elem) => {
    //   if (elem.order === props.position) {
    //     return elem
    //   }
    //   return final
    // }, {})
    // const from = monitor.getItem().list.order
    // store.dispatch(updateListOrder(monitor.getItem().list, props.position))
    // store.dispatch(updateListOrder(existingList, from))
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

class ListItemContainer extends React.Component {
  render() {
    const styles = this.props.isOver ? 'list-card-hover' : 'list-card'
    const listItem = this.props.listItems.reduce((final, elem) => {
      if (elem.order === this.props.position) {
        return elem
      }
      return final
    }, {})
    console.log('listitemcontainer props: ', this.props)

    return this.props.connectDropTarget(
      <div className={styles}>
        {/* <p>Item Title: {listItem.title}</p>
        <p>Item Description: {listItem.description}</p> */}
        <ListItem listItem={listItem} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listItems: state.boardListItems
  }
}

export default DropTarget('ListItem', containerTarget, collect)(
  connectRedux(mapStateToProps)(ListItemContainer)
)
