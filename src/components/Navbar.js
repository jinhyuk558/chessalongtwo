import styled from "styled-components";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background-color: lightblue;
  display: flex;
`
const Left = styled.div`
  flex: 1;
`
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
`
const UserSection = styled.div`
  display: flex;
`
const UserText = styled.span``
const Logout = styled.div`
  cursor: pointer;
  margin-left: 10px;
`
const AuthSection = styled.div`
  display: flex;

`
const AuthLink = styled.div`
  margin-left: 10px;
`


const Navbar = () => {

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Container>
      <Left>
        <Link to='/make'>Create Collection</Link>
      </Left>
      <Center>Chessalong</Center>
      <Right>
        {currentUser ? 
        <UserSection>
          <UserText>{`User: ${currentUser.username}`}</UserText>
          <Logout onClick={onLogout}>Logout</Logout>
        </UserSection>
        : 
        <AuthSection>
          <AuthLink>
            <Link to='/login'>Login</Link>
          </AuthLink>
          <AuthLink>
            <Link to='/register'>Register</Link>
          </AuthLink>
        </AuthSection>
        }
      </Right>
    </Container>
  )
}

export default Navbar