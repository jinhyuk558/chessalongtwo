import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false 
      state.currentUser = action.payload
    },
    loginFailure: (state) => {
      state.isFetching = false 
      state.error = true
    },
    registerStart: (state) => {
      state.isFetching = true
    },
    registerSuccess: (state, action) => {
      state.isFetching = false 
      state.error = false
      state.currentUser = action.payload
    },
    registerFailure: (state) => {
      state.isFetching = false 
      state.error = true
    },
    
  }
})

export const { 
  loginSuccess, 
  loginFailure, 
  loginStart,
  registerFailure,
  registerStart,
  registerSuccess
} = userSlice.actions

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: 'REFRESH_TOKEN',
    payload: accessToken
  })
}
export default userSlice.reducer