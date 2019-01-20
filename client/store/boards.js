import axios from 'axios'

// action types

const GOT_USER_BOARDS = 'GOT_USER_BOARDS'

// action creators

const gotUserBoards = boards => {
  return {
    type: GOT_USER_BOARDS,
    boards
  }
}

// thunk creators

export const fetchUserBoards = userId => {
  return async dispatch => {
    const res = await axios.get(`/api/users/${userId}/boards`)
    const {data: boards} = res
    console.log('boards from db in thunk: ', boards)
    dispatch(gotUserBoards(boards))
  }
}

// user boards reducer

export default function(state = [], action) {
  switch (action.type) {
    case GOT_USER_BOARDS:
      return action.boards
    default:
      return state
  }
}
