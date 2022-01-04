
import { useState } from 'react'
import { register } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'


const RegisterPage = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.isFetching)
  const isError = useSelector(state => state.error)

  const onClick = (e) => {
    e.preventDefault()
    register(dispatch, { username, email, password })
  }

  return (
    <section className="hero is-primary is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" className="box">

              <div className="field">
                <label for="" className="label">Username</label>
                <div className="control">
                  <input 
                    placeholder="username" 
                    className="input" 
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Email</label>
                <div className="control">
                  <input 
                    type="email" 
                    placeholder="email" 
                    className="input" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
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
               
                {isError && <div className="block" style={{"color": "red"}}>Error registering</div>}
                <button 
                className={`button is-success ${isFetching && 'is-loading'}`}
                  disabled={isFetching} 
                  onClick={onClick}
                >
                  Sign up
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

export default RegisterPage

