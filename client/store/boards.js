import axios from 'axios'

// action types

const GOT_USER_BOARDS = 'GOT_USER_BOARDS'
const CREATED_BOARD = 'CREATED_BOARD'

// action creators

const gotUserBoards = boards => {
  return {
    type: GOT_USER_BOARDS,
    boards
  }
}

const createdBoard = board => {
  return {
    type: CREATED_BOARD,
    board
  }
}

// thunk creators

export const fetchUserBoards = userId => {
  return async dispatch => {
    const res = await axios.get(`/api/users/${userId}/boards`)
    const {data: boards} = res
    dispatch(gotUserBoards(boards))
  }
}

export const createBoard = userId => {
  return async dispatch => {
    const res = await axios.post(`/api/boards`, {userId, owner: true})
    const {data: board} = res
    dispatch(createdBoard(board))
  }
}

// user boards reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_USER_BOARDS:
      return action.boards
    case CREATED_BOARD:
      return [...state, action.board]
    default:
      return state
  }
}
