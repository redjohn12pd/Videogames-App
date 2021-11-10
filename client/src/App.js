import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import SuccessCreate from './components/CreateVideogame/SuccessCreate.jsx';
import VideogamesResult from './components/VideogamesResult';
import DetailsVideogame from './components/DetailsVideogame';
import LandingPage from './components/LandingPage';
const App = ()=> {
  return (
    <React.Fragment>
    <NavBar/>
    <Switch>
      <Route exact path = "/">
        <LandingPage/>
      </Route>
      <Route exact path = "/home">
        <Home/>
      </Route>
      <Route exact path = "/videogames">
        <VideogamesResult />
      </Route>
      <Route exact path = "/videogames/create">
        <CreateVideogame />
      </Route>
      <Route exact path = "/videogames/create/success">
        <SuccessCreate/>
      </Route>
      <Route exact path = "/videogame/detail/:id">
        <DetailsVideogame />
      </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
