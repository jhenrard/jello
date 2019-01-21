import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleBoard from './singleBoard'
import boardLists from './boardLists'
import boardListItems from './boardListItems'
import boards from './boards'
import boardUsers from './boardUsers'
import allUsers from './allUsers'

const reducer = combineReducers({
  user,
  singleBoard,
  boardLists,
  boardListItems,
  boards,
  boardUsers,
  allUsers
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
