import axios from 'axios'

const GOT_ALL_USERS = 'GOT_ALL_USERS'

const gotAllUsers = users => {
  return {
    type: GOT_ALL_USERS,
    users
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    const res = await axios.get('/api/users')
    const {data: users} = res
    dispatch(gotAllUsers(users))
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return action.users
    default:
      return state
  }
}
