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
    const fromOrderInList = monitor.getItem().listItem.order
    const fromList = monitor.getItem().listItem.listId
    const toList = props.listId
    const listItemsLength = listItems.filter(
      item => item.listId === props.listId
    ).length
    const sourceListItems = listItems.filter(item => item.listId === fromList)

    // console.log('monitor getitem: ', monitor.getItem())
    // console.log('existing list item: ', existingListItem)
    // console.log('from order in current list: ', fromOrderInList)
    // console.log('to list argument: ', toList)
    console.log('source list items: ', sourceListItems)

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
      store.dispatch(
        updateListItemOrder(
          monitor.getItem().listItem,
          listItemsLength + 1,
          toList
        )
      )
      // reorder remaining items in source list -- REFACTOR THIS
      for (let i = 0; i < sourceListItems.length; i++) {
        if (
          sourceListItems[i].order >= fromOrderInList &&
          sourceListItems[i].id !== monitor.getItem().listItem.id
        ) {
          store.dispatch(
            updateListItemOrder(
              sourceListItems[i],
              sourceListItems[i].order - 1,
              fromList
            )
          )
        }
      }
    }

    // // update item already in the container to move down
    // if (existingListItem.id && existingListItem.listId === fromList) {
    //   // if same list, move existing item to incoming's prior location
    // }
    // else {
    //   // if target list is different and not empty, shift existing item to bottom. refactor later to shift all down
    //   store.dispatch(updateListItemOrder(existingListItem, listItemsLength + 1, toList))
    // }
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
