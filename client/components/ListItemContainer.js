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
    // const listItemsLength = listItems.filter(
    //   item => item.listId === props.listId
    // ).length
    // const sourceListItems = listItems.filter(item => item.listId === fromList)

    if (existingListItem.id === monitor.getItem().listItem.id) {
      return
    }

    if (existingListItem.id && existingListItem.listId === fromList) {
      // swap spots if same list
      store.dispatch(
        updateListItemOrder(monitor.getItem().listItem, props.position, toList)
      )
      store.dispatch(
        updateListItemOrder(existingListItem, fromOrderInList, fromList)
      )
    } else {
      // drop at end of target list
      const nextOrder = sortedListItems[0]
        ? sortedListItems[sortedListItems.length - 1].order + 1
        : 1
      store.dispatch(
        updateListItemOrder(monitor.getItem().listItem, nextOrder, toList)
      )
      // reorder remaining items in source list -- REFACTOR THIS - THIS MAKES A LOT OF PUT REQUESTS
      // for (let i = 0; i < sourceListItems.length; i++) {
      //   if (
      //     sourceListItems[i].order >= fromOrderInList &&
      //     sourceListItems[i].id !== monitor.getItem().listItem.id
      //   ) {
      //     store.dispatch(
      //       updateListItemOrder(
      //         sourceListItems[i],
      //         sourceListItems[i].order - 1,
      //         fromList
      //       )
      //     )
      //   }
      // }
    }
  }
  // canDrop(props, monitor) {
  //   return true
  // }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
    // canDrop: monitor.canDrop()
  }
}

class ListItemContainer extends React.Component {
  render() {
    const styles = this.props.isOver ? 'list-card-hover' : 'list-item'

    const sortedListItems =
      this.props.listItems &&
      this.props.listItems.sort((a, b) => a.order - b.order)

    const listItem =
      this.props.listItems &&
      this.props.listItems
        .sort((a, b) => a.order - b.order)
        .reduce((final, elem, index) => {
          if (index + 1 === this.props.position) {
            // could get next in array, would also need to make adding items have correct order value in db - find last in array and add 1 to its .order
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
