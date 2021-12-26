import { useState } from 'react'
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

  const onClick = (e) => {
    e.preventDefault()
    login(dispath, { username, password })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <Input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button disabled={isFetching} onClick={onClick}>Submit</Button>
        {isFetching && 'Loading ...'}
        {isError && 'Error loggin in'}
      </Wrapper>
    </Container>
  )
}

export default LoginPage

// now: just redirect the user