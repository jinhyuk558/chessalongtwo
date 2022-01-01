import styled from "styled-components";
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  padding: 10px 50px;
  background-color: #303A48
  
`
const Left = styled.div`
  flex: 1;
  display: flex;
  font-size: 15px;
  align-items: center;
  color: white;
`
const Center = styled.div`
  flex: 1;
  font-size: 20px;
  display: flex;
  justify-content: center;
  color: white;

`
const Right = styled.div`
  flex: 1;
  display: flex;
  font-size: 15px;
  justify-content: right;
  display: flex;
  align-items: center;
  color: white;
`
const UserSection = styled.div`
  display: flex;
`
const UserText = styled.span`
  margin-right: 15px;
`
const Logout = styled.div`
  cursor: pointer;
  font-size: 15px;
`
const AuthSection = styled.div`
  display: flex;

`
const AuthLink = styled.div`
  margin-left: 15px;
`


const Navbar = () => {

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const [logout, setLogout] = useState(false)
  const onLogout = () => {
    setLogout(true)
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Container>
      <Left>
        <Link to='/make' style={{"color": "white", "textDecoration": "none"}}>Create Collection</Link>
      </Left>
      <Center>
        <Link to='/' style={{"color": "white", "textDecoration": "none"}}>Chessalong</Link>
      </Center>
      <Right>
        {currentUser ? 
        <UserSection>
          <UserText>
            <Link to={`/profile/${currentUser._id}`} style={{'color': 'white', 'textDecoration': 'none'}}>
              {currentUser.username}
            </Link>
          </UserText>
          <Logout onClick={onLogout}>Logout</Logout>
        </UserSection>
        : 
        <AuthSection>
          <AuthLink>
            <Link to='/login' style={{"color": "white", "textDecoration": "none"}}>Login</Link>
          </AuthLink>
          <AuthLink>
            <Link to='/register' style={{"color": "white", "textDecoration": "none"}}>Register</Link>
          </AuthLink>
        </AuthSection>
        }
      </Right>
    </Container>
  )
}

export default Navbar