import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

// const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
// const currentUser = JSON.parse(user)
// const TOKEN = currentUser?.accessToken
// console.log('TOKEN: ' + TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` }
// })

// new
export const testInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})