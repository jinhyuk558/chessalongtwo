import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessRook } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const [logout, setLogout] = useState(false)
  const history = useHistory()
  const onLogout = () => {
    setLogout(true)
    history.push('/')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <nav className="navbar has-shadow">
      <div className="navbar-brand">
        <Link 
          className="navbar-item is-size-5 has-text-info has-text-weight-semibold" 
          to="/"
        >
          <span class="icon-text">
            <span class="icon mr-0">
              <FontAwesomeIcon icon={faChessRook} />
            </span>
            <p className="">Chessalong</p>
          </span>
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={currentUser ? '/make' : '/login'}>
            Create Collection
          </Link>
          <a className="navbar-item">
            Documentation
          </a>
          
        </div>
      </div>
      
      {currentUser ? 
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-link" to={`/profile/${currentUser._id}`}>
                {currentUser.username}
              </Link>
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


