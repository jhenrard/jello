import React from 'react'
import {connect as connectRedux} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {ListItem} from '.'
import {updateListItemOrder} from '../store/boardListItems'
import store from '../store'

const containerTarget = {
  drop(props, monitor) {
    const listItems = store.getState().boardListItems
    const existingListItem = listItems.reduce((final, elem) => {
      if (elem.order === props.position && elem.listId === props.listId) {
        return elem
      }
      return final
    }, {})
    const from = monitor.getItem().listItem.order
    console.log('existing list item: ', existingListItem)
    console.log('from: ', from)
    store.dispatch(
      updateListItemOrder(monitor.getItem().listItem, props.position)
    )
    store.dispatch(updateListItemOrder(existingListItem, from))
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
    const styles = this.props.isOver ? 'list-card-hover' : 'list-item'
    const listItem =
      this.props.listItems &&
      this.props.listItems.reduce((final, elem) => {
        if (elem.order === this.props.position) {
          return elem
        }
        return final
      }, {})
    // console.log('listitemcontainer props: ', this.props)

    return this.props.connectDropTarget(
      <div className={styles}>
        {/* <p>Item Title: {listItem.title}</p>
        <p>Item Description: {listItem.description}</p> */}
        <ListItem listItem={listItem} />
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     listItems: state.boardListItems
//   }
// }

export default DropTarget('ListItem', containerTarget, collect)(
  ListItemContainer
)
