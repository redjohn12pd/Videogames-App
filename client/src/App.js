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
    <Switch>
      <Route exact path = "/">
        <LandingPage/>
      </Route>
      <Route exact path = "/home">
        <NavBar/>
        <Home/>
      </Route>
      <Route exact path = "/videogames">
        <NavBar/>
        <VideogamesResult />
      </Route>
      <Route exact path = "/videogames/create">
        <NavBar/>
        <CreateVideogame />
      </Route>
      <Route exact path = "/videogames/create/success">
       <NavBar/>
        <SuccessCreate/>
      </Route>
      <Route exact path = "/videogame/detail/:id">
      <NavBar/>
        <DetailsVideogame />
      </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
