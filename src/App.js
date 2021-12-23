import MakeCollection from "./pages/MakeCollection";
import PracticeCollection from "./pages/PracticeCollection";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/'} exact>
          <MakeCollection />
        </Route>
        <Route path={'/practice'} exact>
          <PracticeCollection />
        </Route>
        <Route path={'/login'} exact>
          <LoginPage />
        </Route>
        <Route path={'/register'} exact>
          <RegisterPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
