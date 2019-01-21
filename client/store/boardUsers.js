import axios from 'axios'

// action types

const GOT_BOARD_USERS = 'GOT_BOARD_USERS'
const ADD_USER_TO_BOARD = 'ADD_USER_TO_BOARD'

// action creators

const gotBoardUsers = users => {
  return {
    type: GOT_BOARD_USERS,
    users
  }
}

const addUser = user => {
  return {
    type: ADD_USER_TO_BOARD,
    user
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

export const addUserToBoard = (userId, boardId) => {
  return async dispatch => {
    const res = await axios.post(`/api/boards/${boardId}/add-user`, {
      userId,
      boardId
    })
    const {data: addedUser} = res
    dispatch(addUser(addedUser))
  }
}

// board users reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_BOARD_USERS:
      return action.users
    case ADD_USER_TO_BOARD:
      return [...state, action.user]
    default:
      return state
  }
}
