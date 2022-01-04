import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import setupInterceptors from './services/setupInterceptors';
import { PersistGate } from 'redux-persist/integration/react';
import {publicRequest, testInstance} from './services/makeRequest'
import TokenService from './services/tokenService'
import { refreshToken } from './redux/userRedux';
import 'bulma/css/bulma.min.css';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);


const setup = (store) => {
  testInstance.interceptors.request.use(
    (config) => {
      
      const token = TokenService.getLocalAccessToken()
      if (token) {
        config.headers = {
          "x-access-token": token
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  const { dispatch } = store
  testInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      console.log('DETECTED: could not make collection: ' + err)
      const originalConfig = err.config 
      //console.log(originalConfig)
      if (originalConfig && originalConfig.url !== '/auth/login' && err.response) {
        // access token was expired 
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true 

          try {
            const rs = await publicRequest.post('/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken()
            })
            // if (rs && rs.do === 'logout') {
            //   dispatch({ type: 'LOGOUT' })
           
            // }
            console.log(rs)
            const { accessToken } = rs.data 

            dispatch(refreshToken(accessToken))

            console.log('Old access token: ' +TokenService.getLocalAccessToken())
            TokenService.updateLocalAccessToken(accessToken)
            console.log('New access token: ' + TokenService.getLocalAccessToken())
            
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

setup(store)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

