
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
  )
}

export default RegisterPage