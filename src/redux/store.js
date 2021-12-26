import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userRedux'

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return userReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})