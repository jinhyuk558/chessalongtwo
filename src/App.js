import MakeCollection from "./pages/MakeCollection";
import PracticeCollection from "./pages/PracticeCollection";
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
      </Switch>
    </div>
  );
}

export default App;
