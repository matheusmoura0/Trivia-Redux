import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login';
// import logo from './trivia.png';
import './App.css';
import PlayGame from './components/pages/PlayGame';
import Config from './components/pages/Config';
import Feedback from './components/pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
        <Route path="/playGame" component={ PlayGame } />
        <Route path="/config" component={ Config } />

      </Switch>
    </div>
  );
}
