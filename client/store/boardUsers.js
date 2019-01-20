import axios from 'axios'

// action types

const GOT_BOARD_USERS = 'GOT_BOARD_USERS'

// action creators

const gotBoardUsers = users => {
  return {
    type: GOT_BOARD_USERS,
    users
  }
}

// thunk creators

export const fetchBoardUsers = boardId => {
  return async dispatch => {
    const res = await axios.get(`/api/boards/${boardId}/users`)
    const {data: users} = res
    dispatch(gotBoardUsers(users))
  }
}

// board users reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_BOARD_USERS:
      return action.users
    default:
      return state
  }
}
