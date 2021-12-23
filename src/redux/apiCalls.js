import { publicRequest } from '../makeRequest'
import { 
  loginFailure, 
  loginStart, 
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess
} from './userRedux'

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post('/auth/login', user)
    console.log('login successful')
    dispatch(loginSuccess(res.data))
  } catch (e) {
    console.log('caught login failure in apiCalls.js')
    dispatch(loginFailure())
  }
}

export const register = async (dispatch, user) => {
  dispatch(registerStart())
  try {
    const res = await publicRequest.post('/auth/register', user)
    console.log('register successful')
    dispatch(registerSuccess(res.data))
  } catch (e) {
    console.log('caught register failure in apiCalls.js')
    dispatch(registerFailure())
  }
}

