import axios from 'axios'

// action types

const GOT_BOARD_LIST_ITEMS = 'GOT_BOARD_LIST_ITEMS'
const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM'
const ADD_LIST_ITEM = 'ADD_LIST_ITEM'

// action creators

const gotBoardListItems = listItems => {
  return {
    type: GOT_BOARD_LIST_ITEMS,
    listItems
  }
}

const addBoardListItem = listItem => {
  return {
    type: ADD_LIST_ITEM,
    listItem
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

export const updateListItemOrder = (incomingListItem, order, listId) => {
  return async dispatch => {
    const listItem = {...incomingListItem}
    listItem.order = order
    listItem.listId = listId
    const res = await axios.put(`/api/list-items/${listItem.id}`, listItem)
    const {data: updatedListItem} = res
    dispatch(updateBoardListItem(updatedListItem))
  }
}

export const updateListItem = (itemId, item) => {
  return async dispatch => {
    const res = await axios.put(`/api/list-items/${itemId}`, item)
    const {data: updatedListItem} = res
    dispatch(updateBoardListItem(updatedListItem))
  }
}

export const addListItem = (listItem, listId, order) => {
  return async dispatch => {
    listItem = {...listItem}
    listItem.listId = listId
    listItem.order = order
    const res = await axios.post(`/api/list-items`, listItem)
    const {data: newListItem} = res
    dispatch(addBoardListItem(newListItem))
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
    case ADD_LIST_ITEM:
      return [...state, action.listItem]
    default:
      return state
  }
}
