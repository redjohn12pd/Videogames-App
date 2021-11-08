import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import DetailsVideogame from './components/DetailsVideogame';
const App = ()=> {
  return (
    <React.Fragment>
    <NavBar/>
    <Switch>
      <Route exact path = "/home">
        <Home/>
      </Route>
      <Route exact path = "/videogames/create">
        <CreateVideogame />
      </Route>
      <Route exact path = "/videogame/detail/:id">
        <DetailsVideogame />
      </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
