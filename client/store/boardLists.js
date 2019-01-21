import axios from 'axios'

// action types

const GOT_BOARD_LISTS = 'GOT_BOARD_LISTS'
const UPDATE_LIST = 'UPDATE_LIST'
const ADD_LIST = 'ADD_LIST'
const DELETE_LIST = 'DELETE_LIST'

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

const addBoardList = list => {
  return {
    type: ADD_LIST,
    list
  }
}

const deleteList = listId => {
  return {
    type: DELETE_LIST,
    listId
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

export const addList = (list, boardId, order) => {
  return async dispatch => {
    list.boardId = boardId
    list.order = order
    const res = await axios.post(`/api/lists`, list)
    const {data: newList} = res
    dispatch(addBoardList(newList))
  }
}

export const removeList = listId => {
  return async dispatch => {
    await axios.delete(`/api/lists/${listId}`)
    dispatch(deleteList(listId))
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
    case ADD_LIST:
      return [...state, action.list]
    case DELETE_LIST:
      return state.filter(list => list.id !== action.listId)
    default:
      return state
  }
}
