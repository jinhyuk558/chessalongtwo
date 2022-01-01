class TokenService {
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
    const currentUser = JSON.parse(user)
    //console.log(currentUser?.accessToken)
    return (currentUser?.accessToken)
  }

  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
    const currentUser = JSON.parse(user)
    //console.log(currentUser?.refreshToken)
    return (currentUser?.refreshToken)
  }

  updateLocalAccessToken(token) {
    // const user = JSON.parse(localStorage.getItem('persist:root'))?.currentUser
    // const currentUser = JSON.parse(user)
    // currentUser.accessToken = token 
    // localStorage.
    let root = JSON.parse(localStorage.getItem('persist:root'))
    let currentUser = JSON.parse(root.currentUser)
    currentUser.accessToken = token
    let userStringified = JSON.stringify(currentUser)
    root.currentUser = userStringified
    localStorage.setItem('persist:root', JSON.stringify(root)) 
  }

  setUser(user) {
    //console.log(JSON.stringify(user))
    let root = JSON.parse(localStorage.getItem('persist:root'))
    root.currentUser = JSON.stringify(user)
    localStorage.setItem('persist:root', root)
  }
}

export default new TokenService()