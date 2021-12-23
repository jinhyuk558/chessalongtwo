import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userRedux'

export const store = configureStore({
  reducer: userReducer,
})