import { publicRequest, testInstance } from '../services/makeRequest'
import { 
  loginFailure, 
  loginStart, 
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess
} from './userRedux'
import TokenService  from '../services/tokenService'

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await testInstance.post('/auth/login', user)
    console.log('login successful')
    if (res.data.accessToken) {
      TokenService.setUser(res.data)
    }
    dispatch(loginSuccess(res.data))
  } catch (e) {
    console.log('caught login failure in apiCalls.js')
    console.log(e)
    dispatch(loginFailure())
  }
}

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
  const currentUser = JSON.parse(user)
  return currentUser
}

export const register = async (dispatch, user) => {
  dispatch(registerStart())
  try {
    const res = await testInstance.post('/auth/register', user)
    console.log('register successful')
    dispatch(registerSuccess(res.data))
  } catch (e) {
    console.log('caught register failure in apiCalls.js')
    dispatch(registerFailure())
  }
}

