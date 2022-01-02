import styled from "styled-components";
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess, faChessKing, faChessKnight } from "@fortawesome/free-solid-svg-icons";

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
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <span class="icon-text">
            <span class="icon">
              <FontAwesomeIcon icon={faChess} size="lg" />
            </span>
            <span>Chessalong</span>
          </span>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/make">
            Create Collection
          </Link>
          <a className="navbar-item">
            Documentation
          </a>
        </div>
      </div>
      

      {
        currentUser ? 
        <div className="navbar-end">
          <div className="navbar-item">
            <Link className="navbar-item" to={`/profile/${currentUser._id}`}>
              {currentUser.username}
            </Link>
            <div className="buttons">
              <a className="button is-light" onClick={onLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
        
        : 
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/register">
                <strong>Sign up</strong>
              </Link>
              <Link className="button is-light" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      }
      
      




    </nav>
  )
}

export default Navbar

/*
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
      <Link to='/login'>Login</Link>
    </AuthLink>
    
  </AuthSection>
  }
*/
