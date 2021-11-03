import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
const App = ()=> {
  return (
    <React.Fragment>
    <NavBar/>
    <Switch>
      <Route exact path = "/home">
        <Home/>
      </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
