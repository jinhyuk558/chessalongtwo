import styled from "styled-components";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background-color: #343d46;
  display: flex;
  padding: 5px 10px;
`
const Left = styled.div`
  flex: 1;
`
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  color: white !important;
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
  color: white;
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
        <Link to='/make' style={{"color": "white", "textDecoration": "none"}}>Create Collection</Link>
      </Left>
      <Center><Link to='/' style={{"color": "white", "textDecoration": "none"}}>Chessalong</Link></Center>
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