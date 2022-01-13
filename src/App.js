import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login';
// import logo from './trivia.png';
import './App.css';
import PlayGame from './components/pages/PlayGame';
import Header from './components/pages/Header';
import Config from './components/pages/Config';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/header" component={ Header } />
        <Route path="/playGame" component={ PlayGame } />
        <Route path="/config" component={ Config } />

      </Switch>
    </div>
  );
}
