import axios from 'axios'

// action types

const GOT_BOARD_LIST_ITEMS = 'GOT_BOARD_LIST_ITEMS'
const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM'

// action creators

const gotBoardListItems = listItems => {
  return {
    type: GOT_BOARD_LIST_ITEMS,
    listItems
  }
}

const updateBoardListItem = listItem => {
  return {
    type: UPDATE_LIST_ITEM,
    listItem
  }
}

// thunk creators

export const fetchListItems = boardId => {
  return async dispatch => {
    const res = await axios.get(`/api/boards/${boardId}/listItems`)
    const {data: listItems} = res
    dispatch(gotBoardListItems(listItems))
  }
}

export const updateListItemOrder = (incomingListItem, to) => {
  return async dispatch => {
    const listItem = {...incomingListItem}
    listItem.order = to
    const res = await axios.put(`/api/list-items/${listItem.id}`, listItem)
    const {data: updatedListItem} = res
    console.log('updated list item after db udpate: ', updatedListItem)
    dispatch(updateBoardListItem(updatedListItem))
  }
}

// board list items reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_BOARD_LIST_ITEMS:
      return action.listItems
    case UPDATE_LIST_ITEM:
      return state.map(item => {
        if (item.id === action.listItem.id) {
          return action.listItem
        } else {
          return item
        }
      })
    default:
      return state
  }
}
