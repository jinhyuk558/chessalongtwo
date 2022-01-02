
import { useState } from 'react'
import styled from 'styled-components'
import { register } from '../redux/apiCalls'
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
               
                {isError &&  <div className="block" style={{"color": "red"}}>Error registering</div>}
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

/*
 <Container>
      <Wrapper>
        <Title>Register</Title>
        <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button disabled={isFetching} onClick={onClick}>Submit</Button>
        {isFetching && 'Loading ...'}
        {isError && 'Error registering'}
      </Wrapper>
    </Container>
    */