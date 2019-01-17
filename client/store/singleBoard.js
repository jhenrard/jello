import axios from 'axios'

// action types

const GOT_BOARD_FROM_DB = 'GOT_BOARD_FROM_DB'

// action creators

const gotBoardFromDB = board => {
  return {
    type: GOT_BOARD_FROM_DB,
    board
  }
}

// thunk creators

export const fetchBoard = boardId => {
  return async dispatch => {
    const res = await axios.get(`/api/boards/${boardId}`)
    const {data: board} = res
    dispatch(gotBoardFromDB(board))
  }
}

// reducer

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_BOARD_FROM_DB:
      return action.board
    default:
      return state
  }
}
