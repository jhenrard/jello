import axios from 'axios'

// action types

const GOT_BOARD_LIST_ITEMS = 'GOT_BOARD_LIST_ITEMS'

// action creators

const gotBoardListItems = listItems => {
  return {
    type: GOT_BOARD_LIST_ITEMS,
    listItems
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

// board list items reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_BOARD_LIST_ITEMS:
      return action.listItems
    default:
      return state
  }
}
