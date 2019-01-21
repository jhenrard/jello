import React from 'react'
import {DropTarget} from 'react-dnd'
import {ListItem} from '.'
import {updateListItemOrder} from '../store/boardListItems'
import store from '../store'

const containerTarget = {
  drop(props, monitor) {
    const listItems = store.getState().boardListItems
    const sortedListItems =
      listItems &&
      listItems
        .filter(item => item.listId === props.listId)
        .sort((a, b) => a.order - b.order)

    const existingListItem = sortedListItems.reduce((final, elem, index) => {
      if (index + 1 === props.position && elem.listId === props.listId)
        return elem
      return final
    }, {})
    const fromOrderInList = monitor.getItem().listItem.order
    const fromList = monitor.getItem().listItem.listId
    const toList = props.listId

    if (existingListItem.id === monitor.getItem().listItem.id) {
      return
    }

    const nextOrder = sortedListItems[0]
      ? sortedListItems[sortedListItems.length - 1].order + 1
      : 1

    if (existingListItem.id && existingListItem.listId === fromList) {
      // swap spots if same list
      store.dispatch(
        updateListItemOrder(
          monitor.getItem().listItem,
          existingListItem.order,
          toList
        )
      )
      store.dispatch(
        updateListItemOrder(existingListItem, fromOrderInList, fromList)
      )
    } else {
      // drop at end of target list
      store.dispatch(
        updateListItemOrder(monitor.getItem().listItem, nextOrder, toList)
      )
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class ListItemContainer extends React.Component {
  render() {
    const styles = this.props.isOver ? 'list-card-hover' : 'list-item'

    const listItem =
      this.props.listItems &&
      this.props.listItems
        .sort((a, b) => a.order - b.order)
        .reduce((final, elem, index) => {
          if (index + 1 === this.props.position) {
            return elem
          }
          return final
        }, {})

    return this.props.connectDropTarget(
      <div className={styles}>
        <ListItem listItem={listItem} />
      </div>
    )
  }
}

export default DropTarget('ListItem', containerTarget, collect)(
  ListItemContainer
)
