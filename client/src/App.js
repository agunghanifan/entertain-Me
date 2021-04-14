import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Details from './pages/Details'
import EditMovies from './pages/EditMovie'
import Favorites from './pages/Favorites'
import AddMovie from './pages/AddMovie'

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/details/:params/:id">
              <Details />
            </Route>
            <Route path="/movie/:params/:id">
              <EditMovies />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/addmovie">
              <AddMovie />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
