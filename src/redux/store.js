import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import fileReducer from './Reducers/fileReducer'
import loginReducer from './Reducers/loginReducer'
import manageGroupReducer from './Reducers/manageGroupReducer'
import manageUserReducer from './Reducers/manageUserReducer'
import pendingActionReducer from './Reducers/pendingActionReducer'

const reducer = combineReducers({
  loginReducer: loginReducer,
  manageUserReducer: manageUserReducer,
  manageGroupReducer: manageGroupReducer,
  pendingActionReducer: pendingActionReducer,
  fileReducer: fileReducer
})

let middlewares = [thunk]
if (process.env.REACT_APP_ENV === `dev`) {
  middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
