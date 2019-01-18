import axios from 'axios'

// action types

const GOT_BOARD_LISTS = 'GOT_BOARD_LISTS'
const UPDATE_LIST = 'UPDATE_LIST'

// action creators

const gotBoardLists = lists => {
  return {
    type: GOT_BOARD_LISTS,
    lists
  }
}

const updateList = list => {
  return {
    type: UPDATE_LIST,
    list
  }
}

// thunk creators

export const fetchBoardLists = boardId => {
  return async dispatch => {
    const res = await axios.get(`/api/boards/${boardId}/lists`)
    const {data: lists} = res
    dispatch(gotBoardLists(lists))
  }
}

export const updateListOrder = (incomingList, to) => {
  return async dispatch => {
    const list = {...incomingList}
    list.order = to
    const res = await axios.put(`/api/lists/${list.id}`, list)
    const {data: updatedList} = res
    dispatch(updateList(updatedList))
  }
}

// board lists reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_BOARD_LISTS:
      return action.lists
    case UPDATE_LIST:
      return state.map(list => {
        if (list.id === action.list.id) {
          return action.list
        } else {
          return list
        }
      })
    default:
      return state
  }
}
