import { testInstance } from "./makeRequest";
import TokenService  from './tokenService'
import { refreshToken } from "../redux/userRedux";


const setup = (store) => {
  console.log('???')
  testInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      console.log('Token from local service: ' + token)
      if (token) {
        //config.headers["x-access-token"] = token 
        config.headers = {
          "x-access-token": token
        }
      }
      return config
    },
    (error) => {
      //console.log('request error')
      return Promise.reject(error)
    }
  )
  const { dispatch } = store
  testInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      //console.log('DETECTED: could not make collection: ' + err)
      const originalConfig = err.config 
      //console.log(originalConfig)
      //console.log(err.response)
      if (originalConfig && originalConfig.url !== '/auth/login' && err.response) {
        // access token was expired 
        //console.log('DETECTED: Inside if statement')
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true 

          try {
            const rs = await testInstance.post('/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken()
            })
            if (rs.do === 'logout') {
              console.log('trying to log out')
              
               
              return Promise.reject()
            }
            const { accessToken } = rs.data 
            //console.log('TRYING to replace the token with: ' + accessToken)
            dispatch(refreshToken(accessToken))
            //console.log('Old access token: ' +TokenService.getLocalAccessToken())
            TokenService.updateLocalAccessToken(accessToken)
            //console.log('New access token: ' + TokenService.getLocalAccessToken())
            //console.log('Below is the ORIGINAL CONFIG')
            //console.log(originalConfig)
            originalConfig.data = JSON.parse(originalConfig.data)
            return testInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
}

export default setup