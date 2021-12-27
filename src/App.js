import MakeCollection from "./pages/MakeCollection";
import PracticeCollection from "./pages/PracticeCollection";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage'
import { Switch, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import { useSelector } from 'react-redux'
import { Redirect, withRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";


function App() {

  const currentUser = useSelector(state => state.currentUser)
  console.log('Current user: ' + currentUser)

  return (
    <div className="App">
      <Switch>
        <Route path={'/make'} exact >
          {currentUser ? <MakeCollection /> : 
            () => {
              alert('You must be logged in to make a collection')
              return <HomePage />
            } 
          } 
        </Route>
          
        <Route path={'/practice'} component={PracticeCollection} />
        <Route path={'/login'} exact>
          {currentUser ? () => <Redirect to='/' /> : <LoginPage />}  
        </Route>
        <Route path={'/register'} exact>
          {currentUser ? () => <Redirect to='/' /> : <RegisterPage />} 
        </Route>
        <Route path={'/profile'} >
          {currentUser ? () => <ProfilePage /> : <HomePage />} 
        </Route>
        <Route path={'/'} exact>
          {currentUser ? <HomePage /> : <LandingPage />}
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);

// it isn't redirecting and practice page isnt' working with id