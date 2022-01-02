import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`
const Title = styled.h1``
const Input = styled.input``
const Button = styled.button``

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
/*
<Wrapper>
        <Title>Login</Title>
        <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button disabled={isFetching} onClick={onClick}>Submit</Button>
        {isFetching && 'Loading ...'}
        {isError && 'Error loggin in'}
      </Wrapper>
      */

// now: just redirect the user