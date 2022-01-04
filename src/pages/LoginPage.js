import { useEffect, useState } from 'react'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'


const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispath = useDispatch()
  const isFetching = useSelector(state => state.isFetching)
  const isError = useSelector(state => state.error)

  useEffect(() => {
   const refreshCount = sessionStorage.getItem('reloadCount')
   if (!refreshCount) {
     sessionStorage.setItem('reloadCount', 1)
     window.location.reload()
   } else {
    sessionStorage.removeItem('reloadCount')
   }
  },[])

  const onClick = (e) => {
    e.preventDefault()
    login(dispath, { username, password })
  }

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">
                <div className="field">
                  <label for="" className="label">Username</label>
                  <div className="control">
                    <input 
                      type="email" 
                      placeholder="username" 
                      className="input" 
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label for="" className="label">Password</label>
                  <div className="control">
                    <input 
                      type="password" 
                      placeholder="*******" 
                      className="input" 
                      required 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                 
                  {isError &&  <div className="block" style={{"color": "red"}}>Error logging in</div>}
                  <button 
                  className={`button is-success ${isFetching && 'is-loading'}`}
                    disabled={isFetching} 
                    onClick={onClick}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

// now: just redirect the user