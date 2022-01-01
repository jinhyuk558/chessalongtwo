import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userRedux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer)

// I don't know how many times this runs
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
  return user ? JSON.parse(user) : {}
}

 

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear()
    storage.removeItem('persist:root')
    return persistedReducer(undefined, action)
  } 
  else if (action.type === 'REFRESH_TOKEN') {
    const currentUser = getCurrentUser()
    const newState = {
      ...state,
      user: {...currentUser, accessToken: action.payload }
    }
    console.log('CHANGING REDUX: ' + action.payload)
    return persistedReducer(newState, action)
  }
  return persistedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export let persistor = persistStore(store)